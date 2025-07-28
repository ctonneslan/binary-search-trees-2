import { Tree } from "./modules/tree.js";

function generateRandomArray(size = 10, max = 100) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
}

const randomArray = generateRandomArray(15);
const tree = new Tree(randomArray);

console.log("Initial array:", randomArray.join(", "));
console.log("Is tree balanced?", tree.isBalanced());

[101, 150, 175, 200, 250].forEach((value) => tree.insert(value));
console.log("\nAfter unbalancing...");
console.log("Is tree balanced?", tree.isBalanced());

tree.prettyPrint();

tree.rebalance();
tree.prettyPrint();
console.log("\nAfter balancing...");
console.log("Is tree balanced?", tree.isBalanced());
