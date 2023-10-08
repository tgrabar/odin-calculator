const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) return 0;
  return a / b;
}

console.log(add(3, 2));
console.log(subtract(3, 2));
console.log(multiply(3, 2));
console.log(divide(3, 2));
console.log(divide(3, 0));