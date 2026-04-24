const { create } = require('ipfs-http-client');
const fs = require('fs');
const path = require('path');
const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

async function uploadToIPFS(filePath) {
  const file = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const result = await client.add({ path: fileName, content: file });
  return result.cid.toString();
}

module.exports = { uploadToIPFS };