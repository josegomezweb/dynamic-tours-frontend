import os
import ftplib
from pathlib import Path

FTP_HOST = "ftp.de-nada.es"
FTP_USER = "hosting175537eu@de-nada.es"
FTP_PASS = "patimasFTP78#"

def ensure_remote_dir(ftp, remote_path):
    parts = remote_path.strip("/").split("/")
    current = ""
    for part in parts:
        current += "/" + part
        try:
            ftp.cwd(current)
        except ftplib.error_perm:
            try:
                ftp.mkd(current)
                print(f"Created remote dir: {current}")
            except Exception as e:
                print(f"Notice on mkd {current}: {e}")

def upload_folder(ftp, local_dir, remote_base):
    local_path = Path(local_dir).resolve()
    print(f"\n--- Uploading {local_path} to {remote_base} ---")
    
    ensure_remote_dir(ftp, remote_base)
    
    for root, dirs, files in os.walk(local_path):
        rel_path = os.path.relpath(root, local_path).replace("\\", "/")
        if rel_path == ".":
            current_remote_dir = remote_base
        else:
            current_remote_dir = f"{remote_base}/{rel_path}"
            ensure_remote_dir(ftp, current_remote_dir)
        
        ftp.cwd(current_remote_dir)
        
        for file in files:
            file_full_path = os.path.join(root, file)
            file_size_kb = round(os.path.getsize(file_full_path) / 1024, 1)
            print(f"Uploading {rel_path}/{file} ({file_size_kb} KB)...", end=" ", flush=True)
            with open(file_full_path, "rb") as f:
                ftp.storbinary(f"STOR {file}", f)
            print("[OK]")

def main():
    root = Path(r"c:\Users\Jose\Desktop\Desarrollo_Web\dynamic-tours-frontend")
    propuestas_dir = root / "Propuestas"
    
    # Locate version 1
    v1_dir = propuestas_dir / "dynamic-tours-version-1" / "dist"
    
    # Locate version 2 dynamically (avoid accent encoding issues in path)
    v2_candidates = [d for d in propuestas_dir.iterdir() if d.is_dir() and "versi" in d.name.lower() and "2" in d.name]
    if not v2_candidates:
        raise RuntimeError("Could not find dynamic-tours-version-2 folder!")
    v2_dir = v2_candidates[0] / "dist"
    
    print(f"V1 dist: {v1_dir}")
    print(f"V2 dist: {v2_dir}")
    
    ftp = ftplib.FTP(FTP_HOST)
    ftp.encoding = "utf-8"
    ftp.login(FTP_USER, FTP_PASS)
    print("FTP Login Successful!")
    
    try:
        upload_folder(ftp, v1_dir, "/dynamic/propuesta1")
        upload_folder(ftp, v2_dir, "/dynamic/propuesta2")
        print("\n=== All proposals uploaded successfully! ===")
    finally:
        try:
            ftp.quit()
        except:
            pass

if __name__ == "__main__":
    main()
