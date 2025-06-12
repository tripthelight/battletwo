#!/bin/bash

# 전체 인자를 커밋 메시지로 합침
msg="$*"

# 커밋 메시지가 없으면 종료
if [ -z "$msg" ]; then
  echo "❗ 커밋 메시지를 입력하세요."
  echo "사용법: ./git-auto.sh \"커밋 메시지\""
  exit 1
fi

# 변경사항 있는지 확인
if [[ -z $(git status --porcelain) ]]; then
  echo "✅ 변경된 파일이 없습니다. 커밋할 내용이 없어요."
  exit 0
fi

# 실행
echo "📦 변경된 파일이 감지되었습니다. 커밋을 진행합니다..."

git status
git add .
git commit -m "$msg"
git push origin main
