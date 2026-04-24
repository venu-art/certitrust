async function deleteDocument() {
  const hash = document.getElementById('hashDelete').value;
  const result = document.getElementById('deleteResult');

  if (!hash) {
    result.innerHTML = 'Please enter a document hash.';
    return;
  }

  try {
    const tx = await window.contract.deleteCertificate(hash);
    await tx.wait();
    result.innerHTML = "✅ Certificate deleted successfully.";
  } catch (err) {
    console.error(err);
    result.innerHTML = "❌ Failed to delete certificate.";
  }
}
