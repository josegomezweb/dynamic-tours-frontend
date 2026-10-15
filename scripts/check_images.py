import os
import re
import requests
import urllib.parse
import sys

sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'Mozilla/5.0'}
files = [
    'src/components/PublicWeb.tsx',
    'src/components/LeyendasDetail.tsx',
    'src/components/Logo.tsx',
    'src/components/MaravillasDetail.tsx',
    'src/components/ToursCatalog.tsx',
    'src/components/TripDetail.tsx',
    'src/components/Home.tsx',
    'src/components/HomeCatalog.tsx',
    'src/App.tsx'
]

all_images = set()
for fpath in files:
    if os.path.exists(fpath):
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        matches = re.findall(r'image:\s*["\']([^"\'\n\r]+)["\']', content)
        for m in matches:
            all_images.add(m)
        src_matches = re.findall(r'src=["\']([^"\'\n\r]+\.(?:png|jpg|jpeg|svg|mp4|MOV|webp))["\']', content)
        for m in src_matches:
            all_images.add(m)
        asset_matches = re.findall(r'assetUrl\(["\']([^"\'\n\r]+)["\']\)', content)
        for m in asset_matches:
            all_images.add(m)

print(f"Total image/media strings found: {len(all_images)}")

public_dir = 'public'
local_files = os.listdir(public_dir)

print("\n--- Comprobando archivos locales en /public ---")
for img in sorted(all_images):
    clean = img.lstrip('/')
    if clean.startswith('http'):
        continue
    exists = os.path.exists(os.path.join(public_dir, clean))
    print(f"[{'OK' if exists else 'FALTA'}] {clean}")

print("\n--- Comprobando en https://de-nada.es/dynamic/ ---")
base_url = "https://de-nada.es/dynamic/"
for img in sorted(all_images):
    clean = img.lstrip('/')
    if clean.startswith('http'):
        url = clean
    else:
        url = base_url + urllib.parse.quote(clean)
    try:
        res = requests.get(url, headers=headers, timeout=6)
        if res.status_code != 200:
            print(f"[FAIL {res.status_code}] {clean} -> {url}")
        else:
            print(f"[OK 200] {clean}")
    except Exception as e:
        print(f"[EXCEPCION] {clean} -> {e}")
