/**
 * passportService.js - Servicio principal para emisión de pasaportes
 * 
 * Integra:
 * - Smart Contract CulturaPassport en Avalanche Fuji
 * - Ethers.js para interacción blockchain
 * - Validación y manejo de errores
 */

const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

class PassportService {
  constructor() {
    this.contractAddress = process.env.CONTRACT_ADDRESS;
    this.privateKey = process.env.OWNER_PRIVATE_KEY;
    this.rpcUrl = process.env.FUJI_RPC_URL || 'https://api.avax-test.network/ext/bc/C/rpc';
    this.contract = null;
    this.provider = null;
    this.wallet = null;
    this.isInitialized = false;

    // Intentar inicializar conexión blockchain (no fallar si faltan variables)
    this.initializeBlockchain();
  }

  /**
   * Inicializa la conexión con Avalanche Fuji
   */
  initializeBlockchain() {
    try {
      if (!this.privateKey || !this.contractAddress) {
        console.warn('⚠️ Variables de entorno faltantes para blockchain inicialización completa');
        console.warn('   Variables requeridas: OWNER_PRIVATE_KEY, CONTRACT_ADDRESS');
        return; // No fallar, solo mostrar advertencia
      }

      // Crear provider y wallet
      this.provider = new ethers.JsonRpcProvider(this.rpcUrl);
      this.wallet = new ethers.Wallet(this.privateKey, this.provider);

      // Cargar ABI del contrato
      const contractABI = this.loadContractABI();
      
      // Crear instancia del contrato
      this.contract = new ethers.Contract(
        this.contractAddress,
        contractABI,
        this.wallet
      );

      this.isInitialized = true;
      console.log('✅ Conexión blockchain inicializada:', {
        network: 'Avalanche Fuji',
        contractAddress: this.contractAddress,
        walletAddress: this.wallet.address
      });

    } catch (error) {
      console.error('❌ Error inicializando blockchain:', error);
      console.warn('⚠️ El servicio continuará pero las funciones de blockchain no estarán disponibles');
      // No lanzar error para permitir que el servidor inicie
    }
  }

  /**
   * Carga el ABI del contrato desde los artifacts de Hardhat
   */
  loadContractABI() {
    try {
      // Ruta al artifact del contrato (asumiendo estructura de Hardhat)
      const artifactPath = path.join(__dirname, '../../contracts/artifacts/contracts/CulturaPassport.sol/CulturaPassport.json');
      
      if (!fs.existsSync(artifactPath)) {
        throw new Error(`No se encontró el artifact del contrato en: ${artifactPath}`);
      }

      const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
      return artifact.abi;

    } catch (error) {
      console.error('Error cargando ABI del contrato:', error);
      // ABI básico como fallback
      return [
        "function mintPassport(address to, string memory uri) public returns (uint256)",
        "function tokenURI(uint256 tokenId) public view returns (string memory)",
        "function totalSupply() public view returns (uint256)",
        "function exists(uint256 tokenId) public view returns (bool)",
        "event PassportMinted(address indexed to, uint256 indexed tokenId, string uri)"
      ];
    }
  }

  /**
   * Emite un nuevo pasaporte cultural NFT
   * @param {Object} passportData - Datos del pasaporte
   * @returns {Object} Resultado de la emisión
   */
  async mintPassport(passportData) {
    try {
      console.log('🔧 Iniciando mint de pasaporte:', passportData);

      // Verificar si está inicializado, si no, intentar inicializar
      if (!this.isInitialized) {
        // Intentar inicializar nuevamente con las variables actuales
        this.contractAddress = process.env.CONTRACT_ADDRESS;
        this.privateKey = process.env.OWNER_PRIVATE_KEY;
        this.rpcUrl = process.env.FUJI_RPC_URL || 'https://api.avax-test.network/ext/bc/C/rpc';
        this.initializeBlockchain();
      }

      // Validar que el contrato esté inicializado
      if (!this.contract || !this.isInitialized) {
        throw new Error('Contrato no inicializado. Verifica las variables de entorno: OWNER_PRIVATE_KEY, CONTRACT_ADDRESS');
      }

      // Validar dirección de destino
      if (!ethers.isAddress(passportData.wallet)) {
        throw new Error('Dirección de wallet inválida');
      }

      // Verificar balance para gas
      const balance = await this.provider.getBalance(this.wallet.address);
      console.log('💰 Balance del wallet:', ethers.formatEther(balance), 'AVAX');

      // Estimar gas para la transacción
      const estimatedGas = await this.contract.mintPassport.estimateGas(
        passportData.wallet,
        passportData.ipfsUri
      );

      console.log('⛽ Gas estimado:', estimatedGas.toString());

      // Ejecutar mint
      console.log('🚀 Ejecutando mintPassport...');
      const tx = await this.contract.mintPassport(
        passportData.wallet,
        passportData.ipfsUri,
        {
          gasLimit: estimatedGas * 2n, // Buffer del 100%
          gasPrice: await this.provider.getFeeData().then(fee => fee.gasPrice)
        }
      );

      console.log('📄 Transacción enviada:', tx.hash);

      // Esperar confirmación
      console.log('⏳ Esperando confirmación...');
      const receipt = await tx.wait();

      console.log('✅ Transacción confirmada:', {
        txHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString()
      });

      // Obtener tokenId del evento
      const event = receipt.logs.find(log => {
        try {
          const parsed = this.contract.interface.parseLog(log);
          return parsed.name === 'PassportMinted';
        } catch {
          return false;
        }
      });

      let tokenId = null;
      if (event) {
        const parsedEvent = this.contract.interface.parseLog(event);
        tokenId = parsedEvent.args.tokenId.toString();
        console.log('🎫 Token ID obtenido del evento:', tokenId);
      }

      // Si no se pudo obtener del evento, obtener el totalSupply
      if (!tokenId) {
        tokenId = (await this.contract.totalSupply()).toString();
        console.log('🎫 Token ID obtenido del totalSupply:', tokenId);
      }

      // Construir respuesta
      const result = {
        success: true,
        tokenId: tokenId,
        txHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        blockExplorerUrl: `https://testnet.snowtrace.io/tx/${receipt.hash}`,
        contractAddress: this.contractAddress,
        ipfsUri: passportData.ipfsUri,
        recipient: passportData.wallet,
        passportData: {
          name: passportData.name,
          event: passportData.event,
          imageUri: passportData.imageUri
        },
        timestamp: new Date().toISOString()
      };

      console.log('🎉 Mint completado exitosamente');
      return result;

    } catch (error) {
      console.error('❌ Error en mintPassport:', error);
      
      // Manejar errores específicos
      if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
        throw new Error('No se pudo estimar el gas - verificar parámetros');
      }
      
      if (error.code === 'INSUFFICIENT_FUNDS') {
        throw new Error('Fondos insuficientes para gas');
      }

      if (error.reason) {
        throw new Error(`Error del contrato: ${error.reason}`);
      }

      throw new Error(`Error minting passport: ${error.message}`);
    }
  }

  /**
   * Obtiene información de un pasaporte específico
   * @param {number} tokenId - ID del token
   * @returns {Object|null} Información del pasaporte
   */
  async getPassportInfo(tokenId) {
    try {
      if (!this.contract) {
        throw new Error('Contrato no inicializado');
      }

      // Verificar si el token existe
      const exists = await this.contract.exists(tokenId);
      if (!exists) {
        return null;
      }

      // Obtener información del token
      const [owner, tokenURI] = await Promise.all([
        this.contract.ownerOf(tokenId),
        this.contract.tokenURI(tokenId)
      ]);

      return {
        tokenId: tokenId.toString(),
        owner: owner,
        tokenURI: tokenURI,
        contractAddress: this.contractAddress,
        exists: true
      };

    } catch (error) {
      console.error('Error obteniendo info del pasaporte:', error);
      throw error;
    }
  }

  /**
   * Obtiene el estado de la conexión blockchain
   */
  async getBlockchainStatus() {
    try {
      if (!this.provider || !this.wallet) {
        return {
          connected: false,
          error: 'No inicializado'
        };
      }

      const [network, balance, blockNumber] = await Promise.all([
        this.provider.getNetwork(),
        this.provider.getBalance(this.wallet.address),
        this.provider.getBlockNumber()
      ]);

      return {
        connected: true,
        network: {
          name: network.name,
          chainId: network.chainId.toString()
        },
        wallet: {
          address: this.wallet.address,
          balance: ethers.formatEther(balance) + ' AVAX'
        },
        latestBlock: blockNumber,
        contractAddress: this.contractAddress
      };

    } catch (error) {
      return {
        connected: false,
        error: error.message
      };
    }
  }
}

// Crear instancia singleton
const passportService = new PassportService();

module.exports = passportService;
