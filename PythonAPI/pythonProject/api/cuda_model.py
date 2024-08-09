import torch
from sentence_transformers import SentenceTransformer


class CudaModel:
    def __init__(self, mode='GPU', model_name='sentence-transformers/distiluse-base-multilingual-cased-v2'):
        self.device = None

        if mode == 'CPU':
            self.device = torch.device("cpu")
        else:
            self.device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        # self.configure_logging()
        self.model = self.load_model(model_name)
        self.move_model_to_device()

    # def configure_logging(self):
    #     logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%Y-%m-%d %H:%M:%S', level=logging.INFO)
    #     self.logger = logging.getLogger(__name__)
    #     self.logger.info("로깅 설정 완료")

    def load_model(self, model_name):
        # self.logger.info(f"{model_name} 모델 로딩 중...")
        model = SentenceTransformer(model_name)
        # self.logger.info("모델 로딩 완료")
        return model

    def move_model_to_device(self):
        # self.logger.info(f"모델을 {self.device}로 이동")
        self.model.to(self.device)


# 클래스 사용
'''
if __name__ == "__main__":
    cuda_model = CudaModel()
    print(f"사용할 디바이스: {cuda_model.device}")
'''
