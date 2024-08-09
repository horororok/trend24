#!/bin/bash

# 스크립트 실행 전에 현재 위치를 저장합니다.
original_dir=$(pwd)

# 스크립트 실행 위치를 Backend 디렉토리로 변경합니다.
cd $(dirname "$0")/../../PythonAPI/pythonProject

# .env 파일을 읽어 환경 변수로 설정합니다.
source .env


# BASE_IMAGE_NAME 변수 설정
BASE_IMAGE_NAME="trend-fastapi-requirements"

# Docker 이미지 목록 가져오기
image_list=$(docker images)

# BASE_IMAGE_NAME이 이미지 목록에 있는지 확인
if [[ $image_list == *"$BASE_IMAGE_NAME"* ]]; then
    echo "Image $BASE_IMAGE_NAME 가 존재합니다"
else
    echo "Image $BASE_IMAGE_NAME 가 존재하지 않습니다"
    echo "Image $BASE_IMAGE_NAME 를 먼저 빌드해주세요!! 종료합니다."
    exit 1
fi

CONTAINER_NAME=trend-fastapi-container

# 컨테이너가 존재하는지 확인합니다.
if docker ps -a --format '{{.Names}}' | grep -q "^$CONTAINER_NAME$"; then
    # 컨테이너를 삭제합니다.
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
    echo "기존 $CONTAINER_NAME 를 삭제했습니다."
else
    echo "기존 $CONTAINER_NAME 가 존재하지 않습니다."
fi

BASE_IMAGE_NAME=trend-fastapi-requirements
IMAGE_NAME=trend-fastapi

# 현재 폴더의 Dockerfile을 사용하여 이미지를 빌드합니다.
docker build -t $IMAGE_NAME .

# 컨테이너를 실행합니다.
docker run -d -p $APP_PORT:8000 --name $CONTAINER_NAME --network trend-network $IMAGE_NAME

echo "컨테이너 실행 완료"



# 로그에서 특정 문자열을 모니터링하고 싶을 때 사용
echo "fastAPI 동작중인지 2초마다, 2분동안 확인"
SEARCH_STRING="Uvicorn running on"

# 타임아웃 시간 설정 (2분)
TIMEOUT=120

# 로그를 지속적으로 체크
echo "Monitoring logs for '$SEARCH_STRING' in container $CONTAINER_NAME..."
start_time=$SECONDS

while true; do
  echo "$(date +"%Y-%m-%d %H:%M:%S") - fastAPI 동작 대기중..."
  if docker logs --tail 50 $CONTAINER_NAME 2>&1 | grep "$SEARCH_STRING"; then
    echo "Detected '$SEARCH_STRING' in $CONTAINER_NAME logs."
    break
  fi

  # 현재까지 경과한 시간을 확인
  elapsed=$(( SECONDS - start_time ))

  # 타임아웃을 초과하면 스크립트 종료
  if [ $elapsed -ge $TIMEOUT ]; then
    echo "Timeout reached without detecting '$SEARCH_STRING'. FastAPI 코드를 확인해주세요."
    exit 1
  fi

  sleep 2
done

echo "fastAPI 동작 중입니다"
echo "스크립트를 종료합니다."
