"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
// pages/index.tsx
const react_1 = __importStar(require("react"));
const blockchain_1 = require("../core/blockchain");
const block_1 = require("../core/block");
function HomePage() {
    const [blockchain] = (0, react_1.useState)(new blockchain_1.Blockchain()); // single chain instance
    const [chainData, setChainData] = (0, react_1.useState)(blockchain.chain);
    const [mining, setMining] = (0, react_1.useState)(false);
    const [inputAmount, setInputAmount] = (0, react_1.useState)("");
    const mineNewBlock = () => {
        if (!inputAmount)
            return alert("Enter amount first!");
        setMining(true);
        setTimeout(() => {
            const latestIndex = blockchain.getLatestBlock().index;
            const newBlock = new block_1.Block(latestIndex + 1, {
                amount: Number(inputAmount),
            });
            const added = blockchain.addBlock(newBlock);
            if (added) {
                setChainData([...blockchain.chain]);
            }
            else {
                alert("Block was not valid and was not added!");
            }
            setMining(false);
            setInputAmount("");
        }, 50);
    };
    const validateChain = () => {
        alert(blockchain.isChainValid() ? "✅ Chain is valid" : "❌ Invalid Chain");
    };
    return (<div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🚀 Plixel Blockchain</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input type="number" value={inputAmount} onChange={(e) => setInputAmount(e.target.value)} placeholder="Enter amount" disabled={mining}/>
        <button onClick={mineNewBlock} disabled={mining} style={{ marginLeft: "0.5rem" }}>
          {mining ? "⛏️ Mining..." : "Mine Block"}
        </button>
        <button onClick={validateChain} style={{ marginLeft: "0.5rem" }}>
          Validate Chain
        </button>
      </div>

      <h2>Blockchain Data</h2>
      <pre style={{ background: "#eee", padding: "1rem" }}>
        {JSON.stringify(chainData, null, 2)}
      </pre>
    </div>);
}
//# sourceMappingURL=index.jsx.map