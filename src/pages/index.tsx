import React, { useState, useEffect } from "react";
import { Blockchain } from "../core/blockchain";
import { Block } from "../core/block";
import { Transaction } from "../core/transaction";

export default function HomePage() {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [chainData, setChainData] = useState<any[]>([]);
  const [mining, setMining] = useState(false);
  const [inputAmount, setInputAmount] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");

  useEffect(() => {
    const chain = new Blockchain();
    setBlockchain(chain);
    setChainData(chain.chain);
  }, []);

  const addNewTransaction = () => {
    if (!fromAddress || !toAddress || !inputAmount || !blockchain) {
      alert("Enter from, to, and amount!");
      return;
    }
    blockchain.addTransaction(new Transaction(fromAddress, toAddress, Number(inputAmount)));
    setFromAddress("");
    setToAddress("");
    setInputAmount("");
    alert("Transaction added to pending list!");
  };

  const minePendingTx = () => {
    if (!blockchain) return;
    setMining(true);
    setTimeout(() => {
      blockchain.minePendingTransactions("Miner1");
      setChainData([...blockchain.chain]);
      setMining(false);
    }, 50);
  };

  const validateChain = () => {
    if (!blockchain) return;
    alert(blockchain.isChainValid() ? "✅ Valid Chain" : "❌ Invalid Chain");
  };

  const tamperWithChain = () => {
    if (!blockchain) return;
    if (blockchain.chain.length > 1) {
      blockchain.chain[1].transactions = [new Transaction("Hacker", "Bob", 9999)];
      setChainData([...blockchain.chain]);
      alert("🛠 Chain has been tampered!");
    } else {
      alert("No block to tamper with yet!");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🚀 Plixel Blockchain</h1>

      <h3>Add Transaction</h3>
      <input
        placeholder="From address"
        value={fromAddress}
        onChange={(e) => setFromAddress(e.target.value)}
      />
      <input
        placeholder="To address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={inputAmount}
        onChange={(e) => setInputAmount(e.target.value)}
      />
      <button onClick={addNewTransaction}>Add Transaction</button>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={minePendingTx} disabled={mining}>
          {mining ? "⛏️ Mining..." : "Mine Pending Transactions"}
        </button>
        <button onClick={validateChain} style={{ marginLeft: "0.5rem" }}>
          Validate Chain
        </button>
        <button
          onClick={tamperWithChain}
          style={{ marginLeft: "0.5rem", backgroundColor: "#f55", color: "#fff" }}
        >
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
