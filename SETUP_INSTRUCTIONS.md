# 🚀 CulturaGO - Instrucciones de Configuración Completa

## Estado Actual ✅

- **Frontend**: Configurado y listo
- **Backend API**: Creado y listo  
- **Smart Contract**: Código listo, falta despliegue
- **Integración**: Completa entre frontend y backend

## 🔧 Pasos Restantes para Completar

### 1. Configurar Variables de Entorno del Backend

Crear archivo `backend/.env`:

```env
# Servidor
PORT=3001
NODE_ENV=development

# Avalanche Fuji  
FUJI_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
OWNER_PRIVATE_KEY=tu_private_key_sin_0x_prefix
CONTRACT_ADDRESS=0x_sera_reemplazado_después_del_despliegue

# CORS
CORS_ORIGIN=http://localhost:5173
```

### 2. Configurar Variables de Entorno del Frontend

Crear archivo `culturago-frontend/.env`:

```env
# Pinata IPFS (ya configurado)
VITE_PINATA_API_KEY=5b0e9301a0cd0e0da641
VITE_PINATA_SECRET_KEY=2d8809e053bd5baeebd938eb1a0eeee7428d93f4b0231d73637ad41f123857fd
VITE_PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMzBlMGIzOC1lMDM3LTQyYTMtOGZkZi0zZDkwZjRmMTE4Y2UiLCJlbWFpbCI6Im1hcmNvcy5yZXllcy5tQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWVSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1YjBlOTMwMWEwY2QwZTBkYTY0MSIsInNjb3BlZEtleVNlY3JldCI6IjJkODgwOWUwNTNiZDViYWVlYmQ5MzhlYjFhMGVlZWU3NDI4ZDkzZjRiMDIzMWQ3MzYzN2FkNDFmMTIzODU3ZmQiLCJleHAiOjE3OTIyODI4MjZ9.c5nw_cvZaAR6qMKfZV8xvnllaPnBUR6xT9m1F74hiQo

# Backend API
VITE_API_BASE_URL=http://localhost:3001/api
```

### 3. Desplegar Smart Contract

```bash
cd contracts
npm install  # (si no está hecho)
npm run compile
npm run deploy:fuji
```

**IMPORTANTE**: Copiar la dirección del contrato del output y agregarla a `backend/.env`:
```env
CONTRACT_ADDRESS=0x_DIREECCION_DEL_CONTRATO_AQUI
```

### 4. Iniciar Sistema Completo

```bash
# En terminal 1: Backend
cd backend
npm run dev

# En terminal 2: Frontend  
cd culturago-frontend
npm run dev
```

O usando el script conjunto:
```bash
npm run dev  # Desde la raíz del proyecto
```

## 🧪 Verificación del Sistema

### 1. Health Check Backend
```bash
curl http://localhost:3001/api/health
```

### 2. Frontend Accesible
- http://localhost:5173 (o puerto mostrado)

### 3. Test de Emisión Completa
1. Ir a Dashboard en frontend
2. Llenar formulario con:
   - Nombre del artista
   - Evento/festival  
   - Wallet de destino (dirección Avalanche válida)
3. Subir imagen (opcional)
4. Hacer clic en "Emitir Pasaporte Cultural"

**Resultado esperado**: El sistema debería ejecutar los 4 pasos completos y mostrar:
- Hash IPFS de metadatos
- Token ID del NFT mint
- Hash de transacción
- Enlaces a Snowtrace e IPFS

## 🚨 Solución de Problemas

### Error: "Backend no conecta"
- Verificar que `backend/.env` existe y tiene las variables correctas
- Verificar que el puerto 3001 no esté ocupado

### Error: "Contrato no inicializado"  
- Verificar que `CONTRACT_ADDRESS` está configurado en `backend/.env`
- Verificar que la dirección del contrato es válida

### Error: "Insufficient funds"
- Obtener AVAX de prueba en: https://faucet.avax.network/
- Verificar que `OWNER_PRIVATE_KEY` es correcta

## 📋 Checklist Final

- [ ] `backend/.env` configurado
- [ ] `culturago-frontend/.env` configurado  
- [ ] Smart contract desplegado
- [ ] Backend corriendo en puerto 3001
- [ ] Frontend corriendo en puerto 5173
- [ ] Test de emisión exitoso

Una vez completados estos pasos, el sistema estará 100% funcional! 🎉
