export const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_fileName", "type": "string" },
      { "internalType": "string", "name": "_fileHash", "type": "string" }
    ],
    "name": "uploadCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_fileHash", "type": "string" }
    ],
    "name": "verifyCertificate",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
