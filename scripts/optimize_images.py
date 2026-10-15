import os
from pathlib import Path
from PIL import Image

def optimize_public_dir(public_path):
    print(f"\nProcessing {public_path}...")
    
    # 1. Update hurghada beach.jpg from high quality source if available
    hurg_src = Path(r"c:\Users\Jose\Desktop\Desarrollo_Web\kip-viajes-frontend\public\images\egipto-azul-reserva\hurghada.webp")
    if hurg_src.exists():
        with Image.open(hurg_src) as img:
            rgb_img = img.convert("RGB")
            rgb_img.save(public_path / "hurghada beach.jpg", format="JPEG", quality=85, optimize=True)
            print("Generated hurghada beach.jpg from webp source")
            
    for item in public_path.iterdir():
        if not item.is_file():
            continue
        ext = item.suffix.lower()
        if ext not in [".jpg", ".jpeg", ".png"]:
            continue
            
        initial_size = item.stat().st_size
        
        try:
            with Image.open(item) as img:
                orig_w, orig_h = img.size
                
                # Check for gem.jpeg (huge 8K photo)
                if "gem" in item.name.lower():
                    img.thumbnail((1920, 1080), Image.Resampling.LANCZOS)
                    img.convert("RGB").save(item, format="JPEG", quality=82, optimize=True)
                
                elif ext in [".jpg", ".jpeg"]:
                    if orig_w > 1920 or orig_h > 1080:
                        img.thumbnail((1920, 1080), Image.Resampling.LANCZOS)
                    img.convert("RGB").save(item, format="JPEG", quality=82, optimize=True)
                    
                elif ext == ".png":
                    # If it's a logo with transparency (keep RGBA)
                    if "logo" in item.name.lower():
                        if orig_w > 1200:
                            img.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
                        img.save(item, format="PNG", optimize=True)
                    else:
                        # Poster / photo saved as PNG
                        if orig_w > 1200 or orig_h > 1600:
                            img.thumbnail((1200, 1600), Image.Resampling.LANCZOS)
                        # Quantize to 256 colors palette PNG for huge size savings
                        q = img.quantize(colors=256, method=Image.Resampling.LANCZOS)
                        q.save(item, format="PNG", optimize=True)
                        
            final_size = item.stat().st_size
            savings = round((1 - final_size / initial_size) * 100, 1) if initial_size > 0 else 0
            print(f"  {item.name}: {round(initial_size/1024, 1)} KB -> {round(final_size/1024, 1)} KB ({savings}% saved)")
        except Exception as e:
            print(f"  Error optimizing {item.name}: {e}")

def main():
    root = Path(r"c:\Users\Jose\Desktop\Desarrollo_Web\dynamic-tours-frontend\Propuestas")
    v1_pub = root / "dynamic-tours-version-1" / "public"
    
    v2_candidates = [d for d in root.iterdir() if d.is_dir() and "versi" in d.name.lower() and "2" in d.name]
    if not v2_candidates:
        raise RuntimeError("Version 2 folder not found")
    v2_pub = v2_candidates[0] / "public"
    
    optimize_public_dir(v1_pub)
    optimize_public_dir(v2_pub)
    print("\nOptimization complete!")

if __name__ == "__main__":
    main()
