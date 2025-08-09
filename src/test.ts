
import { Blockchain } from "./core/blockchain";
import { Block } from "./core/block";

const plixelChain = new Blockchain();

console.log("Mining block 1...");
plixelChain.addBlock(new Block(1, { amount: 4 }));

console.log("Mining block 2...");
plixelChain.addBlock(new Block(2, { amount: 10 }));

console.log(JSON.stringify(plixelChain, null, 2));
