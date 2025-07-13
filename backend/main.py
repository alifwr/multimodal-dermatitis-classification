from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os
import uuid
import base64
import numpy as np
import cv2
import httpx
from fastapi.responses import JSONResponse, Response
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv
import logging
from pillow_heif import register_heif_opener
from utils import Predictor
from cams import SmoothGradCAMpp

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = os.getenv("GROQ_API_URL")

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

register_heif_opener()

predictor = Predictor()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allowed origins
    allow_credentials=True,  # Allow cookies, authorization headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


class MultimodalInput(BaseModel):
    text: str
    image_path: str


class Answer(BaseModel):
    answer: str


UPLOAD_DIR = "public"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/public", StaticFiles(directory=UPLOAD_DIR), name="public")

async def check_human_skin(image_path: str):
    """ Check if an image contains human skin using Groq's vision model
    Returns True if human skin is detected, False otherwise.
    """
    try:
        with open(image_path, "rb") as image_file:
            image_data = base64.b64encode(image_file.read()).decode('utf-8')
        
        payload = {
            "model": "meta-llama/llama-4-scout-17b-16e-instruct",  
            "messages": [{
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Analyze this image and determine if it contains human skin. Respond with only 'yes' if human skin is visible, or 'no' if no human skin is present."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{image_data}"
                        }
                    }
                ]
            }],
            "max_completion_tokens": 1024,
            "temperature": 0
        }
        
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {GROQ_API_KEY}"
        }

        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(GROQ_API_URL, json=payload, headers=headers)
        
        if response.status_code == 200:
            result = response.json()
            content = result["choices"][0]["message"]["content"].strip().lower()
            logger.info(f"Groq skin detection result: {content}")
            return content == "yes"
        else:
            logger.error(f"Groq API error: {response.status_code} - {response.text}")
            raise HTTPException(
                status_code=503, 
                detail="Skin detection service temporarily unavailable. Please try again later."
            )
    except Exception as e:
        logger.error(f"Error checking human skin: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to check human skin in image: {str(e)}"
        )
        
def convert_heic_to_jpeg(image_bytes):
    """Convert HEIC image bytes to JPEG format"""    
    try:
        # Method 1: Using pillow-heif (recommended)
        try:
            image = Image.open(BytesIO(image_bytes))
            # Convert to RGB if not already
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Save as JPEG
            jpeg_buffer = BytesIO()
            image.save(jpeg_buffer, format='JPEG', quality=95)
            jpeg_buffer.seek(0)
            return jpeg_buffer.getvalue()
            
        except Exception as e:
            logger.warning(f"pillow-heif failed, trying pyheif: {e}")
            
            # Method 2: Using pyheif (fallback)
            import pyheif
            heif_file = pyheif.read_heif(image_bytes)
            image = Image.frombytes(
                heif_file.mode,
                heif_file.size,
                heif_file.data,
                "raw",
                heif_file.mode,
                heif_file.stride,
            )
            
            # Convert to RGB if not already
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Save as JPEG
            jpeg_buffer = BytesIO()
            image.save(jpeg_buffer, format='JPEG', quality=95)
            jpeg_buffer.seek(0)
            return jpeg_buffer.getvalue()
            
    except Exception as e:
        logger.error(f"HEIC conversion failed: {e}")
        raise HTTPException(
            status_code=400, 
            detail=f"Failed to convert HEIC image: {str(e)}"
        )


def is_heic_file(filename, content_type):
    """Check if the file is a HEIC file"""
    if not filename:
        return False
    
    filename_lower = filename.lower()
    heic_extensions = ['.heic', '.heif']
    heic_mimetypes = ['image/heic', 'image/heif']
    
    return (
        any(filename_lower.endswith(ext) for ext in heic_extensions) or
        content_type in heic_mimetypes
    )


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/predict")
async def predict(content: MultimodalInput):
    message = content.text
    image_path = content.image_path

    # Check if image exists
    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="Image not found.")

    image = Image.open(image_path).convert("RGB")

    result, percentages, image_xai = predictor.predict(message, image)
    
    # Generate unique filename
    unique_filename = f"{uuid.uuid4().hex}.png"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    # Write bytes to file
    with open(file_path, "wb") as buffer:
        buffer.write(image_xai)

    return {
        "result": result, 
        "percentage_image": percentages[0], 
        "percentage_text": percentages[1], 
        "image_xai": unique_filename
    }


# @app.post("/predict2")
# async def predict2(text: str, image_path: str):
#     # Check if image exists
#     if not os.path.exists(image_path):
#         raise HTTPException(status_code=404, detail="Image not found.")
    
#     # Check for human skin using Groq
#     has_human_skin = await check_human_skin(image_path)
#     if not has_human_skin:
#         raise HTTPException(
#             status_code=400, 
#             detail="Invalid image: No human skin detected. Please upload a valid image containing human skin."
#         )

#     image = Image.open(image_path).convert("RGB")

#     result, percentage = predictor.predict(text, image)
    
#     print(result)

#     return {"result": result, "percentage": percentage}


@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    try:
        logger.info(
            f"Received file upload: {file.filename}, content_type: {file.content_type}"
        )

        # Read file bytes into memory
        contents = await file.read()
        logger.info(f"File size: {len(contents)} bytes")

        # Check if it's a HEIC file
        is_heic = is_heic_file(file.filename, file.content_type)
        
        if is_heic:
            logger.info("HEIC file detected, converting to JPEG")
            # Convert HEIC to JPEG
            contents = convert_heic_to_jpeg(contents)
            file_extension = ".jpg"  # Always save as JPEG after conversion
        else:
            # Basic MIME type check for non-HEIC files
            if not file.content_type or not file.content_type.startswith("image/"):
                logger.error(f"Invalid content type: {file.content_type}")
                raise HTTPException(status_code=400, detail="Only image files are allowed.")

            # Validate file is an image using Pillow
            try:
                image_buffer = BytesIO(contents)
                image = Image.open(image_buffer)
                image.verify()  # Verify will raise exception if not an image
                logger.info(f"Image validation successful: {image.format}")
            except Exception as e:
                logger.error(f"Image validation failed: {e}")
                raise HTTPException(
                    status_code=400, detail="Uploaded file is not a valid image."
                )

            # Get original file extension
            if file.filename:
                file_extension = os.path.splitext(file.filename)[1]
            else:
                file_extension = ".jpg"  # default extension

        # Generate unique filename
        unique_filename = f"{uuid.uuid4().hex}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        # Write bytes to file
        with open(file_path, "wb") as buffer:
            buffer.write(contents)
            
        # Check for human skin using Groq
        has_human_skin = await check_human_skin(file_path)
        if not has_human_skin:
            raise HTTPException(
                status_code=400, 
                detail="Invalid image: No human skin detected. Please upload a valid image containing human skin."
            )

        # Return filename and path
        response = {
            "filename": unique_filename,
            "url": f"public/{unique_filename}",
            "file_path": file_path,
            "converted_from_heic": is_heic
        }

        logger.info(f"File upload successful: {response}")
        return response

    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.error(f"Unexpected error during file upload: {e}")
        raise HTTPException(status_code=500, detail=f"File upload failed: {str(e)}")

@app.post("/xai")
async def generate_xai(text: str, image_path: str):
    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="Image not found.")
    
    img = Image.open(image_path).convert("RGB")
    input_tensor = predictor.transform(img).unsqueeze(0).to(predictor.device)

    predictor.image_model.eval()
    cam = SmoothGradCAMpp(predictor.image_model, predictor.image_target_layer)
    heatmap, pred_idx = cam(input_tensor)

    heatmap_np = heatmap.squeeze().cpu().numpy()
    heatmap_np = np.clip(heatmap_np, 0, 1)
    heatmap_np = cv2.resize(heatmap_np, img.size)
    heatmap_color = cv2.applyColorMap(np.uint8(255 * heatmap_np), cv2.COLORMAP_JET)

    img_np = np.array(img)
    overlay = cv2.addWeighted(img_np, 0.6, heatmap_color, 0.4, 0)

    _, buffer = cv2.imencode('.jpg', overlay)
    xai_bytes = buffer.tobytes()
    xai_base64 = base64.b64encode(xai_bytes).decode()

    return {
        "predicted_class": int(pred_idx),
        "heatmap_base64": xai_base64
    }

