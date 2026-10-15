$ftp = [System.Net.FtpWebRequest]::Create('ftp://ftp.de-nada.es/')
$ftp.Credentials = New-Object System.Net.NetworkCredential('hosting175537eu@de-nada.es', 'patimasFTP78#')
$ftp.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectoryDetails
$ftp.UsePassive = $true
try {
    $response = $ftp.GetResponse()
    $reader = New-Object System.IO.StreamReader($response.GetResponseStream())
    $output = $reader.ReadToEnd()
    Write-Host "ROOT LIST:"
    $lines = $output -split "`r`n"
    $lines | Select-Object -First 25 | ForEach-Object { Write-Host $_ }
    $reader.Close()
    $response.Close()
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}
