import { expect } from "chai";
import { ethers } from "hardhat";

describe("MedicalRecords Contract", function () {
  it("Should add and retrieve medical records", async function () {
    const MedicalRecords = await ethers.getContractFactory("MedicalRecords");
    const medicalRecords = await MedicalRecords.deploy();
    await medicalRecords.waitForDeployment();

    await medicalRecords.addRecord("patient123", "QmHash");
    const records = await medicalRecords.getRecords("patient123");

    expect(records.length).to.equal(1);
    expect(records[0].dataHash).to.equal("QmHash");
  });
});
