const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();
const abi = require("./abi.json");

const app = express();
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

console.log("API connected with wallet:", wallet.address);

// POST /submit-nft
app.post("/submit-nft", async (req, res) => {
  try {
    const { user, image } = req.body;

    if (!ethers.isAddress(user)) {
      return res.status(400).json({ error: "Invalid wallet address" });
    }

    if (!image || typeof image !== "string") {
      return res.status(400).json({ error: "Missing or invalid image URL" });
    }

    const allowedImages = [
      "https://cdn.motor1.com/images/mgl/E6Pkl3/s1/4x3/fia-wec-2023-global-fan-survey..webp"
    ];

    if (!allowedImages.includes(image)) {
      return res.status(400).json({ error: "Image URL not accepted" });
    }

    const txValue = ethers.parseEther("0.05");
    const tx = await contract.submitNFT(user, { value: txValue });
    await tx.wait();

    console.log(`NFT submitted for ${user} using approved image`);
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error("submit-nft error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /redeem-for
app.post("/redeem-for", async (req, res) => {
  try {
    const { user } = req.body;
    console.log("Redeem request for:", user); 

    if (!ethers.isAddress(user)) {
      return res.status(400).json({ error: "Invalid address" });
    }

    const tx = await contract.redeemFor(user);
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error("redeem-for error:", err); 
    res.status(500).json({ error: err.message });
  }
});

// GET /get-reward
app.get("/get-reward/:user", async (req, res) => {
  try {
    const { user } = req.params;

    if (!ethers.isAddress(user)) {
      return res.status(400).json({ error: "Invalid address" });
    }

    const reward = await contract.rewards(user);
    const formatted = ethers.formatEther(reward);

    res.json({ address: user, reward: formatted + " ETH" });
  } catch (err) {
    console.error("get-reward error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
