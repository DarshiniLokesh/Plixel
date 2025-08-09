import React, { useState, useEffect } from "react";
import { Blockchain } from "../core/blockchain";
import { Block } from "../core/block";

export default function HomePage() {
  // Use state for blockchain, but don't initialize immediately on the server
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [chainData, setChainData] = useState<any[]>([]);
  const [mining, setMining] = useState(false);
  const [inputAmount, setInputAmount] = useState("");

  // Only initialize blockchain on the client
  useEffect(() => {
    const chain = new Blockchain();
    setBlockchain(chain);
    setChainData(chain.chain);
  }, []);

  const mineNewBlock = () => {
    if (!inputAmount || !blockchain) return alert("Enter amount first!");
    setMining(true);
    setTimeout(() => {
      const latestIndex = blockchain.getLatestBlock().index;
      const newBlock = new Block(latestIndex + 1, { amount: Number(inputAmount) });
      if (blockchain.addBlock(newBlock)) {
        setChainData([...blockchain.chain]);
      } else {
        alert("Block invalid!");
      }
      setMining(false);
      setInputAmount("");
    }, 50);
  };

  const validateChain = () => {
    if (!blockchain) return;
    alert(blockchain.isChainValid() ? "✅ Valid Chain" : "❌ Invalid Chain");
  };
  const tamperWithChain = () => {
    if (!blockchain) return;
    // Tamper with data of block 1 (if it exists)
    if (blockchain.chain.length > 1) {
      blockchain.chain[1].data = { amount: 9999 };
      setChainData([...blockchain.chain]); // update UI
      alert("🛠 Chain has been tampered for testing!");
    } else {
      alert("No block to tamper with yet!");
    }
  };

  
  return (
    <div style={{ padding: "2rem" }}>
      <h1>🚀 Plixel Blockchain</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          placeholder="Enter amount"
          disabled={mining || !blockchain}
        />
        <button onClick={mineNewBlock} disabled={mining || !blockchain} style={{ marginLeft: "0.5rem" }}>
          {mining ? "⛏️ Mining..." : "Mine Block"}
        </button>
        <button onClick={validateChain} style={{ marginLeft: "0.5rem" }}>
          Validate Chain
        </button>
        {/* NEW BUTTON */}
        <button onClick={tamperWithChain} style={{ marginLeft: "0.5rem", backgroundColor: "#f55", color: "#fff" }}>
          🛠 Tamper Chain
        </button>
      </div>

      <h2>Blockchain Data</h2>
      <pre style={{ background: "#eee", padding: "1rem", maxHeight: "400px", overflow: "auto" }}>
        {JSON.stringify(chainData, null, 2)}
      </pre>
    </div>
  );
}