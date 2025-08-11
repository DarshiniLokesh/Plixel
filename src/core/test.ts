import { Blockchain } from "./blockchain";
import { Transaction } from "./transaction";

const plixelChain = new Blockchain();

// 1. Mine first block to get miner reward credited to "Miner1"
console.log("⛏️ Mining pending transactions first time...");
plixelChain.minePendingTransactions("Miner1");
console.log("Miner1 balance:", plixelChain.getBalanceOfAddress("Miner1")); // Should be 10 (reward)

// 2. Add a transaction from Miner1 (who has balance) to Alice
plixelChain.addTransaction(new Transaction("Miner1", "Alice", 30));

// 3. Mine again to include the transaction
console.log("⛏️ Mining pending transactions second time...");
plixelChain.minePendingTransactions("Miner1");

// Check balances now
console.log("Miner1 balance:", plixelChain.getBalanceOfAddress("Miner1"));
console.log("Alice balance:", plixelChain.getBalanceOfAddress("Alice"));

// 4. Alice can now send some coins to Bob
plixelChain.addTransaction(new Transaction("Alice", "Bob", 15));
console.log("⛏️ Mining pending transactions third time...");
plixelChain.minePendingTransactions("Miner1");

// Final balances
console.log("Miner1 balance:", plixelChain.getBalanceOfAddress("Miner1"));
console.log("Alice balance:", plixelChain.getBalanceOfAddress("Alice"));
console.log("Bob balance:", plixelChain.getBalanceOfAddress("Bob"));

// Validate blockchain
console.log("Is chain valid?", plixelChain.isChainValid());
