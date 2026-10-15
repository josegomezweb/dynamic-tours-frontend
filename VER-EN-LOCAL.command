#!/bin/bash
# ----------------------------------------------------
# Dynamic Tours - Abrir Web en Local (Para Mac)
# ----------------------------------------------------
cd "$(dirname "$0")"

echo "=================================================="
echo "    Iniciando Dynamic Tours en tu ordenador       "
echo "=================================================="
echo ""

# Comprobar dependencias si es la primera vez
if [ ! -d "node_modules" ]; then
    echo "Instalando por primera vez (espera 30 segundos)..."
    npm install
fi

echo "Abriendo tu navegador en local..."
# Abre el navegador en segundo plano tras 2 segundos
(sleep 2 && open "http://localhost:5173/dynamic/") &

npm run dev
