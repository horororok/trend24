FROM python:3.7.12

WORKDIR /app

COPY .env /app/.env
COPY ./embeddings_topic.npy /app/embeddings_topic.npy
COPY ./books.json /app/books.json
# COPY ./books-test.json /app/books.json
COPY ./qdrant_v1.py /app/qdrant_v1.py
COPY ./requirements.txt /app/requirements.txt

RUN /usr/local/bin/python -m pip install --upgrade pip

RUN pip install -r /app/requirements.txt

ENTRYPOINT ["python", "qdrant_v1.py"]

