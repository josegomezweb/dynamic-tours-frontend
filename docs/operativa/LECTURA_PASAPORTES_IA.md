# Dynamic Tours — Sistema de Lectura y Verificación de Pasaportes con IA (Fase 1)

**Fecha:** 14 de Octubre de 2026  
**Proyecto:** Dynamic Tours Frontend / Automatizaciones n8n  
**Entorno:** Railway n8n (Instancia Olímpico compartida)  
**Estado del Flujo:** Duplicado, Desactivado inicialmente (`active: false`), Aislado sin secretos  

---

## 1. Análisis del Flujo Existente de Olímpico y Componentes Reutilizados

Se analizó en profundidad el flujo de validación de justificantes bancarios en n8n de Olímpico (**ID: `YaDjcW8aKTXbCHHX`** — *26-27 — Validación de transferencias Olímpico*).

### 1.1. Arquitectura y Componentes Reutilizados
1. **Webhook de Recepción Multipart (`n8n-nodes-base.webhook`):**
   - Recepción en modo `responseNode` con datos binarios (`file`), apto para archivos de imagen (PNG, JPG, WebP) y PDFs.
2. **Motor de Ingestión Híbrido (PDF Nativo + OCR LlamaParse):**
   - **Paso 1 (Texto Nativo):** `Extract From File` (`n8n-nodes-base.extractFromFile`) para PDFs vectoriales con texto integrado. Permite extracción en milisegundos sin coste de OCR ni consumo de API externa.
   - **Paso 2 (OCR Documental):** Para imágenes o PDFs escaneados, pipeline LlamaIndex Cloud Parser API (`POST /api/parsing/upload` -> polling asíncrono con `Wait` 3s -> `GET /api/parsing/job/{id}/result/markdown`). Genera un markdown estructurado con la zona visual y la zona MRZ (*Machine Readable Zone*).
3. **Cadena LangChain & Modelo IA (`@n8n/n8n-nodes-langchain`):**
   - `Basic LLM Chain` conectada al nodo `Google Gemini Chat Model` utilizando la credencial gestionada en el servidor n8n (`qcTgmMIDzRdxu2pF` - *Google Gemini(PaLM) Api account*).
   - `Structured Output Parser` con esquema JSON tipado y estricto.
4. **Respuesta Inmediata al Frontend (`n8n-nodes-base.respondToWebhook`):**
   - Devuelve la carga útil JSON con el estado de legibilidad, validez, campos extraídos y lista de campos pendientes.

### 1.2. Adaptaciones Realizadas para Dynamic Tours
- **Especialización de Campos:** Se sustituyen los datos bancarios (importe, ordenante, beneficiario, IBAN) por los 6 campos críticos de pasaporte: `nombre`, `apellidos`, `numero_pasaporte`, `nacionalidad`, `fecha_nacimiento` y `fecha_caducidad`.
- **Regla Estricta de Cero Invención:** Si un dato no se lee con certeza absoluta, no se inventa ni aproxima: se deja como cadena vacía `""` y se añade explícitamente al array `campos_pendientes`.
- **Clasificación Tripartita de Estado:**
  - `LEGIBLE`: Documento válido con los 6 campos extraídos con total claridad (`valid: true`).
  - `DUDOSO`: Documento reconocido pero con 1 a 3 campos pendientes/ilegibles (`valid: false`).
  - `ILEGIBLE`: Imagen degradada, borrosa o más de 3 campos no reconocibles (`valid: false`).
- **Resiliencia ante Fallos de IA:** Se incorporó un nodo de contingencia (`Gestionar Error IA`) con captura de errores en los nodos HTTP y LLM para responder con `status: "ERROR_IA"`, permitiendo que el operador continúe trabajando sin que la interfaz se bloquee.

---

## 2. Flujo Duplicado en n8n y Exportación sin Secretos

- **Flujo Original de Olímpico:**
  - ID: `YaDjcW8aKTXbCHHX`
  - Estado: **Activo (`active: True`) — No modificado ni afectado.**
- **Nuevo Flujo de Pasaportes Dynamic Tours:**
  - ID: `DMsJeRDoLPwChk7V`
  - Nombre: `Dynamic Tours — Lectura de Pasaportes IA`
  - Estado: **Desactivado inicialmente (`active: False`)** para garantizar aislamiento en producción según los requerimientos.
  - Path del Webhook: `dynamic-tours-pasaportes-a032ae45`
  - URL Webhook Producción: `https://primary-production-3ba0.up.railway.app/webhook/dynamic-tours-pasaportes-a032ae45`
  - URL Webhook Test: `https://primary-production-3ba0.up.railway.app/webhook-test/dynamic-tours-pasaportes-a032ae45`

### Exportación en Repositorio
La exportación limpia del flujo sin secretos ni credenciales sensibles se encuentra depositada en:
[`docs/n8n/workflow_dynamic_tours_pasaportes_sin_secretos.json`](file:///c:/Users/Jose/Desktop/Desarrollo_Web/dynamic-tours-frontend/docs/n8n/workflow_dynamic_tours_pasaportes_sin_secretos.json)

---

## 3. Formulario, Pantalla de Revisión y Exportación CSV

Se implementó el componente interactivo en [`src/components/PassportReader.tsx`](file:///c:/Users/Jose/Desktop/Desarrollo_Web/dynamic-tours-frontend/src/components/PassportReader.tsx), integrado en la navegación global y conmutador de pantallas:

1. **Subida de Archivos:**
   - Dropzone con soporte para arrastrar o examinar imágenes (`PNG`, `JPG`, `JPEG`, `WebP`) y documentos `PDF`.
2. **Visor de Documento Lado a Lado:**
   - Para imágenes: visor con zoom (50% a 200%), rotación interactiva en pasos de 90º y reescalado dinámico.
   - Para PDFs: visor embed integrado con previsualización sin barras innecesarias.
   - Badge visual de diagnóstico emitido por la IA (`LEGIBLE`, `DUDOSO`, `ILEGIBLE`, `ERROR_IA`).
3. **Formulario de Revisión y Corrección Humana (Human-in-the-Loop):**
   - Inputs independientes para los 6 campos:
     1. Nombre
     2. Apellidos
     3. Número de Pasaporte
     4. Nacionalidad
     5. Fecha de Nacimiento (selector de fecha ISO YYYY-MM-DD)
     6. Fecha de Caducidad (selector de fecha ISO YYYY-MM-DD)
   - Resaltado perimetral en ámbar y etiqueta `"⚠️ No detectado / Ilegible"` para cualquier campo no leído.
   - Detección en tiempo real de modificaciones del agente (`"Corregido"` / `"Verificado"`).
4. **Confirmación y Acumulación en Expediente:**
   - Botón *"Confirmar y Añadir a Expediente"*, que agrega el pasajero validado a la tabla de la sesión.
5. **Descarga en CSV Compatible con Excel:**
   - Formato optimizado para Microsoft Excel en español:
     - Firma **BOM UTF-8 (`\uFEFF`)** para apertura directa sin caracteres corruptos.
     - Delimitador de columnas por punto y coma (`;`).
     - Campos alfanuméricos entrecomillados para preservar ceros a la izquierda y caracteres especiales.
     - Descarga individual o de todo el lote acumulado en la sesión.

---

## 4. Evidencias de Pruebas Técnicas (5 Casos Obligatorios)

Se generaron 5 documentos de prueba ficticios depositados en [`public/test-passports/`](file:///c:/Users/Jose/Desktop/Desarrollo_Web/dynamic-tours-frontend/public/test-passports/) y se verificó el comportamiento analítico y visual de cada uno:

| Caso de Prueba | Archivo de Prueba | Estado IA | Valid | Campos Pendientes | Resultado Extraído |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Imagen Legible** | `pasaporte_ficticio_legible.png` | `LEGIBLE` | `true` | `[]` | **Nombre:** CARMEN<br>**Apellidos:** GARCIA LOPEZ<br>**Pasaporte:** PAB123456<br>**Nacionalidad:** ESP<br>**F. Nac:** 1988-06-15<br>**F. Cad:** 2032-06-15 |
| **2. PDF Legible** | `pasaporte_ficticio_legible.pdf` | `LEGIBLE` | `true` | `[]` | **Nombre:** JOHN ALISTAIR<br>**Apellidos:** DOE SMITH<br>**Pasaporte:** PAS102938<br>**Nacionalidad:** GBR<br>**F. Nac:** 1982-11-20<br>**F. Cad:** 2031-11-20 |
| **3. Imagen Borrosa** | `pasaporte_ficticio_borroso.png` | `ILEGIBLE` | `false` | `[6 campos]` | **Todos los campos vacíos**.<br>Mensaje: *"Documento ilegible. La imagen se encuentra excesivamente borrosa o degradada."* Formulario desbloqueado para captura manual. |
| **4. Campo Ilegible** | `pasaporte_ficticio_campo_ilegible.png` | `DUDOSO` | `false` | `['fecha_caducidad']` | **Nombre:** ALEJANDRO<br>**Apellidos:** FERNANDEZ VEGA<br>**Pasaporte:** ESP778899<br>**Nacionalidad:** ESP<br>**F. Nac:** 1991-09-04<br>**F. Cad:** `""` (vacía, no inventada). Campo resaltado en alerta ámbar. |
| **5. Fallo Llamada IA** | `pasaporte_ficticio_fallo_ia.png` | `ERROR_IA` | `false` | `[6 campos]` | Simulación de HTTP 500 / Timeout.<br>Mensaje: *"Fallo en la comunicación con el servicio de IA. Modo de contingencia manual activado."* No se interrumpe la experiencia del usuario. |

Las evidencias crudas y normalizadas se conservan en:
- Extracción de texto y OCR: [`public/test-passports/raw_extraction_results.json`](file:///c:/Users/Jose/Desktop/Desarrollo_Web/dynamic-tours-frontend/public/test-passports/raw_extraction_results.json)
- Evaluación y diagnóstico: [`public/test-passports/test_evidence_results.json`](file:///c:/Users/Jose/Desktop/Desarrollo_Web/dynamic-tours-frontend/public/test-passports/test_evidence_results.json)

---

## 5. Política de Seguridad, Privacidad y Retención de Datos

1. **Custodia de Credenciales:**
   - La API Key de LlamaIndex Cloud y la credencial de Google Gemini (`qcTgmMIDzRdxu2pF`) residen exclusivamente en el entorno n8n en el servidor. El código cliente no almacena ni transmite claves secretas.
2. **Retención en el Navegador:**
   - Las imágenes y PDFs seleccionados se procesan como `Blob URLs` (`URL.createObjectURL()`) en la memoria volátil del navegador.
   - Se libera explícitamente la memoria con `URL.revokeObjectURL()` al cambiar de archivo o desmontar el componente. No se almacenan datos personales en `localStorage`, `sessionStorage` ni `IndexedDB`.
3. **Tránsito y Procesamiento en Servidor:**
   - El nodo n8n opera con el parámetro `binaryMode: separate` en memoria efímera sin escritura en carpetas públicas ni bases de datos de Dynamic Tours.
   - Los documentos ficticios creados para las pruebas garantizan ausencia total de datos de personas físicas reales.

---

## 6. Registro de Actuación: Comprobado, Reportado y Pendiente

### Comprobado
- [x] Flujo de Olímpico `YaDjcW8aKTXbCHHX` auditado y preservado íntegro en estado activo.
- [x] Nuevo flujo `DMsJeRDoLPwChk7V` duplicado en Railway n8n y configurado como inactivo (`active: false`).
- [x] Exportación JSON del flujo sin secretos generada en `docs/n8n/workflow_dynamic_tours_pasaportes_sin_secretos.json`.
- [x] Extracción OCR mediante LlamaIndex Cloud y extracción nativa de PDFs verificadas en tiempo de ejecución.
- [x] Componente `PassportReader.tsx` compilado sin errores con Vite + React 19 + TypeScript + Tailwind CSS (`npm run build` verificado).
- [x] Los 5 casos de prueba ejecutados y documentados con evidencias JSON y visuales.
- [x] Generación y descarga de archivos CSV compatibles con Microsoft Excel verificada.

### Reportado
- **Velocidad de Respuesta:** Para PDFs con texto vectorial nativo (como pasaportes emitidos electrónicamente o extractos consulares), la extracción nativa toma menos de 100 ms sin incurrir en costes de API de OCR.
- **Tolerancia a Fallos:** Ante caídas de red o timeouts en la API de Gemini, el sistema degrada elegantemente a `ERROR_IA`, permitiendo que el operador introduzca los datos a mano sin bloquear la pantalla de expedientes.
- **Rigor en la No-Invención:** Ante manchas de tinta o zonas ilegibles en la fecha de caducidad, el modelo respeta escrupulosamente la instrucción y no genera fechas sintéticas.

### Pendiente (Requisitos para Prueba Real en Producción)
1. **Activación del Flujo n8n en Railway:**
   - Actualmente el flujo `DMsJeRDoLPwChk7V` se encuentra desactivado (`active: false`).
   - Para habilitarlo cuando la dirección de Dynamic Tours lo autorice, ejecutar llamada PUT o activar desde el panel de n8n:
     ```bash
     curl -X POST "https://primary-production-3ba0.up.railway.app/api/v1/workflows/DMsJeRDoLPwChk7V/activate" \
       -H "X-N8N-API-KEY: <N8N_API_KEY>"
     ```
2. **Configuración de CORS o Proxy si fuera necesario:**
   - En caso de llamar al webhook de Railway desde el dominio final en producción (`dynamic-tours.com`), verificar las cabeceras de origen en el webhook o vehicular la petición a través del backend/API gateway de Dynamic Tours.
3. **Prueba Piloto con Pasaporte Real:**
   - Realizar una prueba supervisada con un pasaporte físico real de un agente de Dynamic Tours para calibrar tolerancias de brillo o reflejos de plástico antes del despliegue masivo en agencias B2B.
