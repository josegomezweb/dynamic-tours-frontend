param (
    [string]$ftpHost = "ftp.de-nada.es",
    [string]$ftpUser = "hosting175537eu@de-nada.es",
    [string]$ftpPass = "patimasFTP78#"
)

$baseDir = "c:\Users\Jose\Desktop\Desarrollo_Web\dynamic-tours-frontend"

$proposals = @(
    @{
        LocalPath = "$baseDir\Propuestas\dynamic-tours-version-1\dist"
        RemotePath = "dynamic/propuesta1"
    },
    @{
        LocalPath = "$baseDir\Propuestas\dynamic-tours-versión-2\dist"
        RemotePath = "dynamic/propuesta2"
    }
)

foreach ($prop in $proposals) {
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "Uploading to $($prop.RemotePath)..." -ForegroundColor Yellow
    Write-Host "From local: $($prop.LocalPath)" -ForegroundColor Yellow
    Write-Host "==========================================" -ForegroundColor Cyan

    $localDir = $prop.LocalPath
    $remotePrefix = $prop.RemotePath

    if (-not (Test-Path $localDir)) {
        Write-Error "Local directory not found: $localDir"
        continue
    }

    $files = Get-ChildItem -Path $localDir -Recurse -File

    foreach ($file in $files) {
        $relativePath = $file.FullName.Substring($localDir.Length).TrimStart('\', '/').Replace('\', '/')
        $remoteUrl = "ftp://$ftpHost/$remotePrefix/$relativePath"

        Write-Host "Uploading: $relativePath ($([math]::Round($file.Length / 1KB, 1)) KB)..." -NoNewline
        
        $curlArgs = @(
            "-s",
            "--show-error",
            "--user", "$ftpUser`:$ftpPass",
            "--ftp-create-dirs",
            "-T", $file.FullName,
            $remoteUrl
        )

        $result = & curl.exe @curlArgs 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host " [OK]" -ForegroundColor Green
        } else {
            Write-Host " [FAILED]" -ForegroundColor Red
            Write-Host "Error: $result" -ForegroundColor Red
        }
    }
}

Write-Host "Upload process finished!" -ForegroundColor Green
