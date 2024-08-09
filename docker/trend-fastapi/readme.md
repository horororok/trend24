# Fastapi
- python 3.7.12 사용

1. 실행환경 이미지 빌드. 라이브러리 설치 용도입니다.
    ```shell
    bash ./build-requirements-image.sh
    ```
2. fastApi 실행
    ```shell
    bash ./run-fastapi.sh
    ```

## 참고
- 설치
```
python -m pip install --upgrade pip
pip install numpy
pip install qdrant_client
pip install pymysql
pip install sentence_transformers
pip install torch
pip install tqdm
pip install uvicorn
pip install fastapi
pip install python-dotenv
```

- 실행
```
uvicorn main:app --host 0.0.0.0 --port 8000
```
