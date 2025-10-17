# tdd.md – Estrategia de Pruebas

## Objetivos
Asegurar que el flujo crítico **/api/passport → IPFS → Avalanche** funciona y retorna datos válidos para la UI.

## Tipos de prueba
### 1) Unitarias (backend/services)
- `ipfs.uploadMetadata()` → retorna `{ uri, cid }`.
- `avalanche.mintPassport(to, uri)` → retorna `{ tokenId, txHash }` (mockable).

### 2) Integración (API)
- `POST /api/passport` con `{ name, wallet, event }` → `200` y body `{ tokenId, txHash, uri }`.
- Errores controlados: `400` si faltan campos, `502` si IPFS falla, `503` si RPC no responde.

### 3) UI (manual – Glide)
- Form "Emitir Pasaporte" llama `POST /api/passport`.
- Vista del pasaporte muestra: nombre, evento, **IPFS (http gateway)** y **Snowtrace**.

## Herramientas
- Jest + Supertest (backend)  
- Checklists de UI en Glide

## Check de salida (DoD)
- Al menos **1 pasaporte emitido** en Fuji (tx verificable).  
- Vista de pasaporte enlaza a **IPFS** y **Snowtrace**.  
- README actualizado + video demo (≤ 60s).
