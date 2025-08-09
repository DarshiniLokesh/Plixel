import {Block} from "./block";

export class Blockchain{
    chain: Block[];
    difficulty:number;

    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }
    createGenesisBlock():Block{
        return new Block(0, "Genesis Block", "0");
    }

    getLatestBlock(): Block{
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock:Block):boolean{
        // Implementation needed
        return false;
    }
}
