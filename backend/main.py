from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os
import uuid
from PIL import Image
from io import BytesIO
import logging

from utils import Predictor

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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

    result, percentage = predictor.predict(message, image)
    print(result)

    return {"result": result, "percentage": percentage}


@app.post("/predict2")
async def predict2(text: str, image_path: str):
    # Check if image exists
    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="Image not found.")

    image = Image.open(image_path).convert("RGB")

    result, percentage = predictor.predict(text, image)
    print(result)

    return {"result": result, "percentage": percentage}


@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    try:
        logger.info(
            f"Received file upload: {file.filename}, content_type: {file.content_type}"
        )

        # Basic MIME type check
        if not file.content_type or not file.content_type.startswith("image/"):
            logger.error(f"Invalid content type: {file.content_type}")
            raise HTTPException(status_code=400, detail="Only image files are allowed.")

        # Read file bytes into memory
        contents = await file.read()
        logger.info(f"File size: {len(contents)} bytes")

        # Validate file is an image using Pillow
        try:
            # Reset file position for validation
            image_buffer = BytesIO(contents)
            image = Image.open(image_buffer)
            image.verify()  # Verify will raise exception if not an image
            logger.info(f"Image validation successful: {image.format}")
        except Exception as e:
            logger.error(f"Image validation failed: {e}")
            raise HTTPException(
                status_code=400, detail="Uploaded file is not a valid image."
            )

        # Generate unique filename with original extension
        if file.filename:
            file_extension = os.path.splitext(file.filename)[1]
        else:
            file_extension = ".jpg"  # default extension

        unique_filename = f"{uuid.uuid4().hex}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        # Write bytes to file
        with open(file_path, "wb") as buffer:
            buffer.write(contents)

        # Return filename and path
        response = {
            "filename": unique_filename,
            "url": f"public/{unique_filename}",
            "file_path": file_path,
        }

        logger.info(f"File upload successful: {response}")
        return response

    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.error(f"Unexpected error during file upload: {e}")
        raise HTTPException(status_code=500, detail=f"File upload failed: {str(e)}")
