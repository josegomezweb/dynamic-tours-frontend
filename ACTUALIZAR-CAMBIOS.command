#!/bin/bash
# ----------------------------------------------------
# Dynamic Tours - Descargar Últimos Cambios (Para Mac)
# ----------------------------------------------------
cd "$(dirname "$0")"

echo "=================================================="
echo "    Sincronizando con los cambios de tu compañero "
echo "=================================================="
echo ""

git pull

echo ""
echo "=================================================="
echo "    ¡Todo al día y listo para trabajar!          "
echo "=================================================="
read -p "Presiona Enter para cerrar esta ventana..."
