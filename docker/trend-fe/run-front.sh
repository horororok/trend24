#!/bin/bash

source .env

# 스크립트 실행 위치를 Backend 디렉토리로 변경합니다.
cd $(dirname "$0")/../../Frontend

# 도커 빌드 명령 실행
IMAGE_NAME=front-fe
docker build -t $IMAGE_NAME .

# 도커 빌드가 성공하면 메시지 출력
if [ $? -eq 0 ]; then
  echo "도커 이미지 빌드가 성공적으로 완료되었습니다."
else
  echo "도커 이미지 빌드 중 오류가 발생하였습니다."
  echo "스크립트를 종료합니다."
  exit
fi

# 도커 네트워크가 존재하는지 확인합니다.
if ! docker network inspect trend-network &> /dev/null; then
    # 도커 네트워크를 생성합니다.
    docker network create trend-network
    echo "trend-network 생성"
else
    echo "trend-network는 이미 존재합니다."
fi


CONTAINER_NAME=trend-fe-container
# 컨테이너가 존재하는지 확인합니다.
if docker ps -a --format '{{.Names}}' | grep -q "^$CONTAINER_NAME$"; then
    # 컨테이너를 삭제합니다.
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
    echo "기존 $CONTAINER_NAME 를 삭제했습니다."
else
    echo "기존 $CONTAINER_NAME 가 존재하지 않습니다."
fi

docker run -d -p $PORT:5173 --network trend-network --name $CONTAINER_NAME $IMAGE_NAME
echo "컨테이너 실행 완료"
echo "스크립트 종료"