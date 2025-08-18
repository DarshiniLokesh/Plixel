import { Block } from "./block";
import { Transaction } from "./transaction";

export class Blockchain {
  chain: Block[];
  difficulty: number;
  pendingTransactions: Transaction[];
  miningReward: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 10;
  }

  private createGenesisBlock(): Block {
    const genesisBlock = new Block(0, [], "0");
    genesisBlock.hash = genesisBlock.calculateHash();
    return genesisBlock;
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(transaction: Transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error("Transaction must include from and to address");
    }

    if (transaction.amount <= 0) {
      throw new Error("Transaction amount must be greater than zero");
    }

    // Check balance if not a reward transaction
    if (
      transaction.fromAddress !== null &&
      this.getBalanceOfAddress(transaction.fromAddress) < transaction.amount
    ) {
      throw new Error("Not enough balance");
    }

    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions(minerAddress: string) {
    const block = new Block(
      this.chain.length,
      this.pendingTransactions,
      this.getLatestBlock().hash
    );

    block.mineBlock(this.difficulty);
    this.chain.push(block);

    // Reward miner
    this.pendingTransactions = [
      new Transaction(null, minerAddress, this.miningReward),
    ];
  }

  getBalanceOfAddress(address: string): number {
    let balance = 0;
    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.fromAddress === address) balance -= tx.amount;
        if (tx.toAddress === address) balance += tx.amount;
      }
    }
    return balance;
  }

  isValidNewBlock(newBlock: Block, previousBlock: Block): boolean {
    if (previousBlock.index + 1 !== newBlock.index) return false;
    if (newBlock.previousHash !== previousBlock.hash) return false;
    if (newBlock.hash !== newBlock.calculateHash()) return false;
    if (
      newBlock.hash.substring(0, this.difficulty) !==
      Array(this.difficulty + 1).join("0")
    )
      return false;
    return true;
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (!this.isValidNewBlock(currentBlock, previousBlock)) {
        return false;
      }
    }
    return true;
  }
}
