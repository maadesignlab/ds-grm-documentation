# Cierre local de v1.1.0

Estado: validación técnica con excepciones; pendiente de aprobación explícita del usuario. No publicado y sin actualización remota.

## Trazabilidad

- Global: 1.0.0 → 1.1.0, baseline d47da42.
- Cada componente conserva la secuencia documentada en su MDX. El manifiesto recoge las versiones anterior y actual, cambios, variantes y roles afectados.
- Variables y estilos: ID estable de Figma, versión individual y huella. Primer registro en 1.1.0; no se inventa un historial previo.
- Se conservan las evidencias anteriores y el registro de diferencias por sincronización.

## Revisión

Releases reproduce la estructura de 1.0.0: Incluye, Componentes incluidos y Validación de cierre. Los 50 botones de componentes abren una ficha con versiones, actualizaciones y tokens afectados, con enlace a Tokens para consultar los valores por marca.

Las 28 excepciones de primary/brand-gradient de Reina Madre y Piel Sana siguen documentadas. No se afirma conformidad WCAG completa.

Pruebas de selección de los 50 componentes aprobadas en las cuatro marcas. Lint sin errores (advertencia preexistente en escáner archivado), tipos y compilación correctos. Requiere release:verify aprobado sobre estos archivos finales.

La publicación, el push y cualquier actualización remota quedan pendientes de aprobación del usuario tras revisar este resultado local.

## Navegación final

Las seis vistas internas de Releases, Tokens por marca y Typography se excluyen de la navegación mediante las etiquetas !dev y !autodocs. Las páginas MDX públicas y los Playground de componentes permanecen. Las pruebas internas y sus evidencias se conservan; las seis pruebas pasan tras el ajuste. No cambia el estado pendiente de aprobación.
