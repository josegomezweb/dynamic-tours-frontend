# Contexto Maestro: Dynamic Tours

## 1. ¿Qué es Dynamic Tours?
Dynamic Tours es el **touroperador mayorista (B2B)** del grupo. 
A diferencia de KIP Viajes (que es una agencia minorista orientada a cliente final B2C), los usuarios de la web de Dynamic son **agentes de viajes profesionales** de toda España.

* **Volumen:** Recibe entre 800 y 1.000 accesos diarios de agencias minoristas.
* **Uso:** Las agencias entran para consultar destinos, comparar circuitos, descargar itinerarios en PDF, presupuestar y emitir reservas con sus condiciones mayoristas.
* **Identidad:** Marca establecida en el sector con décadas de trayectoria. No se busca un cambio radical de identidad que desoriente a las agencias habituales, sino una modernización limpia, funcional y profesional ("Branding aplicado a web").

---

## 2. Equipo Clave e Interlocutores
* **Alberto:** Responsable de operativa y dirección comercial de Dynamic Tours. Es el interlocutor principal para requerimientos, validación visual y flujos de agencia.
* **Víctor y Elena:** Departamento de informática y desarrollo backend de Dynamic Tours. Mantienen el sistema legacy (PHP/MySQL) y serán los encargados de conectar este frontend con el backend existente.
* **Khaled e Ismael:** Dirección ejecutiva del grupo.
* **José (De Nada):** Dirección técnica y diseño/desarrollo frontend.

---

## 3. Arquitectura y Entorno Técnico Actual
* **Backend actual:** Monolito PHP clásico conectado a base de datos MySQL.
* **Despliegue legacy:** Servidor con subida y sincronización por FTP.
* **Separación de capas:** Este nuevo repositorio (`dynamic-tours-frontend`) se construye de forma desacoplada con **Vite + React + TypeScript + Tailwind CSS**, generando un build estático/maquetado limpio que pueda integrarse o consumirse por el entorno de Dynamic sin arrastrar deuda técnica de PHP antiguo.

---

## 4. Reglas Fundamentales del Proyecto
1. **Aislamiento total respecto a KIP Viajes:** Ningún cambio, paquete, componente ni regla de este repo debe contaminar `kip-viajes-frontend` ni viceversa.
2. **Mentalidad B2B:** Menos florituras de marketing de consumo masivo y más foco en densidad de información, claridad de precios netos/comisiones, rapidez de búsqueda y lectura clara de itinerarios e inclusiones.
3. **Fase 1 cerrada:** No entrar en programación de backend, lógica de pasarelas ni reescritura de bases de datos. Todo el alcance de esta fase se ciñe a branding aplicado y maquetación de pantallas clave.
