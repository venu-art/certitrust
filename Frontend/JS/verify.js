async function verifyDocument() {
  const hash = document.getElementById('hashInput').value;
  const result = document.getElementById('result');

  if (!hash) {
    result.innerHTML = 'Please enter a document hash.';
    return;
  }

  try {
    const verified = await window.contract.verifyCertificate(hash);
    result.innerHTML = verified ? "✅ Certificate is valid." : "❌ Certificate not found or invalid.";
  } catch (err) {
    console.error(err);
    result.innerHTML = "Error verifying certificate.";
  }
}
