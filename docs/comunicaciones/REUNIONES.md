# Registro de Reuniones - Proyecto Dynamic Tours

Documento centralizado para la recopilación cronológica de actas, acuerdos, decisiones estratégicas y seguimiento técnico-comercial de las reuniones del proyecto **Dynamic Tours**.

---

## Reunión 1: Presentación de Restyling de Marca, Propuesta de Nueva Home y Alineamiento Estratégico

**Fecha:** 22 de septiembre de 2026  
**Hora:** 11:00 - 12:00  
**Asistentes:**
- **José** (De Nada / Dirección técnica y desarrollo frontend)
- **Conchi** (De Nada / Diseño, branding y dirección de arte)
- **Alberto** (Dynamic Tours / Dirección y operaciones)
- **Ismael / Daniel** (Dynamic Tours / Coordinación comercial y producto)
*(Menciones operativas: Elena en backend/analytics y Jessica en gestión de reservas/KIP)*  
**Modalidad:** Videollamada (Google Meet)

---

### Resumen Ejecutivo

Primera reunión formal de presentación y contraste con la dirección de Dynamic Tours para acordar la fase previa al desarrollo del nuevo frontend: el **restyling de marca (logotipo)** y la **definición conceptual de la nueva Home pública**.

La reunión concluye con un **consenso claro en la línea visual del logo** (se descartan rupturas radicales y se valida evolucionar la **Opción 1**, priorizando el azul corporativo y suavizando formas), la **elección unánime del claim comercial**, y la directriz de diseñar una **Home pública basada en vídeo/imágenes inmersivas a sangre** (inspirada en la elegancia de Katai e Icarión) pero manteniendo un bloque ágil de ofertas y atajo rápido de reserva para agencias habituales. Adicionalmente, se debatió sobre la simplificación del embudo de venta en KIP Viajes y la futura integración con la API de disponibilidad en tiempo real desarrollada en Dynamic.

---

### Puntos Clave y Decisiones

#### 1. Restyling del Logotipo e Identidad Visual

Se presentaron 3 líneas conceptuales de restyling preparadas por el equipo de De Nada:
- **Opción 1 (Recomendada / Aprobada):** Evolución continuista sobre el logo histórico. Tipografía redondeada y amable, curvas suavizadas y la incorporación en el arco de la «D» de un sutil trazo/tick con guiño a la silueta de un avión.
- **Opción 2:** Dinámica ascendente con el avión al final de una estela (descartada).
- **Opción 3:** Ruptura tipográfica y cromática total (descartada tajantemente).

**Criterios y decisiones acordadas:**
- **Validación de la Opción 1:** Es la que mejor equilibra modernidad y respeto a la trayectoria de la empresa. Dynamic no busca un cambio de choque que confunda a las agencias que llevan décadas trabajando con ellos.
- **Ajuste cromático estricto:** 
  - Se descarta totalmente la gama dorada/arena de la presentación (*"recuerda a Explora"*).
  - El **AZUL es el protagonista y sello de identidad absoluto** de Dynamic Tours.
  - El **verde fosforito histórico se reduce al mínimo o se abandona** como color plano. Se aprueba experimentar con un degradado sutil de azul predominante hacia toques de verde suave o pastel, integrándolo en el isotipo/arco sin estridencias.
- **Tipografía y percepción:** Muy buena acogida a la tipografía más redondeada y humana frente a la antigua estructura excesivamente cuadriculada. Se destaca que en el sector todos les llaman *"Dynamic"*, por lo que el peso visual de la palabra Dynamic debe liderar la composición.

---

#### 2. Elección del Claim de Marca

Se evaluaron tres opciones de eslogan para abanderar la comunicación B2B:
1. *«Más mundo para tus viajeros, más respaldo para tu agencia»*  
   👉 **SELECCIONADO POR UNANIMIDAD.** Resulta cercano, empático y define la doble vertiente de Dynamic: producto de calidad para el cliente final y solidez/soporte para el agente de viajes.
2. *«El motor mayorista de tus mejores viajes»* (descartado por percibirse demasiado técnico y frío).
3. *«Operativa experta para agencias líderes»* (descartado por excesivamente formal).

---

#### 3. Nueva Home Pública: Arquitectura y Experiencia de Usuario

Se revisaron los bocetos interactivos iniciales para la portada de `dynamic-tours.com`. Se definieron con claridad los **tres pilares irrenunciables de la Home pública**:

1. **Imagen / Inmersión (Hero Header):**
   - **Vídeo sobre imagen fija:** Preferencia absoluta por fondo de vídeo de alta calidad que transporte al usuario a los destinos desde el primer segundo.
   - **Descarte de tarjetas giratorias en portada:** El carrusel de tarjetas 3D no convence en el hero principal; se acuerda reubicar ese componente más abajo como escaparate de *"Destacados"* o *"Últimas plazas"*.
   - **Cuidado con la iluminación:** Evitar fondos excesivamente oscuros o filtros negros pesados que resten viveza; oscurecer de forma degradada únicamente las zonas inferiores o laterales donde repose el texto legible.

2. **Autobombo y Confianza B2B:**
   - Explicar con orgullo el valor diferencial de Dynamic: años de experiencia, soporte especializado a la agencia, producto propio, cupos garantizados y salidas charter.
   - **Sección de Grupos:** Siguiendo la referencia de CN Travel, se acuerda crear un bloque destacado específico para cotización y gestión de viajes en grupo (clave en el volumen de ventas).

3. **Captación de Nuevas Agencias vs. Acceso Rápido para Clientes Habituales:**
   - **Dualidad de caminos:** La home debe enamorar a la agencia que entra por primera vez (con un flujo de solicitud de alta/registro claro) y a la vez ser un atajo ultra rápido (login en cabecera / acceso directo a reserva) para el agente veterano que no quiere leer y entra a cotizar de inmediato.

---

#### 4. Benchmark de la Competencia Analizado en Sesión

Durante la reunión se navegaron y contrastaron varios portales mayoristas de referencia:
- **Katai:** El modelo a seguir en elegancia, limpieza visual, uso del espacio e impacto fotográfico/vídeo.
- **Icarión:** Muy bien valorada por su estética moderna, vídeo envolvente y el recurso de flyers maquetados descargables para agencias.
- **Club 5 Estrellas:** Considerada el extremo opuesto a evitar. Sobrecargada, agresiva y tipo *"bazar"* de fechas y tablas que saturan al usuario.
- **Taiko:** Interfaz pública algo anticuada/técnica y logo informal, aunque con buen motor y reconocimiento en intranet.
- **CN Travel:** Ejemplo a replicar en cuanto al tratamiento de autobombo institucional y presencia del producto para grupos.
- **TUI & Travelplan:** Revisados como gigantes del sector, pero considerados excesivamente genéricos o infantiles/antiguos en su tratamiento visual reciente.

> **Objetivo de diseño para Dynamic:** Lograr el equilibrio perfecto entre la **elegancia y limpieza editorial de Katai** y el **dinamismo de producto/ofertas propio de Dynamic**, sin caer en el bazar ruidoso.

---

#### 5. Tráfico, Tipología de Accesos y Analytics

- Alberto revisará con Elena (tras sus vacaciones) los datos de **Google Analytics** y logs de tráfico para cuantificar los puntos de entrada:
  - Tráfico orgánico directo a la Home.
  - Accesos a través de intranets corporativas con Single Sign-On (SSO) de grandes redes como Halcón Viajes, Viajes Carrefour, etc., donde los agentes acceden directamente a la intranet sin pasar por la portada pública.
- Si la analítica confirma que la gran masa de venta entra directa a intranet, la Home pública se mantendrá limpia y enfocada al 100% en imagen, captación y prestigio de marca.

---

#### 6. Conexión Operativa: Simplificación en KIP Viajes y API de Dynamic

- **Embudo de KIP Viajes:** Alberto probó el flujo de reserva de KIP y transmitió que el formulario de 4 pasos es demasiado denso y provoca fuga de clientes antes del pago. Propone un embudo ágil de 1-2 pasos centrado en asegurar la señal económica (599 €) y datos básicos de salida, derivando la recopilación de datos personales secundarios a la gestión posterior de Jessica.
- **Integración con API de Dynamic:** Se destacó que Dynamic Tours ya cuenta con una API de disponibilidad real desarrollada (utilizada con éxito por clientes externos como *Micrucero Fluvial*). El objetivo a medio plazo es conectar KIP Viajes directamente contra esta API de Dynamic para disponer de confirmación automática de plazas y reducir la carga manual de Jessica.

---

### Frases Clave de la Reunión

> *"El azul es nuestro sello de identidad; el verde fosforito lo he ido abandonando porque es muy agresivo, pero el azul transmite calidez y confianza."* — **Alberto**

> *"Dynamic es la nave nodriza, la matriz. Nuestro logo no es Nike, las agencias lo conocen por su trayectoria; no podemos romper de golpe, hay que modernizarlo con delicadeza."* — **Alberto / Conchi**

> *"Vídeo siempre sobre imagen. Necesitamos que cuando una agencia entre a la nueva web diga 'guau', que se note la transformación."* — **Equipo Dynamic**

> *"Queremos la elegancia y limpieza de Katai, pero sin perder nuestra capacidad de mostrar nuestras ofertas y cupos garantizados sin ser un bazar agresivo como Club 5 Estrellas."* — **Alberto**

> *"Dynamic ya tiene una API de disponibilidad desarrollada que funciona sola con clientes externos; el siguiente paso es conectar KIP a esa misma realidad."* — **Ismael / Alberto**

---

### Acuerdos y Próximos Pasos

| Tarea | Responsable | Estado / Plazo |
| :--- | :--- | :--- |
| **Iterar Restyling Logo (Opción 1):** Aplicar paleta con azul predominante absoluto, toques mínimos en degradado a verde suave, y eliminar dorados. | Conchi (De Nada) | En curso |
| **Boceto de Home con Vídeo Hero:** Adaptar la propuesta de portada sustituyendo tarjetas por vídeo/fotografía inmersiva, oscurecimiento inferior y sección de grupos estilo CN Travel. | José & Conchi (De Nada) | Próxima entrega |
| **Incorporar Claim Oficial:** Integrar *«Más mundo para tus viajeros, más respaldo para tu agencia»* en todos los soportes y maquetas. | Equipo De Nada | Aprobado |
| **Auditoría de Tráfico y Analytics:** Consultar con Elena métricas de tráfico Home vs accesos directos SSO/Intranet. | Alberto & Elena (Dynamic) | Semana próxima |
| **Revisión Formulario KIP Viajes:** Ajustar embudo rápido para recortar pasos hacia la conversión y pasarela. | José & Jessica | Inmediato |
