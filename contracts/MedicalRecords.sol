// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MedicalRecords {
    struct Record {
        string patientId;
        string dataHash; // IPFS hash or encrypted data reference
        address doctor;
        uint256 timestamp;
    }

    mapping(string => Record[]) private patientRecords;

    event RecordAdded(string patientId, address doctor, uint256 timestamp);

    function addRecord(string memory _patientId, string memory _dataHash) public {
        patientRecords[_patientId].push(Record({
            patientId: _patientId,
            dataHash: _dataHash,
            doctor: msg.sender,
            timestamp: block.timestamp
        }));

        emit RecordAdded(_patientId, msg.sender, block.timestamp);
    }

    function getRecords(string memory _patientId) public view returns (Record[] memory) {
        return patientRecords[_patientId];
    }
}
