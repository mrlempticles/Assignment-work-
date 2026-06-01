$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backend = Join-Path $root 'backend'
$frontend = Join-Path $root 'frontend'

function Get-FreePort {
  param([int[]] $Candidates)

  foreach ($port in $Candidates) {
    $listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    if (-not $listener) {
      return $port
    }
  }

  throw "No free ports found in: $($Candidates -join ', ')"
}

foreach ($folder in @($backend, $frontend)) {
  if (-not (Test-Path (Join-Path $folder 'node_modules'))) {
    Write-Host "Installing dependencies in $folder..."
    npm install --prefix $folder
  }
}

Write-Host 'Preparing Prisma client...'
npm run prisma:generate --prefix $backend

$backendPort = Get-FreePort @(5000, 5001, 5002, 5003)
$frontendPort = Get-FreePort @(5173, 5174, 5175, 5176)

$env:PORT = "$backendPort"
$env:FRONTEND_URL = "http://localhost:$frontendPort,http://127.0.0.1:$frontendPort"
$env:VITE_API_URL = "http://localhost:$backendPort/api/v1"

Write-Host "Starting backend on http://localhost:$backendPort"
Start-Process -FilePath 'npm.cmd' -ArgumentList 'run', 'dev' -WorkingDirectory $backend -WindowStyle Hidden

Start-Sleep -Seconds 2

Write-Host "Starting frontend on http://localhost:$frontendPort"
Write-Host "Frontend API URL: $env:VITE_API_URL"
npm run dev --prefix $frontend -- --host localhost --port $frontendPort --strictPort
