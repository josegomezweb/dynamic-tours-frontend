# Accesos, Credenciales y Entornos - Dynamic Tours

Documento maestro de referencia técnico y operativo para pruebas, análisis de interfaz y comparativa de entornos de agencias en la plataforma actual de **Dynamic Tours** ([https://www.dynamic-tours.com](https://www.dynamic-tours.com)).

---

## 1. Credenciales Maestras del Proyecto

*(Actualizadas por Elena el 2026-06-17)*

### A. Web (Acceso / Intranet)

#### Usuario Administrador
* **Usuario:** `jose`
* **Contraseña:** `denada2026`
* **Destino:** `/views/intranet/dashboard/dashboard.php` (Dashboard de administración interna).

#### Usuario Agencia Estándar (Entorno Genérico Touroperador)
* **Usuario:** `DTprueba`
* **Contraseña:** `1`
* **Destino:** `home-intranet.php?nombre=DYNAMIC+TOURS-MINORISTA`
* **Propósito:** Visualizar la interfaz y flujo estándar de una agencia minorista sin personalizaciones de marca (azul corporativo Dynamic Tours `#00529b`).

#### Usuario Agencia Personalizado (Marca Blanca / Red Halcón)
* **Usuario:** `halpru`
* **Contraseña:** `halpru`
* **Destino:** `home-intranet.php?nombre=HALCON+PRUEBA`
* **Propósito:** Entorno adaptado para la red de agencias de Halcón Viajes (rojo `#FF2F28`, logo `/halcon/img/logo-header-intranet.png`).

---

### B. Base de Datos (MySQL)
* **Host / Servidor:** Legacy Dynamic Tours
* **Usuario:** `qaqv900`
* **Contraseña:** `denada2026@DT`

---

### C. FTP (Servidor de Despliegue)
* **Host / Servidor:** Legacy Dynamic Tours
* **Usuario:** `seo6006`
* **Contraseña:** `denada2026@DT`

---

## 2. URLs y Rutas Clave de la Plataforma Actual

* **Web Pública:** `https://www.dynamic-tours.com/`
* **Acceso / Login Agencias:** `https://www.dynamic-tours.com/2016-acceso` (envía POST a `control_usuario.php`)
* **Registro / Alta de Agencias:** `https://www.dynamic-tours.com/2018-registro-agencias` (envía POST a `2018-alta-cliente.php`)
* **Intranet Principal (Autenticada):** `https://www.dynamic-tours.com/home-intranet.php`
* **Cierre de Sesión:** `https://www.dynamic-tours.com/cerrar_sesion.php`
* **Módulos Operativos de Agencia:**
  - **Reservas y Presupuestos:** `/mis-reservas-intranet.php`
  - **Facturación:** `/mis-facturas-intranet.php`
  - **Bandeja de Mensajes:** `/mis-mensajes-intranet.php`
  - **Datos de Agencia y Comisiones:** `/2018-mis-datos.php`
  - **Viajes Destacados Intranet:** `/destacado.php`

---

## 3. Recorrido Paso a Paso y Hallazgos

### Fase 1: Home Pública (Sin Registrar)
1. **Cabecera y Barra Superior:**
   - Logotipo principal de Dynamic Tours (`img/logotop.png`).
   - Enlaces directos: *Contacto*, *Registro Agencias* (`2018-registro-agencias`) y botón destacado *Acceso Agencias* (`2016-acceso`).
   - Contacto telefónico directo (915 521 443), botón WhatsApp (690 125 031) y email de contacto.
2. **Menú de Navegación:**
   - *Inicio*, *Grandes Viajes* (desplegable megamenú por continentes: África, América, Asia, Europa, Oriente Medio), *Egipto desde Provincias*, *Grupos*, *Buceo*.
3. **Catálogo y Precios:**
   - Se muestran precios PVP finales ("desde X €"), orientados a consulta, pero sin desglose de comisión mayorista ni botón directo de emisión de reserva o expediente sin autenticación previa.

### Fase 2: Formulario de Registro / Alta de Agencia (`2018-registro-agencias`)
El formulario solicita los siguientes campos obligatorios y de validación profesional B2B:
* **Credenciales:** `usuario`, `pwd` (contraseña), `pwd2` (repetición).
* **Datos Generales:**
  - `nombre` (Nombre comercial de la agencia).
  - `direccion`, `ciudad`, `provincia` (selector provincial), `cpostal`.
  - `telefono`, `fax`, `email`, `web`.
* **Datos Fiscales y de Sector:**
  - `grupo` (Grupo de gestión o red minorista al que pertenece).
  - `cicma` / Título-Licencia de agencia de viajes.
  - `codigo` (Código interno de agencia).
  - `nombrefiscal` (Razón Social completa).
  - `cif` (NIF / CIF de la agencia).
  - `personacontacto` y `telefonocontacto`.
  - Aceptación de política de privacidad (`politica`).

### Fase 3: Home de Intranet de Agencia (`home-intranet.php`)
Al iniciar sesión como agencia, la experiencia cambia radicalmente:
1. **Header de Intranet (`.header-intranet`):**
   - Se sustituye la barra pública por un encabezado oscuro con saludo personalizado: *"Hola, [NOMBRE AGENCIA]"*.
   - Accesos directos a soporte de reservas (`reservas@dynamic-tours.com`, `915 521 443`) y botón explícito de *Cerrar Sesión*.
2. **Carousel B2B y Ofertas para Profesionales:**
   - Banners con descuentos especiales y cupos (ej. *"Rebajas 2026: Turquía ¡100€ dto. por persona!"*, *"Egipto Selecto Senior"* o salidas charter).
3. **Cuadrícula de las 4 Herramientas Operativas:**
   - **Reservas y Presupuestos** (`mis-reservas-intranet.php`): Filtros por tipo (Reserva vs. Presupuesto), localizador, fechas de salida y estado.
   - **Bandeja de Mensajes** (`mis-mensajes-intranet.php`): Canal de comunicación directo para peticiones especiales o dudas operativas.
   - **Facturas** (`mis-facturas-intranet.php`): Histórico de facturación, estado de pago y descarga.
   - **Datos de la Agencia** (`2018-mis-datos.php`): Datos fiscales, de contacto y **pactos de comisión** (`acuerdo_cat`, `acuerdo_ofe`, `acuerdo_sup_ofe`, `acuerdo_web`).

### Fase 4: Comparativa de Entorno Personalizado (`halpru`) vs. Estándar (`DTprueba`)
Dynamic Tours dispone de un sistema de adaptación multi-tenant o marca de red:
* **Logotipo de Cabecera:**
  - Estándar (`DTprueba`): Logo Dynamic Tours B2B.
  - Personalizado (`halpru`): Sustituido por `/halcon/img/logo-header-intranet.png` (branding Halcón Viajes).
* **Paleta de Colores en Menús y Componentes:**
  - Estándar: Azul corporativo Dynamic (`#00529b` / `#0b1d3a`).
  - Personalizado (`halpru`): El fondo del cajón de continentes pasa al rojo corporativo de Halcón (`#FF2F28`).
* **Iconografía:**
  - Estándar: `images/aplicacion/*.png`.
  - Personalizado: `https://www.dynamic-tours.com/halcon/images/aplicacion/*.png`.
* **Condiciones Comerciales:**
  - Asignación directa de comisión en ficha (ej. 18% en acuerdos de catálogo y web para Halcón).
