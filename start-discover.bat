@echo off
IF EXIST ".\env" (
    CALL .\env\Scripts\activate.bat
    ECHO Discover already installed
) ELSE (
    ECHO Installing Discover, this may take a few minutes...
    CALL python -m venv env
    CALL .\env\Scripts\activate.bat
    CALL pip install -r requirements.txt
    ECHO Discover successfully installed
)
SET SERVER_PORT=5000
CALL explorer "http://localhost:%SERVER_PORT%/"
CALL python server.py