let provider;
let signer;
let contract;

// Your deployed contract address (from Hardhat deployment)
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Your contract ABI (replace this with your Certificate contract ABI)
const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_fileHash", "type": "string" }
    ],
    "name": "storeCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("uploadBtn").addEventListener("click", uploadToBlockchain);

async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask not detected! Please install MetaMask.");
    return;
  }

  try {
    // Request account access
    await window.ethereum.request({ method: "eth_requestAccounts" });

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    // Ensure we're connected to Hardhat network
    const network = await provider.getNetwork();
    if (network.chainId !== 31337n) {
      await switchToHardhat();
    }

    const userAddress = await signer.getAddress();
    alert(`✅ Wallet connected: ${userAddress}`);

    contract = new ethers.Contract(contractAddress, contractABI, signer);
  } catch (err) {
    console.error(err);
    alert("❌ Failed to connect wallet.");
  }
}

async function switchToHardhat() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x7A69" }] // 31337 in hex
    });
  } catch (switchError) {
    // If Hardhat network is not added, add it
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x7A69",
          chainName: "Hardhat Localhost",
          nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
          rpcUrls: ["http://127.0.0.1:8545"],
        }],
      });
    } else {
      console.error(switchError);
    }
  }
}

async function uploadToBlockchain() {
  if (!contract) {
    alert("Please connect your wallet first!");
    return;
  }

  const fileInput = document.getElementById("fileInput");
  if (!fileInput.files.length) {
    alert("Please select a file first.");
    return;
  }

  const file = fileInput.files[0];

  // Compute simple hash (You can replace with IPFS later)
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  try {
    const tx = await contract.storeCertificate(hashHex);
    await tx.wait();

    document.getElementById("status").innerHTML = `
      ✅ Uploaded successfully!<br/>
      <strong>File:</strong> ${file.name}<br/>
      <strong>Hash:</strong> ${hashHex}
    `;
  } catch (err) {
    console.error(err);
    alert("❌ Failed to upload to blockchain.");
  }
}
