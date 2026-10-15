$hosts = @("de-nada.es", "ftp.de-nada.es", "dynamic-tours.com", "ftp.dynamic-tours.com")
$user = "seo6006"
$pass = "denada2026@DT"

foreach ($h in $hosts) {
    Write-Host "Testing FTP on $h..."
    try {
        $ftp = [System.Net.FtpWebRequest]::Create("ftp://$h/")
        $ftp.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
        $ftp.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
        $ftp.Timeout = 5000
        $ftp.UsePassive = $true
        $response = $ftp.GetResponse()
        $reader = New-Object System.IO.StreamReader($response.GetResponseStream())
        $list = $reader.ReadToEnd()
        Write-Host "SUCCESS on $h !"
        Write-Host $list
        break
    } catch {
        Write-Host "Failed on $($h): $($_.Exception.Message)"
        if ($_.Exception.InnerException) {
            Write-Host "Inner: $($_.Exception.InnerException.Message)"
        }
    }
}
