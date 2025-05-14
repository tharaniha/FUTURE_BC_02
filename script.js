let provider, signer;

document.getElementById("connectButton").onclick = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    document.getElementById("walletAddress").innerText = address;

    const balance = await provider.getBalance(address);
    document.getElementById("balance").innerText = ethers.utils.formatEther(balance);
  } else {
    alert("MetaMask not installed!");
  }
};

document.getElementById("sendButton").onclick = async () => {
  const to = document.getElementById("toAddress").value;
  const amount = document.getElementById("amount").value;
  const tx = await signer.sendTransaction({
    to: to,
    value: ethers.utils.parseEther(amount)
  });
  alert("Transaction sent: " + tx.hash);
};
