import torch
from torchvision import transforms
from transformers import MPNetTokenizer
import torch.nn.functional as F
from cams import SmoothGradCAMpp
import numpy as np
import cv2
import base64

from model.models import SkinImageModel, AnamnesysModel


class Predictor:
    def __init__(self):
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.transform = transforms.Compose(
            [
                transforms.Resize((224, 224)),
                transforms.ToTensor(),
                transforms.Normalize(
                    mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]
                ),
            ]
        )
        self.text_model = AnamnesysModel(num_classes=2).to(device)
        self.image_model = SkinImageModel(num_classes=2).to(device)
        self.text_model.eval()
        self.image_model.eval()
        self.image_target_layer = self.image_model.get_target_layer()
        self.text_model.load_state_dict(
            torch.load("model/AnamnesysModel.pth", map_location=device)
        )
        self.image_model.load_state_dict(
            torch.load("model/SkinImageModel.pth", map_location=device)
        )
        self.tokenizer = MPNetTokenizer.from_pretrained("microsoft/mpnet-base")
        self.device = device
        self.class_names = ["DA", "Bukan DA"]

    def predict(self, text, image):
        # with torch.no_grad():
        text_tokens = self.tokenizer(text, return_tensors="pt").to(self.device)
        input_tensor = self.transform(image).unsqueeze(0).to(self.device)
        
        cam = SmoothGradCAMpp(self.image_model, self.image_target_layer)
        heatmap, pred_idx = cam(input_tensor)
        heatmap_np = heatmap.squeeze().cpu().numpy()
        heatmap_np = np.clip(heatmap_np, 0, 1)
        heatmap_np = cv2.resize(heatmap_np, image.size)
        heatmap_color = cv2.applyColorMap(np.uint8(255 * heatmap_np), cv2.COLORMAP_JET)
        img_np = np.array(input_tensor)
        overlay = cv2.addWeighted(img_np, 0.6, heatmap_color, 0.4, 0)
        _, buffer = cv2.imencode('.jpg', overlay)
        xai_bytes = buffer.tobytes()
        # xai_base64 = base64.b64encode(xai_bytes).decode()
        
        text_output = self.text_model(**text_tokens)
        image_output = self.image_model(input_tensor)
        output = self.ensemble_forward(text_output, image_output)
        
        image_confidence, _ = torch.max(F.softmax(image_output, dim=1), dim=1)
        text_confidence, _ = torch.max(F.softmax(text_output, dim=1), dim=1)
        confidence, predicted_idx = torch.max(F.softmax(output, dim=1), dim=1)
        predicted_class = self.class_names[predicted_idx.item()]
        # confidence_percent = confidence.item() * 100
        
        return predicted_class, (image_confidence.item() * 100, text_confidence.item() * 100), xai_bytes

        # return predicted_class, confidence_percent
        
    def ensemble_forward(self, model1_preds, model2_preds):
        ensemble_preds = (model1_preds + model2_preds) / 2
        return ensemble_preds

