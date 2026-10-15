#!/bin/bash
# ----------------------------------------------------
# Dynamic Tours - Publicar en Internet (Para Mac)
# ----------------------------------------------------
cd "$(dirname "$0")"

echo "=================================================="
echo "    Publicando cambios en https://de-nada.es     "
echo "=================================================="
echo ""

echo "1. Comprobando y compilando la web..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Error al compilar. Revisa los cambios antes de subir."
    read -p "Presiona Enter para salir..."
    exit 1
fi

echo ""
echo "2. Subiendo archivos al servidor por FTP..."
python3 scripts/deploy_ftp.py
if [ $? -ne 0 ]; then
    # Intentar con python normal si python3 falla
    python scripts/deploy_ftp.py
fi

echo ""
echo "3. Guardando copia de seguridad en GitHub..."
git add .
git commit -m "update: cambios publicados desde Mac"
git push origin master

echo ""
echo "=================================================="
echo "    ¡LISTO! La web ya está actualizada en:       "
echo "    👉 https://de-nada.es/dynamic/               "
echo "=================================================="
echo ""
read -p "Presiona Enter para cerrar esta ventana..."
