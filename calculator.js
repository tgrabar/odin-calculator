const numbers = [];
let num = '';
let mathFunc = '';
let answerReceived = false;
const numKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const mathKeys = ['+', '-', '*', '/'];

const displayRow1 = document.querySelector('.disp-row1');
const displayRow2 = document.querySelector('.disp-row2');
const numBtns = document.querySelectorAll('.num-btn');
const mathBtns = document.querySelectorAll('.math-btn');
const equalBtn = document.querySelector('.eq-btn');

document.querySelector('#clear').addEventListener('click', () => clear());
document.querySelector('#negate').addEventListener('click', () => negate(num));
document.querySelector('#backspace').addEventListener('click', () => backSpace());

numBtns.forEach((btn) => {
  btn.addEventListener('click', e => numberEntry(e.target.dataset.key));
});
numKeys.forEach(key => document.addEventListener('keydown', (e) => { if(e.key === key) numberEntry(key) }));

mathBtns.forEach((btn) => {
  btn.addEventListener('click', e => operatorEntry(e.target.dataset.key));
});
mathKeys.forEach(key => document.addEventListener('keydown', (e) => { if(e.key === key) operatorEntry(key) }));

equalBtn.addEventListener('click', () => equalsEntry());
document.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === '=') equalsEntry() })

function numberEntry(key) {
  // entering a number after a calculation begins a new one
  if (answerReceived) clear();
  // prevent more than one decimal per number
  if(num.includes('.') && key === '.') return;
  num += key;
  updateDisplayRow1(key);
  equalBtn.removeAttribute('disabled');
}

function operatorEntry(key) {
  if (numbers.length === 0 && num !== '') {
    setFirstNum(num, key);
    updateDisplayRow1(key, ' ');
    disableButtons(mathBtns);
    answerReceived = false;
  }
  else if (numbers.length === 1 && mathFunc === '') {
    setSecondNum(num);
    updateDisplayRow1(key, ' ');
    disableButtons(mathBtns);
    equalBtn.removeAttribute('disabled');
    answerReceived = false;
  }
  console.log(numbers);
}

function equalsEntry() {
  if (numbers.length === 1 && mathFunc !== '') {
    setSecondNum(num);
    displayRow1.textContent += ' =';
    operate(Number(numbers[0]), Number(numbers[1]), mathFunc);
    enableButtons(mathBtns);
    equalBtn.setAttribute('disabled', '');
  }
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) return 0;
  return a / b;
}

function operate(num1, num2, func) {
  let answer = '';
  switch (func) {
    case '+': answer = add(num1, num2);
      break;
    case '-': answer = subtract(num1, num2);
      break;
    case '*': answer = multiply(num1, num2);
      break;
    case '/': answer = divide(num1, num2);
      break;
    default: return 0;
  }
  displayAnswer(answer);
  console.log(answer);
  answerReceived = true;
}

function setFirstNum(number, operator) {
  numbers.push(number);
  num = '';
  mathFunc = operator;
}

function setSecondNum(number) {
  numbers.push(number);
  num = '';
}

function updateDisplayRow1 (key, addSpace = '') {
  if(displayRow1.textContent.length <= 35)
  displayRow1.textContent += addSpace + symbols(key) + addSpace;
}

function symbols(key) {
  switch(key) {
    case '/': return '÷';
    case '*': return '×';
    case '+': return '+';
    case '-': return '−';
    default: return key;
  }
}

function displayAnswer(answer) {
  if(displayRow1.textContent.length > 30)
    displayRow1.textContent = Number.isInteger(answer) ? answer : answer.toFixed(2);
  else
    displayRow1.textContent += ' ' + (Number.isInteger(answer) ? answer : answer.toFixed(2));
  displayRow2.textContent = answer;
  numbers.length = 0;  
  num = answer;
  mathFunc = '';
}

function clear() {
  displayRow1.textContent = '';
  displayRow2.textContent = '';
  numbers.length = 0;
  num = '';
  mathFunc = '';
  answerReceived = false;
  enableButtons(numBtns);
  enableButtons(mathBtns);
  equalBtn.removeAttribute('disabled');
}

function negate(number) {
  num = Number(number) * -1;
  const arr = displayRow1.textContent.split(' ');
  arr[arr.length - 1] = num;
  displayRow1.textContent = arr.join(' ');
}

function backSpace() {
  if(num.length > 0)
  num = num.slice(0, -1);
  const arr = displayRow1.textContent.split(' ');
  arr[arr.length - 1] = num;
  displayRow1.textContent = arr.join(' ');
}

function disableButtons (btns) {
  btns.forEach(btn => btn.setAttribute('disabled', ''));
}

function enableButtons (btns) {
  btns.forEach(btn => btn.removeAttribute('disabled'));
}