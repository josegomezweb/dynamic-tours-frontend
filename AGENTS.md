# Directrices de Trabajo y Sincronización para Agentes (Antigravity)

Este archivo define las reglas obligatorias de sincronización automática y buenas prácticas para los agentes de IA (Antigravity / Cursor / Claude Code) que operan en este proyecto colaborativo entre **Windows** y **macOS**.

---

## 1. Sincronización Automática con Git (REGLA MANDATORIA)

El equipo trabaja en tiempo real de forma distribuida (PC Windows y Mac). Para garantizar que nadie sobrescriba el trabajo del compañero y que la web en producción se mantenga siempre actualizada:

### A. Al Iniciar Cualquier Tarea:
Antes de proponer o aplicar cualquier cambio en el código, el agente **DEBE** ejecutar:
```bash
git pull
```
*Objetivo:* Asegurar que el entorno local contiene los últimos cambios subidos por el otro colaborador antes de escribir código.

### B. Al Finalizar Cualquier Tarea:
Una vez completados los cambios solicitados por el usuario y comprobado que compilan sin errores (`npm run build`):
1. El agente **DEBE** preparar y subir automáticamente los cambios a GitHub:
```bash
git add .
git commit -m "tipo: descripción clara y concisa de la mejora"
git push
```
2. **Impacto:** Este `git push` dispara automáticamente el workflow de GitHub Actions (`.github/workflows/deploy.yml`), que compila y publica la web por FTP en `https://de-nada.es/dynamic/` en menos de 1 minuto.

---

## 2. Tecnologías y Estructura del Proyecto

- **Framework:** React 19 + TypeScript + Vite 8
- **Estilos:** Tailwind CSS 3.4
- **Iconografía:** Lucide React
- **Ruta Base en Producción:** `/dynamic/` (gestionada automáticamente en `vite.config.ts`).
- **Módulo de Lectura de Pasaportes IA:** Conectado al webhook de n8n en Railway (`/webhook/dynamic-tours-pasaportes-a032ae45`) a través del proxy `/api/parse-passport` en desarrollo local.

---

## 3. Integridad y Calidad de Código

1. Antes de realizar cualquier `git push`, siempre validar que la compilación de TypeScript y Vite sea limpia ejecutando `npm run build`.
2. Preservar la consistencia de estilos y temas de color (Dynamic Tours Navy `#0b1d3a`, Blue `#00529b`, Light `#0284c7`, Accent `#e67e22`).
3. No incluir secretos ni claves de API en el código fuente.
