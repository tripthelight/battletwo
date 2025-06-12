#!/bin/bash

# 커밋 메시지를 인자로 받음
msg="$1"

# 메시지 없으면 안내 후 종료
if [ -z "$msg" ]; then
  echo "커밋 메시지를 입력하세요."
  echo "사용법: ./git-auto.sh \"커밋 메시지\""
  exit 1
fi

# 변경 사항 확인
changes=$(git status --porcelain)

# 변경사항이 없으면 종료
if [ -z "$changes" ]; then
  echo "변경된 파일이 없습니다. 커밋할 내용이 없어요."
  exit 0
fi

# 실행
echo "변경된 파일이 갑지되었습니다. 커밋을 진행합니다."
git add .
git commit -m "$msg"
git push origin main
