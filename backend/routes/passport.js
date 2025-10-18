/**
 * passport.js - Rutas para emisión de pasaportes culturales
 * 
 * Endpoints:
 * - POST /passport: Emite un nuevo pasaporte cultural NFT
 * - GET /passport/:tokenId: Obtiene información de un pasaporte específico
 */

const express = require('express');
const Joi = require('joi');
const passportService = require('../services/passportService');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

// Schema de validación para emisión de pasaporte
const passportSchema = Joi.object({
  name: Joi.string().min(1).max(100).required()
    .messages({
      'string.empty': 'El nombre del artista es obligatorio',
      'string.min': 'El nombre debe tener al menos 1 carácter',
      'string.max': 'El nombre no puede exceder 100 caracteres'
    }),
  event: Joi.string().min(1).max(200).required()
    .messages({
      'string.empty': 'El nombre del evento es obligatorio',
      'string.min': 'El evento debe tener al menos 1 carácter',
      'string.max': 'El evento no puede exceder 200 caracteres'
    }),
  wallet: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).required()
    .messages({
      'string.pattern.base': 'La dirección de wallet debe ser una dirección Ethereum válida (0x...)'
    }),
  imageUri: Joi.string().uri().optional()
    .messages({
      'string.uri': 'La URL de imagen debe ser válida'
    }),
  ipfsUri: Joi.string().pattern(/^ipfs:\/\/[a-zA-Z0-9]+$/).required()
    .messages({
      'string.pattern.base': 'La URI de IPFS debe tener formato ipfs://hash'
    })
});

/**
 * POST /api/passport
 * Emite un nuevo pasaporte cultural NFT en Avalanche
 */
router.post('/passport', validateRequest(passportSchema), async (req, res, next) => {
  try {
    console.log('📝 Iniciando emisión de pasaporte:', {
      name: req.body.name,
      event: req.body.event,
      wallet: req.body.wallet,
      ipfsUri: req.body.ipfsUri
    });

    // Llamar al servicio de emisión
    const result = await passportService.mintPassport(req.body);

    console.log('✅ Pasaporte emitido exitosamente:', result);

    res.status(201).json({
      success: true,
      message: 'Pasaporte cultural emitido exitosamente',
      data: result
    });

  } catch (error) {
    console.error('❌ Error en emisión de pasaporte:', error);
    next(error);
  }
});

/**
 * GET /api/passport/:tokenId
 * Obtiene información de un pasaporte específico
 */
router.get('/passport/:tokenId', async (req, res, next) => {
  try {
    const { tokenId } = req.params;
    
    if (!tokenId || isNaN(parseInt(tokenId))) {
      return res.status(400).json({
        success: false,
        error: 'Token ID inválido'
      });
    }

    const passportInfo = await passportService.getPassportInfo(parseInt(tokenId));

    if (!passportInfo) {
      return res.status(404).json({
        success: false,
        error: 'Pasaporte no encontrado'
      });
    }

    res.json({
      success: true,
      data: passportInfo
    });

  } catch (error) {
    console.error('❌ Error obteniendo pasaporte:', error);
    next(error);
  }
});

module.exports = router;
