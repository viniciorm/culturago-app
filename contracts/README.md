# CulturaGO Smart Contracts

## CulturaPassport - Soulbound ERC-721 for Cultural Identity

Este contrato implementa un NFT **soulbound** (no transferible) para pasaportes culturales en Avalanche Fuji Testnet.

### 🎯 Características

- **Soulbound**: Los NFTs no pueden ser transferidos después del mint
- **Mint Controlado**: Solo el owner puede emitir pasaportes
- **Metadata IPFS**: URIs personalizadas para cada pasaporte
- **Eventos**: Tracking completo de emisiones

### 📋 Variables de Entorno Requeridas

Crea un archivo `.env` en el directorio `/contracts/` con:

```env
FUJI_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
OWNER_PRIVATE_KEY=tu_private_key_sin_0x_prefix
```

### 🚀 Despliegue

1. **Instalar dependencias:**
```bash
npm install
```

2. **Compilar contratos:**
```bash
npm run compile
```

3. **Desplegar a Fuji:**
```bash
npm run deploy:fuji
```

### 📄 Contrato Desplegado

Después del despliegue, obtendrás:
- **Contract Address**: Dirección del contrato en Fuji
- **Transaction Hash**: Hash de la transacción de deploy
- **Owner Address**: Dirección que despliega el contrato

### 🔗 Integración con Backend

Agrega la dirección del contrato a tu `.env` del backend:

```env
CONTRACT_ADDRESS=0x...
```

### 🔍 Verificación

Visita el contrato en [Snowtrace Fuji](https://testnet.snowtrace.io/) usando la dirección del contrato.

### ⚠️ Importante

- Usa una wallet de testnet con AVAX de prueba
- Obtén AVAX de prueba en: [Faucet Avalanche](https://faucet.avax.network/)
- Nunca commits archivos `.env` al repositorio
