#!/bin/bash

# 현재 디렉터리 및 하위 디렉터리에서 모든 .sh 파일에 실행 권한 추가
find . -type f -name "*.sh" -exec chmod +x {} \;

echo "모든 .sh 파일에 실행 권한이 추가되었습니다."