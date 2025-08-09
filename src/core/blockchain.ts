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
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);

        if(this.isValidNewBlock(newBlock, this.getLatestBlock())){
            this.chain.push(newBlock);
            return true;
        }else{
            console.log("Invalid block, not added.");
            return false;
        }
        
    }
    isValidNewBlock(newBlock:Block, previousBlock:Block):boolean{
        if(previousBlock.index + 1 !== newBlock.index)return false;
        if(newBlock.previousHash !== previousBlock.hash) return false;
        if(newBlock.hash !== newBlock.calculateHash()) return false;
        if(newBlock.hash.substring(0,this.difficulty) !== Array(this.difficulty+1).join("0"))return false;
        return true;
    }
    isChainValid() : boolean{
        for(let i =1; i<this.chain.length;i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];
            if(!this.isValidNewBlock(currentBlock, prevBlock))return false;
        }
        return true;
    }
}
