#!/usr/bin/env node

/**
 * Script de verificación del setup de CulturaGO
 * Verifica que todos los componentes estén configurados correctamente
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando setup de CulturaGO...\n');

// Colores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function checkFile(filePath, description, required = true) {
  const fullPath = path.resolve(filePath);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    console.log(`${colors.green}✅${colors.reset} ${description}`);
    return true;
  } else {
    const status = required ? `${colors.red}❌` : `${colors.yellow}⚠️`;
    console.log(`${status}${colors.reset} ${description} ${required ? '(REQUERIDO)' : '(OPCIONAL)'}`);
    return !required;
  }
}

function checkEnvFile(filePath, requiredVars = []) {
  if (!fs.existsSync(filePath)) {
    console.log(`${colors.red}❌${colors.reset} Archivo .env no encontrado: ${filePath}`);
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const missingVars = requiredVars.filter(varName => !content.includes(`${varName}=`));
  
  if (missingVars.length === 0) {
    console.log(`${colors.green}✅${colors.reset} Variables de entorno configuradas: ${path.basename(filePath)}`);
    return true;
  } else {
    console.log(`${colors.yellow}⚠️${colors.reset} Variables faltantes en ${path.basename(filePath)}: ${missingVars.join(', ')}`);
    return false;
  }
}

// Verificaciones
console.log(`${colors.blue}📁 Verificando estructura de archivos:${colors.reset}`);
const filesCheck = [
  checkFile('culturago-frontend/package.json', 'Frontend configurado'),
  checkFile('backend/package.json', 'Backend configurado'),
  checkFile('contracts/package.json', 'Smart contracts configurado'),
  checkFile('culturago-frontend/src/services/apiService.ts', 'Servicio API integrado'),
  checkFile('backend/routes/passport.js', 'Endpoint /api/passport'),
  checkFile('backend/services/passportService.js', 'Servicio de blockchain')
];

console.log(`\n${colors.blue}🔧 Verificando configuración:${colors.reset}`);
const configCheck = [
  checkEnvFile('backend/.env', ['PORT', 'FUJI_RPC_URL']),
  checkEnvFile('culturago-frontend/.env', ['VITE_API_BASE_URL'])
];

console.log(`\n${colors.blue}📋 Estado del sistema:${colors.reset}`);

// Resumen
const allFilesOk = filesCheck.every(check => check);
const allConfigOk = configCheck.every(check => check);

if (allFilesOk && allConfigOk) {
  console.log(`\n${colors.green}🎉 Sistema listo para ejecutar!${colors.reset}`);
  console.log('\n📝 Próximos pasos:');
  console.log('1. cd backend && npm run dev');
  console.log('2. cd culturago-frontend && npm run dev');
  console.log('3. Visitar http://localhost:5173');
} else {
  console.log(`\n${colors.yellow}⚠️  Configuración incompleta${colors.reset}`);
  console.log('\n📖 Ver SETUP_INSTRUCTIONS.md para completar la configuración');
}

console.log('\n');
