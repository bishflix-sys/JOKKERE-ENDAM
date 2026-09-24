$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$tokenFile = Join-Path $root "backend\.dev-token"
if (-not (Test-Path $tokenFile)) { throw "Missing backend/.dev-token" }
$env:ULTRA_API_TOKEN = (Get-Content $tokenFile -Raw).Trim()
if (-not $env:SESSION_SECRET) {
  $env:SESSION_SECRET = [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
}
Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-File", "$root\backend\start.ps1" -WorkingDirectory $root
Set-Location "$root\frontend-dashboard-pro"
npm.cmd run dev -- -p 3001