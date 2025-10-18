# agents.md – Roles y Responsabilidades

## Agentes humanos
| Agente | Rol | Responsabilidades |
|---|---|---|
| Marcos Reyes | Product Owner & Founder | Visión, priorización, pitch, demo |
| Organizador FDVC | Admin emisor | Completar formulario en Glide y validar datos |
| Artista | Usuario final | Recibir y visualizar su pasaporte |

## Agentes del sistema
| Agente | Tipo | Función |
|---|---|---|
| Glide App | UI/DB/Auth | Formularios, vistas, galería |
| Backend API | Servicio | `/api/passport`: IPFS + mint en Fuji |
| Smart Contract | Solidity | `mintPassport(to, uri)`, soulbound (no transferible) |
| IPFS (NFT.Storage) | Storage | Alojar metadatos del pasaporte |
| Avalanche Fuji | Red | Registrar el NFT (tx + tokenId) |

## Flujo resumido
1) Admin completa formulario en Glide → **Call API**  
2) Backend sube metadatos a IPFS → ejecuta `mintPassport()`  
3) Guarda `txHash`, `tokenId`, `uri` → Glide muestra pasaporte  
