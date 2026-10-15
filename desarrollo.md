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
- **Próximos pasos cumplidos:**
  - Validado el primer planteamiento visual y estratégico con Alberto y el equipo comercial de Dynamic (2026-09-22).

### 2026-09-22 - Reunión Estratégica: Restyling de Marca y Definición de Nueva Home
- **Objetivo:** Presentar las 3 opciones de restyling de marca, claims comerciales y primeros bocetos de la Home pública, acordando la dirección definitiva.
- **Acciones y decisiones acordadas:**
  1. **Logotipo (Opción 1 validada):** Aprobada la línea continuista con tipografía redondeada y tick sutil de avión en el arco de la «D». Se descartan dorados y rupturas radicales. El azul corporativo será el protagonista absoluto, con el verde reducido a detalles sutiles/degradado suave.
  2. **Claim oficial elegido:** *«Más mundo para tus viajeros, más respaldo para tu agencia»*.
  3. **Estructura de la Home pública:**
     - Portada con **vídeo inmersivo / grandes imágenes a sangre** (estilo Katai/Icarión), descartando tarjetas giratorias en el hero (se mueven a destacados/ofertas).
     - Tres pilares acordados: Imagen/Inmersión, Autobombo/Confianza B2B (con bloque de viajes para Grupos estilo CN Travel) y Captación con acceso rápido a reservas para agencias registradas.
  4. **Documentación:** Creado el registro maestro de reuniones en [`docs/comunicaciones/REUNIONES.md`](file:///c:/Users/Jose/Desktop/Desarrollo_Web/dynamic-tours-frontend/docs/comunicaciones/REUNIONES.md).
### 2026-10-14 - Módulo de Lectura y Verificación de Pasaportes con IA (Versión 1.0)
- **Objetivo:** Implementar la primera versión del sistema de lectura automatizada de pasaportes para Dynamic Tours aprovechando la infraestructura probada de n8n de Olímpico (justificantes de transferencia), sin alterar el flujo original ni publicar en producción.
- **Acciones realizadas:**
  1. **Auditoría del flujo base de Olímpico:** Revisado el workflow `YaDjcW8aKTXbCHHX`. Se preservó 100% activo e intacto en Railway n8n.
  2. **Duplicación y adaptación en n8n:**
     - Creado nuevo workflow `DMsJeRDoLPwChk7V` (*Dynamic Tours — Lectura de Pasaportes IA*), **desactivado inicialmente (`active: false`)**.
     - Configurada la extracción estricta de 6 campos: `nombre`, `apellidos`, `numero_pasaporte`, `nacionalidad`, `fecha_nacimiento`, `fecha_caducidad`.
     - Integradas reglas de calidad: cero invención de datos, marcado de `campos_pendientes` y captura de excepciones IA (`ERROR_IA`).
     - Exportación limpia generada en [`docs/n8n/workflow_dynamic_tours_pasaportes_sin_secretos.json`](file:///c:/Users/Jose/Desktop/Desarrollo_Web/dynamic-tours-frontend/docs/n8n/workflow_dynamic_tours_pasaportes_sin_secretos.json).
  3. **Formulario y Pantalla de Revisión:**
     - Desarrollado el componente [`src/components/PassportReader.tsx`](file:///c:/Users/Jose/Desktop/Desarrollo_Web/dynamic-tours-frontend/src/components/PassportReader.tsx), integrado en el prototipo interactivo con acceso directo en barra de control y Navbar.
     - Visor interactivo lado a lado con zoom y rotación para imágenes y visor nativo para PDF.
     - Formulario con inputs editables y badges de advertencia perimetral en campos pendientes.
     - Descarga de expedientes confirmados en formato CSV compatible con Microsoft Excel (BOM UTF-8 y delimitador `;`).
  4. **Seguridad y Privacidad de Datos:**
     - Credenciales de Gemini y LlamaIndex conservadas exclusivamente en el servidor n8n.
     - Archivos procesados en memoria volátil (`Blob URL`) en cliente y streaming efímero en n8n sin persistencia en disco ni logs con datos sensibles.
     - Generados 5 documentos de prueba ficticios en [`public/test-passports/`](file:///c:/Users/Jose/Desktop/Desarrollo_Web/dynamic-tours-frontend/public/test-passports/).
  5. **Verificación de 5 Casos de Prueba Requeridos:**
     - Imagen legible (`pasaporte_ficticio_legible.png`): Extraído completo (`LEGIBLE`, `valid: true`).
     - PDF legible (`pasaporte_ficticio_legible.pdf`): Extracción nativa instantánea (`LEGIBLE`, `valid: true`).
     - Imagen borrosa (`pasaporte_ficticio_borroso.png`): Diagnosticado `ILEGIBLE`, `valid: false`, todos los campos pendientes.
     - Campo ilegible (`pasaporte_ficticio_campo_ilegible.png`): Fecha caducidad tapada por tinta se mantiene vacía y en alerta (`DUDOSO`).
     - Fallo de llamada a IA (`pasaporte_ficticio_fallo_ia.png`): Captura de error amigable (`ERROR_IA`) con desbloqueo manual.
  6. **Documentación Técnica Completa:** Creada en [`docs/operativa/LECTURA_PASAPORTES_IA.md`](file:///c:/Users/Jose/Desktop/Desarrollo_Web/dynamic-tours-frontend/docs/operativa/LECTURA_PASAPORTES_IA.md) con desglose de Comprobado, Reportado y Pendiente.
- **Próximos pasos para prueba real:**
  - Autorización formal de Dynamic Tours para activar el webhook en Railway (`DMsJeRDoLPwChk7V`).
  - Prueba supervisada con un pasaporte físico real de agente para verificar tolerancias de brillos o reflejos en plastificados.



