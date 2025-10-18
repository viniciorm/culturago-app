/**
 * server.js - Servidor Backend para CulturaGO
 * 
 * API REST para emisión de Pasaportes Culturales NFT:
 * - POST /api/passport: Emite un pasaporte cultural
 * - GET /api/health: Health check
 * 
 * Integra:
 * - Smart Contract CulturaPassport en Avalanche Fuji
 * - Pinata IPFS para metadatos
 * - Validación de datos y manejo de errores
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const passportRoutes = require('./routes/passport');
const { errorHandler } = require('./middleware/errorHandler');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware CORS - Acepta múltiples orígenes para desarrollo
const allowedOrigins = [
  process.env.CORS_ORIGIN || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:5177',
  'http://localhost:5178',
  'http://localhost:5179',
  'http://localhost:5180'
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origen (como Postman) en desarrollo
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS bloqueado para origen: ${origin}`);
      callback(null, true); // En desarrollo, permitir todos los orígenes
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api', passportRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'CulturaGO Backend API',
    version: '1.0.0'
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'CulturaGO Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      passport: '/api/passport'
    }
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.method} ${req.originalUrl} no existe`
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 CulturaGO Backend API iniciado en puerto ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 API Base: http://localhost:${PORT}/api`);
  
  // Verificar configuración crítica
  const requiredEnvVars = ['OWNER_PRIVATE_KEY', 'CONTRACT_ADDRESS', 'FUJI_RPC_URL'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn(`⚠️  Variables de entorno faltantes: ${missingVars.join(', ')}`);
  } else {
    console.log('✅ Configuración crítica completada');
  }
});

module.exports = app;
