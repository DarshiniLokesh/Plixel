import { Block } from "./block";
import { Transaction } from "./transaction";

export class Blockchain {
  chain: Block[];
  difficulty: number;
  pendingTransactions: Transaction[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
  }

  createGenesisBlock(): Block {
    const genesisBlock = new Block(0, [], "0");
    genesisBlock.hash = genesisBlock.calculateHash();
    return genesisBlock;
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(transaction: Transaction): void {
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions(minerAddress: string): void {
    const block = new Block(
      this.chain.length,
      this.pendingTransactions,
      this.getLatestBlock().hash
    );
    block.mineBlock(this.difficulty);
    this.chain.push(block);

    // Reward miner
    this.pendingTransactions = [
      new Transaction(null, minerAddress, 10)
    ];
  }

  addBlock(newBlock: Block): boolean {
    newBlock.previousHash = this.getLatestBlock().hash;
    if (!this.isValidNewBlock(newBlock, this.getLatestBlock())) {
      return false;
    }
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    return true;
  }

  isValidNewBlock(newBlock: Block, previousBlock: Block): boolean {
    if (previousBlock.index + 1 !== newBlock.index) return false;
    if (newBlock.previousHash !== previousBlock.hash) return false;
    if (newBlock.hash !== newBlock.calculateHash()) return false;
    if (newBlock.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")) return false;
    return true;
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (!this.isValidNewBlock(currentBlock, previousBlock)) return false;
    }
    return true;
  }
}
