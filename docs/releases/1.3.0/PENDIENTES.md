# Pendientes de v1.3.0

Versión publicada: 15 de octubre de 2026. Cierre aprobado con salvedades. Los pendientes permanecen abiertos y no invalidan el alcance validado del DS; tampoco se consideran corregidos por esta aceptación.

## DS-130-01 · Gradientes de Reina Madre y Piel Sana

- Estado: abierto.
- Responsable: Diseño DS.
- Alcance: Reina Madre: normal 4,357:1. Piel Sana: normal 1,835:1, hover 2,152:1 y active 2,549:1. Las propuestas no están aplicadas.
- Criterio de cierre: Aprobar una propuesta, conciliar Figma y código y verificar al menos 4,5:1 en todos los estados con texto normal.

## DS-130-02 · Tabs Underline de María Linda

- Estado: abierto.
- Responsable: Diseño DS.
- Alcance: Excepción histórica de 4,27:1; no se certificó nuevamente este escenario.
- Criterio de cierre: Reproducir el escenario, aprobar la corrección y adjuntar medición de contraste e interacción.

## DS-130-03 · defaultCalendarEndMonth

- Estado: abierto.
- Responsable: DEV JUNO; DS tras recibir evidencia.
- Alcance: Falta la definición anterior y los usos; la compatibilidad de ese export no se declara resuelta.
- Criterio de cierre: DEV aporta contrato y usos; DS determina la solución y DEV valida compilación y comportamiento.

## DS-130-04 · headingLevel

- Estado: abierto.
- Responsable: DEV JUNO; DS tras recibir evidencia.
- Alcance: No se identifica el componente ni el diagnóstico exacto.
- Criterio de cierre: Obtener componente, código consumidor y error reproducible; verificar la solución en DS y JUNO.

## DS-130-05 · 8 errores Varios

- Estado: abierto.
- Responsable: DEV JUNO; DS tras recibir evidencia.
- Alcance: El reporte solo indica cantidad y categoría.
- Criterio de cierre: Desglosar errores y archivos; asignar cada causa y verificar su resolución o migración.

## DS-130-06 · Integración en JUNO

- Estado: abierto.
- Responsable: DEV JUNO.
- Alcance: Los 309 errores y 40 pruebas del reporte no se consideran resueltos por las pruebas del DS. Incluye Alta de Personal, Dialog/AlertDialog y Table.
- Criterio de cierre: Ejecutar typecheck y pruebas de JUNO con esta entrega; validar flujos, capturas y diferencias restantes.

## DS-130-07 · Instalación y estilos del consumidor

- Estado: abierto.
- Responsable: DEV JUNO.
- Alcance: Falta reproducir la instalación original de 43 componentes, lockfile y estilos propios.
- Criterio de cierre: Instalar en una copia controlada de JUNO; comparar dependencias, CSS y componentes; confirmar ausencia de sobrescrituras no deseadas.

Las correcciones posteriores se versionarán según su alcance; no se modificará retroactivamente el cierre de esta entrega. Modo oscuro completo fuera de alcance; inspector sin cambios de versión.
