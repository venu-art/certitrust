// app.js
let contract;

window.addEventListener("load", async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await ethereum.request({ method: "eth_requestAccounts" });

    const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with deployed address
    const contractABI = YOUR_CONTRACT_ABI; // Paste ABI JSON here

    contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log("Connected to contract");
  } else {
    alert("Please install MetaMask to use CertiTrust.");
  }
});
