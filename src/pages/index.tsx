import React, { useState, useEffect } from "react";
import { Blockchain } from "../core/blockchain";
import { Transaction } from "../core/transaction";

export default function HomePage() {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [chainData, setChainData] = useState<any[]>([]);
  const [mining, setMining] = useState(false);
  const [inputAmount, setInputAmount] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");

  // Initialize blockchain when component mounts
  useEffect(() => {
    const chain = new Blockchain();
    setBlockchain(chain);
    setChainData(chain.chain);
  }, []);

  // Add a new transaction to pending list
  const addNewTransaction = () => {
    if (!blockchain) return; // null safety

    const amountNum = Number(inputAmount);
    if (!fromAddress || !toAddress || amountNum <= 0) {
      alert("Please enter a positive amount and valid addresses!");
      return;
    }

    try {
      blockchain.addTransaction(new Transaction(fromAddress, toAddress, amountNum));
      setFromAddress("");
      setToAddress("");
      setInputAmount("");
      setChainData([...blockchain.chain]); // refresh UI
      alert("✅ Transaction added to pending list!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`❌ ${err.message}`);
      } else {
        alert("❌ Failed to add transaction");
      }
    }
  };

  // Mine all pending transactions
  const minePendingTx = () => {
    if (!blockchain) return; // null safety
    setMining(true);

    setTimeout(() => {
      blockchain.minePendingTransactions("Miner1"); // you can make this dynamic
      setChainData([...blockchain.chain]); // refresh UI
      setMining(false);
      alert("⛏️ Mining complete! Reward added to pending tx.");
    }, 50);
  };

  // Validate chain
  const validateChain = () => {
    if (!blockchain) return;
    alert(blockchain.isChainValid() ? "✅ Blockchain is valid" : "❌ Blockchain is INVALID!");
  };

  // Tamper with chain for demo
  const tamperWithChain = () => {
    if (!blockchain) return;
    if (blockchain.chain.length > 1) {
      blockchain.chain[1].transactions = [
        new Transaction("Hacker", "Bob", 9999)
      ];
      setChainData([...blockchain.chain]);
      alert("💀 Chain has been tampered!");
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
      <button
        onClick={addNewTransaction}
        disabled={!blockchain || mining}
      >
        Add Transaction
      </button>

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={minePendingTx}
          disabled={!blockchain || mining}
        >
          {mining ? "⛏️ Mining..." : "Mine Pending Transactions"}
        </button>

        <button
          onClick={validateChain}
          disabled={!blockchain}
          style={{ marginLeft: "0.5rem" }}
        >
          Validate Chain
        </button>

        <button
          onClick={tamperWithChain}
          disabled={!blockchain}
          style={{ marginLeft: "0.5rem", backgroundColor: "#f55", color: "#fff" }}
        >
          🛠 Tamper Chain
        </button>
      </div>

      <h2>Blockchain Data</h2>
      <pre
        style={{
          background: "#eee",
          padding: "1rem",
          maxHeight: "400px",
          overflow: "auto"
        }}
      >
        {JSON.stringify(chainData, null, 2)}
      </pre>
    </div>
  );
}
