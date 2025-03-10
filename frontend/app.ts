import { ethers } from "ethers";
import MedicalRecordsABI from "../artifacts/contracts/MedicalRecords.sol/MedicalRecords.json";

const abi: any = MedicalRecordsABI.abi;

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 

async function addRecord() {
  const patientId = (document.getElementById("patientId") as HTMLInputElement).value;
  const dataHash = (document.getElementById("dataHash") as HTMLInputElement).value;

  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.addRecord(patientId, dataHash);
    await tx.wait();
    alert("Record added successfully!");
  } else {
    alert("Please install MetaMask!");
  }
}

async function getRecords() {
  const patientId = (document.getElementById("patientId") as HTMLInputElement).value;

  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const records = await contract.getRecords(patientId);
    document.getElementById("records")!.innerHTML = JSON.stringify(records);
  } else {
    alert("Please install MetaMask!");
  }
}
