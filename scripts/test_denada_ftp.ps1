$ftp = [System.Net.FtpWebRequest]::Create('ftp://ftp.de-nada.es/')
$ftp.Credentials = New-Object System.Net.NetworkCredential('hosting175537eu@de-nada.es', 'patimasFTP78#')
$ftp.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
$ftp.UsePassive = $true
$ftp.Timeout = 10000
try {
    $response = $ftp.GetResponse()
    $reader = New-Object System.IO.StreamReader($response.GetResponseStream())
    $output = $reader.ReadToEnd()
    Write-Host "CONECTADO CON EXITO A DE-NADA.ES !"
    $reader.Close()
    $response.Close()
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}
