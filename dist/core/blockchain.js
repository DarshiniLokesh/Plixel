"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = void 0;
const block_1 = require("./block");
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }
    createGenesisBlock() {
        return new block_1.Block(0, "Genesis Block", "0");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        if (this.isValidNewBlock(newBlock, this.getLatestBlock())) {
            this.chain.push(newBlock);
            return true;
        }
        else {
            console.log("Invalid block, not added.");
            return false;
        }
    }
    isValidNewBlock(newBlock, previousBlock) {
        if (previousBlock.index + 1 !== newBlock.index)
            return false;
        if (newBlock.previousHash !== previousBlock.hash)
            return false;
        if (newBlock.hash !== newBlock.calculateHash())
            return false;
        if (newBlock.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0"))
            return false;
        return true;
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];
            if (!this.isValidNewBlock(currentBlock, prevBlock))
                return false;
        }
        return true;
    }
}
exports.Blockchain = Blockchain;
//# sourceMappingURL=blockchain.js.map