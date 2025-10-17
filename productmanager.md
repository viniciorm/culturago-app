# productmanager.md – Plan de Producto MVP

## 1. Objetivo
Entregar un **MVP funcional** del Pasaporte Cultural Web3 en 4 días, demostrando emisión soulbound en Avalanche Fuji con UI simple y validación de comunidad.

## 2. Alcance (MVP)
- **Debe tener**: Formulario de emisión (organizador), subida de metadatos a IPFS, `mintPassport()` en Fuji, vista de pasaporte (link IPFS + Snowtrace), galería.
- **No incluye**: Marketplace, ticketera, verificación KYC, transferencias de NFT (soulbound).

## 3. Métricas (KPIs)
- 1 contrato desplegado en Fuji + 1–3 pasaportes emitidos en demo.
- < 3 min para emitir un pasaporte (de form a NFT).
- 1 demo navegable y 1 video (≤ 60s).

## 4. Usuarios y casos
- **Organizador (admin)**: emite pasaportes (form Glide → API).
- **Artista**: visualiza su pasaporte (IPFS/Snowtrace).
- **Visitante**: navega galería pública.

## 5. Backlog (ordenado)
1) Contrato ERC-721 soulbound (deploy Fuji)  
2) API `/api/passport` (Express) → IPFS + mint  
3) Glide: tabla Pasaportes + acción Call API  
4) Vista pasaporte + galería  
5) Copy final, estilos mínimos, links IPFS/Snowtrace  
6) Video demo + README final

## 6. Go-To-Market (GTM breve)
- Piloto con **FDVC** y **Red Danza Árabe** (comunidad existente).
- Licenciamiento B2B (emisores culturales) + freemium para artistas.
- Escalamiento regional con alianzas.

## 7. Riesgos y mitigaciones
- **RPC Fuji inestable** → reintentos + preparar tx firmada previa.  
- **Tiempo** → priorizar happy path; dejar extras como "futuro".  
- **PrivKey owner** → solo backend; NUNCA en front o repo.

## 8. Entregables
- Repo con contrato + API + docs  
- App Glide pública con demo  
- Video corto + pitch
