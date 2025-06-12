:: 윈도우 cmd에서 사용 시 한글 깨짐 현상 발생하여 사용 안함

@echo off
setlocal enabledelayedexpansion

:: 전체 커밋 메시지를 합침
set msg=
:loop
if "%~1"=="" goto afterLoop
set msg=!msg! %~1
shift
goto loop

:afterLoop
:: 앞 공백 제거
set msg=%msg:~1%

:: 메시지가 비었는지 확인
if "%msg%"=="" (
    echo ❗ 커밋 메시지를 입력하세요.
    echo 사용법: git-auto.bat "커밋 메시지"
    exit /b 1
)

:: 변경사항 있는지 확인
git status --porcelain > temp_git_status.txt
for /f %%i in ('findstr /r /c:"." temp_git_status.txt') do (
    goto :has_changes
)

echo ✅ 변경된 파일이 없습니다. 커밋할 내용이 없어요.
del temp_git_status.txt
exit /b 0

:has_changes
del temp_git_status.txt
echo 📦 변경된 파일이 감지되었습니다. 커밋을 진행합니다...

git add .
git commit -m "%msg%"
git push origin main
