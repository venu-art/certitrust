// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certificate {
    struct Document {
        string fileHash;
        string university;
        uint256 timestamp;
        address uploader;
    }

    mapping(string => Document) public documents;
    mapping(address => bool) public authorizedUploaders;
    address public admin;

    constructor() {
        admin = msg.sender;
        authorizedUploaders[admin] = true;
    }

    modifier onlyUploader() {
        require(authorizedUploaders[msg.sender], "Not authorized");
        _;
    }

    function addUploader(address _uploader) public {
        require(msg.sender == admin, "Only admin");
        authorizedUploaders[_uploader] = true;
    }

    function removeUploader(address _uploader) public {
        require(msg.sender == admin, "Only admin");
        authorizedUploaders[_uploader] = false;
    }

    function uploadDocument(string memory _fileHash, string memory _university) public onlyUploader {
        require(bytes(documents[_fileHash].fileHash).length == 0, "Already exists");
        documents[_fileHash] = Document(_fileHash, _university, block.timestamp, msg.sender);
    }

    function verifyDocument(string memory _fileHash) public view returns (string memory, string memory, uint256, address) {
        Document memory doc = documents[_fileHash];
        return (doc.fileHash, doc.university, doc.timestamp, doc.uploader);
    }
}
