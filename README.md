# 🌍 CulturaGO – Pasaporte Cultural Web3

> “La cultura también puede ser interoperable.”  
> Hackatón Avalanche Build 2025 · Track: **Interoperabilidad**

## 🔎 Descripción corta
CulturaGO es una plataforma Web3 que transforma la identidad cultural en activos digitales verificables. Permite a artistas y organizaciones emitir **Pasaportes Culturales** como **NFTs soulbound** sobre **Avalanche**, certificando trayectoria y participación de forma segura e interoperable.

## ✨ Características Principales
- **🖼️ Subida de Imágenes**: Validación de formato y tamaño (máx. 4MB)
- **🌐 IPFS Integration**: Almacenamiento descentralizado via Pinata
- **🎨 UI Moderna**: Interface React con CSS puro (migrado desde Tailwind)
- **🤖 Desarrollado con Cursor**: Editor AI-powered para desarrollo eficiente
- **📱 Responsive Design**: Funciona en desktop y móvil
- **🎉 UX Premium**: Popups de éxito con animaciones profesionales
- **🔗 Blockchain Ready**: Integración completa con Avalanche Fuji
- **✅ Validaciones**: Formato de imagen, tamaño de archivo, campos obligatorios

## 🎯 Objetivo del MVP
- Demostrar un flujo completo de **emisión de pasaporte** (Web2→Web3) en 4 días.
- Front **vibecoding Cursor** + backend propio (Node/Express) + **Avalanche Fuji** + **PINATA** + **IPFS**.
- Mostrar demo navegable y un video corto para el jurado.

## ⚙️ Stack del MVP

### Frontend
- **React 19** + **TypeScript** + **Vite**
- **React Router DOM** para navegación
- **CSS puro** (migrado desde Tailwind CSS)
- **Axios** para requests HTTP
- **ESLint** + **TypeScript** para calidad de código
- **Desarrollado con Cursor** (AI-powered editor)

### Backend & Web3
- **Node.js** + **Express** (API `/api/passport`)
- **Solidity** + **Hardhat** + **Ethers.js** (Avalanche Fuji / C-Chain)
- **Pinata** para almacenamiento IPFS
- **Avalanche Fuji** testnet
- **NFTs Soulbound** como certificados culturales

### Infraestructura
- **Vite** como bundler y dev server
- **IPFS** a través de Pinata Gateway
- **Git** para control de versiones

### Integraciones
- **Pinata API** para subida de metadatos e imágenes
- **Avalanche C-Chain** para mint de NFTs
- **Core Wallet** / **MetaMask** para conexión Web3

## 🧱 Arquitectura (alto nivel)

### Flujo de Emisión de Pasaporte
1. **Frontend React** → Formulario de datos del artista
2. **Subida a Pinata** → Metadatos e imagen a IPFS
3. **Backend API** → Procesa datos y prepara mint
4. **Avalanche Fuji** → Ejecuta `mintPassport()` (NFT soulbound)
5. **Confirmación** → Hash de transacción y URI de IPFS
6. **Galería** → Muestra pasaporte emitido

### Tech Stack Flow
```
React Frontend → Pinata IPFS → Backend API → Avalanche C-Chain
     ↓              ↓              ↓              ↓
   UI/UX      Metadatos        Validación    NFT Mint
   Forms      Storage          Procesamiento Transaction
```

## 🚀 Desarrollo Local

### Instalación Completa
```bash
# Instalar todas las dependencias
npm run install:all

# Iniciar desarrollo completo (frontend + backend)
npm run dev
```

### Componentes Individuales

#### Frontend (React + Vite)
```bash
cd culturago-frontend && npm install && npm run dev
```
- **Puerto**: http://localhost:5178
- **Editor**: Desarrollado con **Cursor** (AI-powered)

#### Backend API (Node.js + Express)
```bash
cd backend && npm install && npm run dev
```
- **Puerto**: http://localhost:3001
- **Endpoints**: `/api/passport`, `/api/health`

#### Smart Contracts (Hardhat)
```bash
cd contracts && npm install && npm run deploy:fuji
```

### Variables de Entorno

#### Frontend (.env)
```bash
VITE_PINATA_API_KEY=tu_api_key_aqui
VITE_PINATA_SECRET_KEY=tu_secret_key_aqui
VITE_PINATA_JWT=tu_jwt_token_aqui
VITE_API_BASE_URL=http://localhost:3001/api
```

#### Backend (.env)
```bash
PORT=3001
FUJI_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
OWNER_PRIVATE_KEY=tu_private_key_sin_0x_prefix
CONTRACT_ADDRESS=0x_direccion_del_contrato_desplegado
CORS_ORIGIN=http://localhost:5173
```

## 🗺️ Roadmap (4 días)
**Día 1:** Setup + contrato en Fuji + docs · **Día 2:** API + IPFS + mint  
**Día 3:** UI/UX React + galería · **Día 4:** Demo + pitch + entrega

## 📂 Documentos
- `productmanager.md` — alcance, KPIs, backlog, GTM  
- `agents.md` — roles y responsabilidades  
- `tdd.md` — estrategia de pruebas  
- `context.md` — contexto y supuestos

## 📄 Licencia
MIT © 2025 CulturaGO
