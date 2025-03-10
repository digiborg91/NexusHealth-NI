"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const MedicalRecords_json_1 = __importDefault(require("../artifacts/contracts/MedicalRecords.sol/MedicalRecords.json"));
const abi = MedicalRecords_json_1.default.abi;
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
async function addRecord() {
    const patientId = document.getElementById("patientId").value;
    const dataHash = document.getElementById("dataHash").value;
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers_1.ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers_1.ethers.Contract(contractAddress, abi, signer);
        const tx = await contract.addRecord(patientId, dataHash);
        await tx.wait();
        alert("Record added successfully!");
    }
    else {
        alert("Please install MetaMask!");
    }
}
async function getRecords() {
    const patientId = document.getElementById("patientId").value;
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers_1.ethers.BrowserProvider(window.ethereum);
        const contract = new ethers_1.ethers.Contract(contractAddress, abi, provider);
        const records = await contract.getRecords(patientId);
        document.getElementById("records").innerHTML = JSON.stringify(records);
    }
    else {
        alert("Please install MetaMask!");
    }
}
