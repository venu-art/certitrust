const { ethers } = require("ethers");
require("dotenv").config();

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require("../contractABI.json"); // Save ABI JSON from compilation

// Provider setup (Infura, Alchemy, or your own node)
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

exports.verifyCertificate = async (req, res) => {
    try {
        const { certHash } = req.body;
        if (!certHash) {
            return res.status(400).json({ error: "Certificate hash is required" });
        }

        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const certData = await contract.verifyCertificate(certHash);

        if (!certData.studentName || certData.studentName === "") {
            return res.status(404).json({ error: "Certificate not found" });
        }

        res.json({
            studentName: certData.studentName,
            course: certData.course,
            institution: certData.institution,
            issueDate: certData.issueDate,
            ipfsHash: certData.ipfsHash
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Verification failed" });
    }
};
