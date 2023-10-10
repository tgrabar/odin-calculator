const numbers = [];
let numberEntered = '';
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
document.querySelector('#negate').addEventListener('click', () => negate(numberEntered));
document.querySelector('#backspace').addEventListener('click', () => backSpace());

numBtns.forEach((btn) => { btn.addEventListener('click', e =>  numberEntry(e.target.dataset.key)); });
numKeys.forEach(key => document.addEventListener('keydown', (e) => {
  if(e.key === key) {
    keyPressEffect(e);
    numberEntry(key);
    }
  }));

mathBtns.forEach((btn) => { btn.addEventListener('click', e => operatorEntry(e.target.dataset.key)); });
mathKeys.forEach(key => document.addEventListener('keydown', (e) => {
  if(e.key === key && !document.querySelector(`button[data-key="${e.key}"]`).hasAttribute('disabled')) {
    keyPressEffect(e);
    operatorEntry(key);
  }
 }));

equalBtn.addEventListener('click', () => equalsEntry());
document.addEventListener('keydown', (e) => {
  if(e.key === 'Enter' && !equalBtn.hasAttribute('disabled')) {
    keyPressEffect(e);
    equalsEntry();
  }
})

document.addEventListener('keydown', (e) => {
  if(e.key === 'Backspace') {
    keyPressEffect(e);
    backSpace();
  }
})

function numberEntry(key) {
  // entering a number after a calculation begins a new one
  if (answerReceived) clear();
  // prevent more than one decimal per number
  if(numberEntered.includes('.') && key === '.') return;
  numberEntered += key;
  updateDisplayRow1(key);
  equalBtn.removeAttribute('disabled');
}

function operatorEntry(key) {
  if (numbers.length === 0 && numberEntered !== '') {
    setFirstNum(numberEntered, key);
    updateDisplayRow1(key, ' ');
    disableButtons(mathBtns);
    answerReceived = false;
  }
  else if (numbers.length === 1 && mathFunc === '') {
    setSecondNum(numberEntered);
    updateDisplayRow1(key, ' ');
    disableButtons(mathBtns);
    equalBtn.removeAttribute('disabled');
    answerReceived = false;
  }
}

function equalsEntry() {
  if (numbers.length === 1 && mathFunc !== '') {
    setSecondNum(numberEntered);
    displayRow1.textContent += ' =';
    operate(Number(numbers[0]), Number(numbers[1]), mathFunc);
    enableButtons(mathBtns);
    equalBtn.setAttribute('disabled', '');
  }
}

function operate(num1, num2, func) {
  let answer = '';
  switch (func) {
    case '+': answer = num1 + num2;
      break;
    case '-': answer = num1 - num2;
      break;
    case '*': answer = num1 * num2;
      break;
    case '/': answer = num1 / (num2 === 0 ? 1 : num2);
      break;
    default: return 0;
  }
  displayAnswer(answer);
  answerReceived = true;
}

function setFirstNum(num, operator) {
  numbers.push(num);
  numberEntered = '';
  mathFunc = operator;
}

function setSecondNum(num) {
  numbers.push(num);
  numberEntered = '';
}

function updateDisplayRow1 (key, addSpace = '') {
  if(displayRow1.textContent.length <= 35)
  displayRow1.textContent += addSpace + key + addSpace;
}

function displayAnswer(answer) {
  if(displayRow1.textContent.length > 30)
    displayRow1.textContent = Number.isInteger(answer) ? answer : answer.toFixed(2);
  else
    displayRow1.textContent += ' ' + (Number.isInteger(answer) ? answer : answer.toFixed(2));
  displayRow2.textContent = answer;
  numbers.length = 0;  
  numberEntered = answer;
  mathFunc = '';
}

function clear() {
  displayRow1.textContent = '';
  displayRow2.textContent = '';
  numbers.length = 0;
  numberEntered = '';
  mathFunc = '';
  answerReceived = false;
  enableButtons(numBtns);
  enableButtons(mathBtns);
  equalBtn.removeAttribute('disabled');
}

function negate(num) {
  if(num === '' || num === '0') return;
  numberEntered = Number(num) * -1;
  const arr = displayRow1.textContent.split(' ');
  arr[arr.length - 1] = numberEntered;
  displayRow1.textContent = arr.join(' ');
}

function backSpace() {
  if(numberEntered.length > 0)
  numberEntered = numberEntered.slice(0, -1);
  const arr = displayRow1.textContent.split(' ');
  arr[arr.length - 1] = numberEntered;
  displayRow1.textContent = arr.join(' ');
}

function disableButtons (btns) {
  btns.forEach(btn => btn.setAttribute('disabled', ''));
}

function enableButtons (btns) {
  btns.forEach(btn => btn.removeAttribute('disabled'));
}

function keyPressEffect(e) {
  const keyPressed = document.querySelector(`button[data-key="${e.key}"]`)
  keyPressed.classList.add('active');
  setTimeout(() => keyPressed.classList.remove('active'), 150);
}