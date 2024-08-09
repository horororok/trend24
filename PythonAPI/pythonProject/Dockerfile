FROM trend-fastapi-requirements

WORKDIR /myapp

COPY .env /myapp/.env
COPY ./requirements.txt /myapp/requirements.txt

RUN /usr/local/bin/python -m pip install --upgrade pip

COPY api /myapp/api
COPY dto /myapp/dto
COPY main.py /myapp/main.py

EXPOSE 8000

RUN pip freeze --all > /myapp/requirements.txt

ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

