import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Blockchain } from "../core/blockchain";
import { Transaction } from "../core/transaction";

function App() {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [chainData, setChainData] = useState<any[]>([]);
  const [mining, setMining] = useState(false);
  const [inputAmount, setInputAmount] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [balanceAddress, setBalanceAddress] = useState("");
  const [balance, setBalance] = useState<number | null>(null);

  // Initialize blockchain when component mounts
  useEffect(() => {
    const chain = new Blockchain();
    setBlockchain(chain);
    setChainData(chain.chain);
  }, []);

  // Add a new transaction
  const addNewTransaction = () => {
    if (!blockchain) return;

    const amountNum = Number(inputAmount);
    if (!fromAddress || !toAddress || amountNum <= 0) {
      alert("⚠️ Enter positive amount and valid addresses!");
      return;
    }

    try {
      blockchain.addTransaction(new Transaction(fromAddress, toAddress, amountNum));
      setFromAddress("");
      setToAddress("");
      setInputAmount("");
      setChainData([...blockchain.chain]);
      alert("✅ Transaction added!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`❌ ${err.message}`);
      }
    }
  };

  // Mine pending transactions
  const minePendingTx = () => {
    if (!blockchain) return;
    setMining(true);

    setTimeout(() => {
      blockchain.minePendingTransactions("Miner1");
      setChainData([...blockchain.chain]);
      setMining(false);
      alert("⛏️ Mining complete! Reward added.");
    }, 100);
  };

  // Validate chain
  const validateChain = () => {
    if (!blockchain) return;
    alert(blockchain.isChainValid() ? "✅ Blockchain is valid" : "❌ Blockchain is INVALID!");
  };

  // Tamper for demo
  const tamperWithChain = () => {
    if (!blockchain) return;
    if (blockchain.chain.length > 1) {
      blockchain.chain[1].transactions = [new Transaction("Hacker", "Bob", 9999)];
      setChainData([...blockchain.chain]);
      alert("💀 Chain tampered!");
    } else {
      alert("No block to tamper with yet!");
    }
  };

  // Get balance of an address
  const checkBalance = () => {
    if (!blockchain) return;
    if (!balanceAddress) {
      alert("⚠️ Enter an address!");
      return;
    }
    const bal = blockchain.getBalanceOfAddress(balanceAddress);
    setBalance(bal);
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
      <button onClick={addNewTransaction} disabled={!blockchain || mining}>
        Add Transaction
      </button>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={minePendingTx} disabled={!blockchain || mining}>
          {mining ? "⛏️ Mining..." : "Mine Pending Transactions"}
        </button>
        <button onClick={validateChain} disabled={!blockchain} style={{ marginLeft: "0.5rem" }}>
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

      <h3>Check Balance</h3>
      <input
        placeholder="Enter address"
        value={balanceAddress}
        onChange={(e) => setBalanceAddress(e.target.value)}
      />
      <button onClick={checkBalance} disabled={!blockchain}>
        Get Balance
      </button>
      {balance !== null && (
        <p>
          💰 Balance of <b>{balanceAddress}</b>: {balance}
        </p>
      )}

      <h2>Blockchain Data</h2>
      <pre
        style={{
          background: "#eee",
          padding: "1rem",
          maxHeight: "400px",
          overflow: "auto",
        }}
      >
        {JSON.stringify(chainData, null, 2)}
      </pre>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
