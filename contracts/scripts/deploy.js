const hre = require("hardhat");

async function main() {
  const { ethers } = hre;
  
  console.log("🚀 Starting CulturaPassport deployment to Avalanche Fuji...");
  console.log("Network:", await ethers.provider.getNetwork());
  
  // Get the contract factory
  const CulturaPassport = await ethers.getContractFactory("CulturaPassport");
  
  console.log("📝 Deploying contract...");
  
  // Deploy the contract with constructor arguments
  const passport = await CulturaPassport.deploy(
    "CulturaPassport",  // name
    "CULT"              // symbol
  );
  
  console.log("⏳ Waiting for deployment confirmation...");
  await passport.waitForDeployment();

  const address = await passport.getAddress();
  const owner = await passport.owner();
  const txHash = passport.deploymentTransaction().hash;
  
  console.log("✅ CulturaPassport successfully deployed!");
  console.log("📍 Contract Address:", address);
  console.log("👤 Owner Address:", owner);
  console.log("🔗 Transaction Hash:", txHash);
  console.log("🌐 Fuji Explorer:", `https://testnet.snowtrace.io/address/${address}`);
  
  // Verify contract functions
  console.log("\n🔍 Verifying contract functionality...");
  const name = await passport.name();
  const symbol = await passport.symbol();
  const totalSupply = await passport.totalSupply();
  
  console.log("📋 Contract Info:");
  console.log("   Name:", name);
  console.log("   Symbol:", symbol);
  console.log("   Total Supply:", totalSupply.toString());
  
  console.log("\n🎯 Next Steps:");
  console.log("1. Add the contract address to your backend .env:");
  console.log(`   CONTRACT_ADDRESS=${address}`);
  console.log("2. Verify the contract on Snowtrace");
  console.log(`   https://testnet.snowtrace.io/address/${address}`);
  console.log("3. Test minting a passport using the backend API");
  
  return {
    address,
    owner,
    txHash,
    name,
    symbol
  };
}

main()
  .then(() => {
    console.log("\n🎉 Deployment completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exitCode = 1;
  });