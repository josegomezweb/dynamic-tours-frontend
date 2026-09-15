# Dynamic Tours - Frontend (Fase 1)

Plataforma mayorista B2B para agencias de viajes. Proyecto de modernización visual, diseño UX/UI y maquetación frontend desacoplada.

---

## 📁 Estructura del Proyecto

```text
dynamic-tours-frontend/
├── docs/
│   ├── comercial/      # Propuesta aprobada (Fase 1: 4.500 €), alcance y entregables
│   ├── contexto/       # Contexto de negocio, equipo, interlocutores y reglas
│   └── referencias/    # PDFs oficiales de propuesta y factura de anticipo
├── src/
│   ├── assets/         # Recursos estáticos (logos, imágenes)
│   ├── components/     # Componentes modulares reutilizables (en desarrollo)
│   ├── App.tsx         # Vista principal / esqueleto de maquetación
│   ├── index.css       # Directivas Tailwind y estilos base
│   └── main.tsx        # Punto de entrada de React
├── desarrollo.md       # Bitácora de trabajo y control de cambios
├── tailwind.config.js  # Tokens de diseño y colores corporativos
└── package.json        # Dependencias (React, Vite, Tailwind, Lucide)
```

---

## 🚀 Comandos Disponibles

* `npm run dev`: Inicia el servidor local de desarrollo con Vite.
* `npm run build`: Compila TypeScript y genera el bundle estático en `/dist`.
* `npm run preview`: Previsualiza el build de producción localmente.

---

## 📋 Resumen del Alcance Fase 1

1. **Branding aplicado a web:** Paleta, tipografías, componentes base y coherencia visual B2B.
2. **Rediseño web pública:** Home, navegación/megamenú, catálogo de destinos, fichas de viaje completas y responsive.
3. **Rediseño área privada agencias:** Home intranet, navegación de agencia y tablas de consulta.
4. **Entregable:** Frontend maquetado y listo para que el equipo de sistemas de Dynamic Tours conecte la lógica con su backend PHP/MySQL.
