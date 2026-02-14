# Frontend — Instrucciones

## Ejecución

### Requisitos

- Node.js (v18 o superior)
- pnpm

### Instalación

```bash
pnpm install
```

### Ejecutar la app

```bash
pnpm start
```

Desde la terminal de Expo puedes abrir:

- **Android:** `a` o `pnpm android`
- **iOS:** `i` o `pnpm ios`
- **Web:** `w` o `pnpm web`

---

## Pruebas unitarias

```bash
# Ejecutar todos los tests
pnpm test

# Modo watch (re-ejecuta al cambiar archivos)
pnpm test:watch

# Tests con reporte de cobertura
pnpm test:coverage
```

Los tests usan Jest y React Native Testing Library. Están en carpetas `__tests__` junto a los módulos (schemas, services, hooks, components).
