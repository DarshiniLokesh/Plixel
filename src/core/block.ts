import * as crypto from "crypto";

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
     
      return crypto
      .createHash("sha256")
      .update(
        this.index + 
        this.previousHash +
        this.timestamp + 
        JSON.stringify(this.data) + 
        this.nonce
      )
      .digest("hex");
    }
  
    mineBlock(difficulty: number): void {

        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`Block mined : ${this.hash}`);
    }
  }
  