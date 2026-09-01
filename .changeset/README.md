# Changesets

Cada cambio visible del Design System debe incluir un changeset:

```bash
npm run changeset
```

Usa el nombre del componente al inicio del resumen, por ejemplo: `Badge: agrega la variante info outline`.

- `patch`: corrección sin modificar la API.
- `minor`: nueva variante, token o capacidad compatible.
- `major`: cambio incompatible de API, token o comportamiento.

`npm run version-packages` consume los changesets, actualiza la versión SemVer del paquete y genera `CHANGELOG.md`.
