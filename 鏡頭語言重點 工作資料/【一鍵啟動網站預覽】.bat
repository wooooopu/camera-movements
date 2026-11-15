@echo off
chcp 65001 >nul
title CINELANG - 影視鏡頭語言互動網站 (本地預覽伺服器)
cd /d "%~dp0"

echo ================================================================
echo       🎬 CINELANG - 影視鏡頭語言知識庫與互動網站
echo ================================================================
echo.
echo [提示] 正在為您啟動本地 Web 伺服器...
echo [優勢] 透過本地伺服器瀏覽，能完整解除 YouTube 內嵌播放限制（徹底避免錯誤 153）！
echo [狀態] 網頁即將自動在您的預設瀏覽器中開啟：http://localhost:8080
echo.
echo 如需停止伺服器，直接關閉此黑色視窗即可。
echo ================================================================
echo.

:: 嘗試自動開啟瀏覽器
start "" "http://localhost:8080/index.html"

:: 啟動 Python HTTP 伺服器（預設 port 8080，若失敗嘗試 8000）
python -m http.server 8080
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [提醒] Port 8080 可能被佔用，正在嘗試切換至 Port 8000...
    start "" "http://localhost:8000/index.html"
    python -m http.server 8000
)

pause
