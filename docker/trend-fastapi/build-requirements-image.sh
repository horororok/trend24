#!/bin/bash

# 스크립트 실행 전에 현재 위치를 저장합니다.
original_dir=$(pwd)

# 스크립트 실행 위치를 Backend 디렉토리로 변경합니다.
cd $(dirname "$0")/../../PythonAPI/pythonProject

# .env 파일을 읽어 환경 변수로 설정합니다.
source .env


IMAGE_NAME=trend-fastapi-requirements
FILE_NAME=Dockerfile-requirements


# 현재 폴더의 Dockerfile을 사용하여 이미지를 빌드합니다.
docker build -f $FILE_NAME -t $IMAGE_NAME .

echo "스크립트 끝"