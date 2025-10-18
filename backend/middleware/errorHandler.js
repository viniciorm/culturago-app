/**
 * errorHandler.js - Middleware global de manejo de errores
 */

const errorHandler = (err, req, res, next) => {
  console.error('🚨 Error en API:', err);

  // Error de validación de Joi (ya manejado en validation middleware)
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      error: 'Datos de entrada inválidos',
      details: err.details
    });
  }

  // Error de conexión a blockchain
  if (err.code === 'NETWORK_ERROR' || err.message.includes('network')) {
    return res.status(503).json({
      success: false,
      error: 'Error de conexión a la red blockchain',
      message: 'No se pudo conectar con Avalanche Fuji'
    });
  }

  // Error de transacción blockchain
  if (err.code === 'TRANSACTION_FAILED' || err.message.includes('transaction')) {
    return res.status(502).json({
      success: false,
      error: 'Error en transacción blockchain',
      message: 'La transacción no pudo ser procesada'
    });
  }

  // Error de contrato inteligente
  if (err.code === 'CONTRACT_ERROR' || err.message.includes('revert')) {
    return res.status(400).json({
      success: false,
      error: 'Error en contrato inteligente',
      message: err.reason || 'El contrato rechazó la operación'
    });
  }

  // Error de autorización
  if (err.code === 'UNAUTHORIZED') {
    return res.status(401).json({
      success: false,
      error: 'No autorizado',
      message: 'No tienes permisos para realizar esta operación'
    });
  }

  // Error interno del servidor
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
};

module.exports = {
  errorHandler
};
