export class Block {
    index: number;
    timestamp: number;
    data: any;
    previousHash: string;
    nonce: number;
    hash: string;
  
    constructor(index: number, data: any, previousHash: string = "") {
      this.index = index;
      this.timestamp = Date.now();
      this.data = data;
      this.previousHash = previousHash;
      this.nonce = 0;
      this.hash = "";
    }
  
    calculateHash(): string {
     
      return "";
    }
  
    mineBlock(difficulty: number): void {
  
    }
  }
  