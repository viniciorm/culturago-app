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

## ⚙️ Stack Tecnológico Completo

### Frontend
- **React 19.1.1** - Biblioteca UI
- **React DOM 19.1.1** - Renderizado
- **TypeScript 5.9.3** - Tipado estático
- **Vite 7.1.7** - Bundler y dev server
- **React Router DOM 7.9.4** - Navegación SPA
- **Axios 1.12.2** - Cliente HTTP
- **@avalabs/avalanchejs 5.0.0** - SDK de Avalanche
- **ESLint 9.36.0** - Linter
- **TypeScript ESLint 8.45.0** - Linter para TypeScript
- **@vitejs/plugin-react 5.0.4** - Plugin React para Vite
- **CSS puro** - Estilos (migrado desde Tailwind CSS)
- **Desarrollado con Cursor** - Editor AI-powered

### Backend
- **Node.js** - Runtime JavaScript
- **Express 4.18.2** - Framework web
- **CORS 2.8.5** - Manejo de CORS
- **dotenv 16.4.5** - Variables de entorno
- **Ethers.js 6.13.2** - Interacción con blockchain
- **Axios 1.7.7** - Cliente HTTP
- **Multer 1.4.5-lts.1** - Manejo de archivos multipart
- **Joi 17.13.3** - Validación de esquemas
- **Nodemon 3.1.7** - Auto-reload en desarrollo
- **Jest 29.7.0** - Framework de testing

### Smart Contracts & Blockchain
- **Solidity 0.8.24** - Lenguaje de contratos
- **Hardhat 2.22.5** - Framework de desarrollo
- **@nomicfoundation/hardhat-toolbox 5.0.0** - Herramientas Hardhat
- **OpenZeppelin Contracts 5.0.2** - Contratos seguros (ERC721, Ownable)
- **Ethers.js 6.13.2** - Interacción con blockchain desde backend
- **Avalanche Fuji Testnet** - Red blockchain (Chain ID: 43113)
- **NFTs Soulbound** - Tokens no transferibles (ERC721 modificado)

### Infraestructura & Almacenamiento
- **Pinata** - Servicio IPFS para almacenamiento descentralizado
- **IPFS Gateway** - Acceso a contenido IPFS (gateway.pinata.cloud)
- **Concurrently 8.2.2** - Ejecución paralela de scripts
- **Git** - Control de versiones

### Integraciones Externas
- **Pinata API** - Subida de metadatos e imágenes a IPFS
- **Avalanche C-Chain** - Red para mint de NFTs
- **Snowtrace** - Block explorer (testnet.snowtrace.io)
- **Core Wallet / MetaMask** - Wallets Web3 para conexión

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
- **Puerto**: http://localhost:5173
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
