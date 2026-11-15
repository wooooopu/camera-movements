@echo off
chcp 65001 >nul
title CINELANG Local Server
cd /d "%~dp0"
echo Starting local web server on http://localhost:8080 ...
start "" "http://localhost:8080/index.html"
python -m http.server 8080
if %ERRORLEVEL% NEQ 0 (
    echo Switching to port 8000 ...
    start "" "http://localhost:8000/index.html"
    python -m http.server 8000
)
pause
