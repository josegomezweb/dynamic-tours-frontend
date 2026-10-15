import os, sys, ftplib

FTP_HOST = "ftp.de-nada.es"
FTP_USER = "hosting175537eu@de-nada.es"
FTP_PASS = os.environ.get("FTP_PASSWORD", "patimasFTP78#")

LOCAL_DIR = os.path.abspath("dist")
REMOTE_BASE = "/dynamic"

def ensure_remote_dir(ftp, remote_path):
    parts = remote_path.strip("/").split("/")
    current = ""
    for part in parts:
        current += "/" + part
        try:
            ftp.cwd(current)
        except Exception:
            try:
                ftp.mkd(current)
                print(f"[FTP] Creado directorio: {current}")
                ftp.cwd(current)
            except Exception as e:
                print(f"[FTP] Info directorio {current}: {e}")

def upload_directory(ftp, local_dir, remote_base):
    print(f"--- Desplegando {local_dir} -> {remote_base} ---")
    ensure_remote_dir(ftp, remote_base)

    uploaded_count = 0
    for root, dirs, files in os.walk(local_dir):
        rel_path = os.path.relpath(root, local_dir).replace("\\", "/")
        current_remote = remote_base if rel_path == "." else f"{remote_base}/{rel_path}"
        ensure_remote_dir(ftp, current_remote)

        for f in files:
            local_file = os.path.join(root, f)
            size_kb = os.path.getsize(local_file) / 1024
            print(f"Subiendo {f} ({size_kb:.1f} KB)...", end=" ", flush=True)
            with open(local_file, "rb") as fp:
                ftp.storbinary(f"STOR {f}", fp)
            print("OK")
            uploaded_count += 1

    print(f"\n[FTP] ¡Completado! {uploaded_count} archivos sincronizados con exito.")

def main():
    print(f"Conectando a {FTP_HOST} como {FTP_USER}...")
    ftp = ftplib.FTP()
    ftp.connect(FTP_HOST, 21, timeout=60)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.encoding = 'utf-8'
    print("[FTP] Autenticacion correcta.")

    upload_directory(ftp, LOCAL_DIR, REMOTE_BASE)
    ftp.quit()
    print("\n[OK] Despliegue finalizado: https://de-nada.es/dynamic/")

if __name__ == "__main__":
    main()
