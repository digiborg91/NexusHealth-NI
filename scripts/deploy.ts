import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const MedicalRecords = await ethers.getContractFactory("MedicalRecords");
  const medicalRecords = await MedicalRecords.deploy();

  await medicalRecords.waitForDeployment();

  console.log("MedicalRecords deployed to:", await medicalRecords.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
