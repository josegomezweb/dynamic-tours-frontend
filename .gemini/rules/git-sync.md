# Regla de Sincronización Automática de Repositorio

1. **Pull inicial obligatorio:** Antes de empezar cualquier edición o lectura de código para una nueva petición del usuario, ejecuta siempre `git pull` para traerte lo que tu compañero haya subido recientemente.
2. **Validación previa:** Al terminar una tarea, ejecuta siempre `npm run build` para asegurar que el proyecto compila correctamente.
3. **Push final obligatorio:** Tras verificar que compila, realiza `git add .`, `git commit -m "..."` y `git push` automáticamente.
