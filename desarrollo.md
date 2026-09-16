# Dynamic Tours - Bitácora de Desarrollo (Fase 1)

Documento de seguimiento técnico y operativo para el proyecto **Dynamic Tours Frontend**.

---

## Estado Inicial: Preparación de Estructura y Documentación

### 2026-09-15 - Inicialización del repositorio y base documental
- **Objetivo:** Dejar creada la estructura completa del proyecto, dependencias y base de documentación para arrancar cuando la dirección lo indique.
- **Acciones realizadas:**
  1. Repositorio inicializado en `C:\Users\Jose\Desktop\Desarrollo_Web\dynamic-tours-frontend`.
  2. Inicializado Git local (`git init`).
  3. Stack configurado: Vite + React 19 + TypeScript + Tailwind CSS 3.4 + Lucide Icons.
  4. Configuración de Tailwind adaptada a tokens de Dynamic Tours (navy `#0b1d3a`, blue `#00529b`, light `#0284c7`, accent `#e67e22`).
  5. Documentación comercial y técnica incorporada:
     - `docs/comercial/PROPUESTA_APROBADA_FASE1.md`
     - `docs/contexto/CONTEXTO_DYNAMIC_TOURS.md`
     - `docs/referencias/` con los PDFs de la propuesta oficial y factura anticipo.
### 2026-09-16 - Prototipo Interactivo de Nueva Generación B2B y Auditoría de Entornos
- **Objetivo:** Auditar la plataforma actual en producción, documentar accesos maestros e implementar un prototipo interactivo funcional en React 19 + Tailwind con las innovaciones clave para agencias.
- **Acciones realizadas:**
  1. Auditoría completa de navegación pública, alta de agencias e intranet en `dynamic-tours.com`.
  2. Documentación y verificación de credenciales maestras (Elena 2026-06-17) en `docs/contexto/ACCESOS_Y_ENTORNOS.md`:
     - Administrador (`jose` / `denada2026`).
     - Agencia estándar (`DTprueba` / `1`).
     - Red Halcón personalizada (`halpru` / `halpru`).
     - Credenciales de MySQL y FTP.
  3. Implementación del prototipo interactivo en vivo:
     - **Barra de Control del Prototipo:** Conmutador instantáneo entre entorno Público, DTprueba (azul Dynamic) y halpru (rojo Halcón con marca blanca).
     - **Funcionalidad estrella "Modo Mostrador":** Alternancia entre *Modo Agente* (PVP + Neto + Comisión 18% + Cupos) y *Modo Mostrador* (oculta datos confidenciales para girar la pantalla al cliente en ventanilla).
     - **Megamenú Editorial:** Navegación por continentes con tarjeta destacada del mes e itinerarios recomendados.
     - **Catálogo & Cards de Viaje:** Badges de salida garantizada y charter, botón para compartir por WhatsApp y generador de *Cartel de Escaparate A4 listo para imprimir*.
     - **Ficha de Producto de Nueva Generación:** Galería de fotos, Sticky Subheader con anclas, Timeline interactivo día a día (8 días de Egipto con iconos de comidas) y Sticky Booking Dock inferior.
     - **Dashboard de Intranet:** KPIs en tiempo real, buscador omnibox de reservas, tabla interactiva de expedientes y panel de pactos comerciales.
  4. Build de producción verificado (`npm run build`) y servidor local activo en `http://localhost:5173/`.
- **Próximos pasos:**
  - Validar el prototipo con Alberto y recoger feedback comercial.
  - Refinar la conexión de estilos y componentes para la integración con el equipo técnico de Dynamic (Víctor/Elena).

