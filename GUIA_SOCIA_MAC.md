# 🚀 Guía Rápida para Arrancar en Mac (Dynamic Tours Frontend)

Esta guía contiene los 3 únicos pasos necesarios para clonar el proyecto en tu Mac, arrancarlo en local y empezar a trabajar con **Antigravity**.

---

### Paso 1: Clonar el proyecto en tu Mac
Abre la aplicación **Terminal** en tu Mac y escribe:

```bash
git clone <URL_DEL_REPOSITORIO_GITHUB>
cd dynamic-tours-frontend
npm install
```

---

### Paso 2: Ver la web en tu ordenador (Modo Desarrollo)
Para ver la web funcionando en tiempo real en tu navegador:

```bash
npm run dev
```

Se abrirá en tu navegador en: **`http://localhost:5173/`**  
*(Cualquier cambio que se guarde se actualiza al instante en la pantalla).*

---

### Paso 3: Trabajar con Antigravity (¡100% Automático!)
Abre la carpeta del proyecto en tu editor con Antigravity.

El proyecto ya tiene incorporadas las **reglas automáticas de sincronización** (`AGENTS.md`):
- **Al empezar cualquier cambio:** Tu Antigravity ejecuta `git pull` en silencio para bajarse lo último que haya hecho tu compañero.
- **Al terminar tu cambio:** Tu Antigravity compila y hace `git push` automáticamente.
- **En 40 segundos:** La web pública en internet (**`https://de-nada.es/dynamic/`**) se actualiza sola con tus cambios sin que tengas que tocar nada de FTP ni servidores.

---

### Resumen de comandos útiles (si prefieres usarlos tú manualmente):
- Para bajarte lo último de tu compañero: `git pull`
- Para ver la web en tu Mac: `npm run dev`
- Para verificar que todo compila bien: `npm run build`
