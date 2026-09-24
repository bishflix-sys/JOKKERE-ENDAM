$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$tokenFile = Join-Path $PSScriptRoot ".dev-token"
if (-not (Test-Path $tokenFile)) {
  throw "Missing backend/.dev-token"
}
$env:ULTRA_API_TOKEN = (Get-Content $tokenFile -Raw).Trim()
& "$PSScriptRoot\.venv\Scripts\python.exe" -m uvicorn app.main:app --app-dir $PSScriptRoot --host 127.0.0.1 --port 8000