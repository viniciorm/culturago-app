# CulturaGO Backend API

Backend API para emisión de Pasaportes Culturales NFT en Avalanche blockchain.

## 🚀 Configuración Rápida

### 1. Instalar Dependencias
```bash
cd backend
npm install
```

### 2. Configurar Variables de Entorno

Copia `env.example` a `.env` y configura:

```env
# Servidor
PORT=3001
NODE_ENV=development

# Avalanche Fuji
FUJI_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
OWNER_PRIVATE_KEY=tu_private_key_sin_0x_prefix
CONTRACT_ADDRESS=0x_direccion_del_contrato_desplegado

# CORS
CORS_ORIGIN=http://localhost:5173
```

### 3. Obtener Dirección del Contrato

Primero despliega el smart contract:

```bash
cd ../contracts
npm install
npm run compile
npm run deploy:fuji
```

Copia la dirección del contrato a tu `.env` del backend.

### 4. Iniciar Servidor

```bash
npm run dev  # Desarrollo
npm start    # Producción
```

## 📡 Endpoints

### POST /api/passport
Emite un nuevo pasaporte cultural NFT.

**Request:**
```json
{
  "name": "María González",
  "event": "Festival Danza del Vientre Chile 2025",
  "wallet": "0x123...",
  "imageUri": "https://gateway.pinata.cloud/ipfs/...",
  "ipfsUri": "ipfs://QmHash..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pasaporte cultural emitido exitosamente",
  "data": {
    "tokenId": "1",
    "txHash": "0xabc...",
    "blockNumber": 12345,
    "blockExplorerUrl": "https://testnet.snowtrace.io/tx/0xabc...",
    "contractAddress": "0xdef...",
    "ipfsUri": "ipfs://QmHash...",
    "recipient": "0x123..."
  }
}
```

### GET /api/health
Verifica el estado del servidor.

### GET /api/passport/:tokenId
Obtiene información de un pasaporte específico.

## 🔧 Arquitectura

```
backend/
├── server.js              # Servidor principal
├── routes/
│   └── passport.js        # Rutas de pasaportes
├── middleware/
│   ├── validation.js      # Validación de requests
│   └── errorHandler.js    # Manejo de errores
└── services/
    └── passportService.js # Lógica de blockchain
```

## 🔗 Integración Frontend

El frontend ya está configurado para usar este backend:

```typescript
// El frontend llama automáticamente a:
// POST http://localhost:3001/api/passport
```

## 🛡️ Seguridad

- ⚠️ **NUNCA** commits el archivo `.env` 
- 🔐 La `OWNER_PRIVATE_KEY` debe ser una wallet de testnet
- 🌐 Usa CORS apropiadamente en producción
- ⛽ Verifica que la wallet tenga suficiente AVAX para gas

## 🐛 Solución de Problemas

### Error: "Contrato no inicializado"
- Verifica `CONTRACT_ADDRESS` en `.env`
- Asegúrate de que el contrato esté desplegado

### Error: "No se pudo conectar con el servidor"
- Verifica `FUJI_RPC_URL`
- Chequa tu conexión a internet

### Error: "Insufficient funds"
- Obtén AVAX de prueba en el faucet de Avalanche
- Verifica que `OWNER_PRIVATE_KEY` sea correcta
