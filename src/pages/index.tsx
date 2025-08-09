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

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🚀 Plixel Blockchain</h1>
      <input
        type="number"
        value={inputAmount}
        onChange={(e) => setInputAmount(e.target.value)}
        disabled={mining || !blockchain}
      />
      <button onClick={mineNewBlock} disabled={mining || !blockchain}>
        {mining ? "Mining..." : "Mine Block"}
      </button>
      <button onClick={validateChain} disabled={!blockchain}>
        Validate Chain
      </button>
      <pre>{JSON.stringify(chainData, null, 2)}</pre>
    </div>
  );
}
