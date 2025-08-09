"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("./blockchain");
const block_1 = require("./block");
const plixelChain = new blockchain_1.Blockchain();
console.log("Mining block 1...");
plixelChain.addBlock(new block_1.Block(1, { amount: 4 }));
console.log("Mining block 2...");
plixelChain.addBlock(new block_1.Block(2, { amount: 10 }));
console.log(JSON.stringify(plixelChain, null, 2));
//# sourceMappingURL=test.js.map