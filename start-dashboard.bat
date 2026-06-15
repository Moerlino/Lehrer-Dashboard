@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 tools\local_server.py
  goto :eof
)
where python >nul 2>nul
if %errorlevel%==0 (
  python tools\local_server.py
  goto :eof
)
echo Python 3 wurde nicht gefunden.
echo Bitte Python 3 installieren und diese Datei danach erneut starten.
pause
