const hre = require("hardhat");

async function main() {
  const Certificate = await hre.ethers.getContractFactory("Certificate");
  console.log("Deploying Certificate contract...");

  const certificate = await Certificate.deploy();
  await certificate.waitForDeployment(); // ✅ Updated for ethers v6

  console.log(`✅ Certificate contract deployed at: ${certificate.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
