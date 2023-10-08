const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) return 0;
  return a / b;
}

function operate(num1, num2, func) {
  switch (func) {
    case '+': return add(num1, num2);
    case '-': return subtract(num1, num2);
    case '*': return multiply(num1, num2);
    case '/': return divide(num1, num2);
    default: return 0;
  }
}

const operation = [];
operation.push(3);
operation.push('-');
operation.push(20);

console.log(operate(operation[0], operation[2], operation[1]));
console.log(operation.length)
