
from sentence_transformers import SentenceTransformer
import torch

class CudaModel:
    def __init__(self, mode = 'GPU', model_name='sentence-transformers/distiluse-base-multilingual-cased-v2'):
        self.device = None

        if mode == 'CPU':
            self.device = torch.device("cpu")
        else:
            self.device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        self.model = self.load_model(model_name)
        self.move_model_to_device()

    def load_model(self, model_name):
        model = SentenceTransformer(model_name)
        return model

    def move_model_to_device(self):
        self.model.to(self.device)