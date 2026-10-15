from pathlib import Path

root = Path(r"c:\Users\Jose\Desktop\Desarrollo_Web\dynamic-tours-frontend\Propuestas")

def update_file(p: Path):
    text = p.read_text(encoding="utf-8")
    orig = text
    
    # Check if assetUrl is already imported
    if "import { assetUrl }" not in text:
        text = 'import { assetUrl } from "../utils/assets";\n' + text
        
    # Replace direct image src attributes
    text = text.replace('src="/dia_5_guiza.jpg"', 'src={assetUrl("/dia_5_guiza.jpg")}')
    text = text.replace('src="/joyas nilo 2.png"', 'src={assetUrl("/joyas nilo 2.png")}')
    
    # Replace image: "/..."
    images = [
        "abu_simbel.jpg",
        "alejandria.jpg",
        "dia_5_guiza.jpg",
        "DYNAMIC-logo-oscurecido.png",
        "dynamic_egipto_abu_simbel.png",
        "dynamic_logo_1_ok.png",
        "dynamic_logo_transparente.png",
        "gem.jpeg",
        "globo_luxor.jpg",
        "hurghada beach.jpg",
        "joyas nilo 2.png",
        "logo_dynamic_3.png",
        "noche_cairota.jpg",
        "senior dynamic ok.png",
        "senior dynamic.png",
        "turquía dynamic.png"
    ]
    
    for img in images:
        text = text.replace(f'image: "/{img}"', f'image: assetUrl("/{img}")')
        # in case of unescaped or other variants
        text = text.replace(f'image: "/{img}', f'image: assetUrl("/{img}')
        
    # Clean up double wraps if any
    text = text.replace('assetUrl(assetUrl(', 'assetUrl(')
    text = text.replace('))"', ')"')
    
    # Replace in img elements
    text = text.replace("src={slide.image}", "src={assetUrl(slide.image)}")
    text = text.replace("src={item.image}", "src={assetUrl(item.image)}")
    text = text.replace("src={exc.image}", "src={assetUrl(exc.image)}")
    
    # Clean up double wraps in JSX
    text = text.replace("src={assetUrl(assetUrl(slide.image))}", "src={assetUrl(slide.image)}")
    text = text.replace("src={assetUrl(assetUrl(item.image))}", "src={assetUrl(item.image)}")
    text = text.replace("src={assetUrl(assetUrl(exc.image))}", "src={assetUrl(exc.image)}")
    
    if text != orig:
        p.write_text(text, encoding="utf-8")
        print(f"Updated {p.name}")
    else:
        print(f"No changes in {p.name}")

for prop in ["dynamic-tours-version-1", "dynamic-tours-versi*2"]:
    found = list(root.glob(prop))
    if not found:
        continue
    folder = found[0]
    print(f"\nProcessing {folder.name}...")
    for comp in ["LeyendasDetail.tsx", "MaravillasDetail.tsx", "PublicWeb.tsx"]:
        comp_file = folder / "src" / "components" / comp
        if comp_file.exists():
            update_file(comp_file)

print("\nDone applying assetUrl!")
