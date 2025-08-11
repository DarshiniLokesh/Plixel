import { Blockchain } from "./blockchain";
import { Block } from "./block";
import { Transaction } from "./transaction";

const plixelChain = new Blockchain();

console.log("Mining block 1...");
plixelChain.addBlock(
  new Block(
    1,
    [new Transaction("Alice", "Bob", 4)], // transactions array
    plixelChain.getLatestBlock().hash
  )
);

console.log("Mining block 2...");
plixelChain.addBlock(
  new Block(
    2,
    [new Transaction("Bob", "Charlie", 10)],
    plixelChain.getLatestBlock().hash
  )
);

console.log(JSON.stringify(plixelChain, null, 2));
