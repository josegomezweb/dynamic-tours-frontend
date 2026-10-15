import requests
import sys

def download_file_from_google_drive(file_id, destination):
    URL = "https://docs.google.com/uc?export=download"
    session = requests.Session()

    response = session.get(URL, params={'id': file_id}, stream=True)
    token = None
    for key, value in response.cookies.items():
        if key.startswith('download_warning'):
            token = value
            break

    if token:
        params = {'id': file_id, 'confirm': token}
        response = session.get(URL, params=params, stream=True)

    # If google drive direct download page
    if 'html' in response.headers.get('Content-Type', ''):
        # Try drive.usercontent
        url2 = f"https://drive.usercontent.google.com/download?id={file_id}&export=download&confirm=t"
        response = session.get(url2, stream=True)

    print(f"Status: {response.status_code}")
    print(f"Content-Type: {response.headers.get('Content-Type')}")
    print(f"Content-Length: {response.headers.get('Content-Length')}")

    total = 0
    with open(destination, "wb") as f:
        for chunk in response.iter_content(32768):
            if chunk:
                f.write(chunk)
                total += len(chunk)
                if total % (1024 * 1024 * 5) == 0:
                    print(f"Downloaded: {total // (1024*1024)} MB")

    print(f"Finished downloading: {total} bytes to {destination}")

if __name__ == "__main__":
    file_id = "1DE7TZ8oe005RO0M2HHdR88M2wslN6ntC"
    dest = "downloaded_raw_hero_video.mp4"
    download_file_from_google_drive(file_id, dest)
