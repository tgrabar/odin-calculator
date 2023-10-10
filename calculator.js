const numbers = [];
let num = '';
let mathFunc = '';
let answerReceived = false;

const displayRow1 = document.querySelector('.disp-row1');
const displayRow2 = document.querySelector('.disp-row2');
const mathBtns = document.querySelectorAll('.math-btn');
const numBtns = document.querySelectorAll('.num-btn');
const equalBtn = document.querySelectorAll('.eq-btn');
document.querySelector('#clear').addEventListener('click', () => clear());
document.querySelector('#negate').addEventListener('click', () => negate(num));


document.querySelectorAll('.num-btn').forEach((btn) => {
  btn.addEventListener('click', e => {
    // entering a number after a calculation begins a new one
    if (answerReceived) clear();
    num += e.target.textContent;
    updateDisplayRow1(e);
    enableButtons(equalBtn);
  });
});

document.addEventListener('click', e => {
  if (e.target.matches('.math-btn')) {
    if (numbers.length === 0 && num !== '') {
      setFirstNum(num, e.target.id);
      updateDisplayRow1(e, ' ');
      disableButtons(mathBtns);
      answerReceived = false;
    }
    else if (numbers.length === 1 && mathFunc === '') {
      setSecondNum(num);
      updateDisplayRow1(e, ' ');
      disableButtons(mathBtns);
      enableButtons(equalBtn);
      answerReceived = false;
    }
  }
})

document.addEventListener('click', e => {
  if (e.target.matches('.eq-btn') && numbers.length === 1 && mathFunc !== '') {
    setSecondNum(num);
    displayRow1.textContent += ' =';
    operate(Number(numbers[0]), Number(numbers[1]), mathFunc);
    enableButtons(mathBtns);
    disableButtons(equalBtn);
  }
})

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
    case 'plus': answer = add(num1, num2);
      break;
    case 'minus': answer = subtract(num1, num2);
      break;
    case 'multiply': answer = multiply(num1, num2);
      break;
    case 'divide': answer = divide(num1, num2);
      break;
    default: return 0;
  }
  displayAnswer(answer);
  answerReceived = true;
}

function updateDisplayRow1 (e, addSpace = '') {
  if(displayRow1.textContent.length <= 35)
  displayRow1.textContent += addSpace + e.target.textContent + addSpace;
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
  console.log(numbers)
}

function setFirstNum(number, operator) {
  numbers.push(number);
  num = '';
  mathFunc = operator;
  console.log(numbers);
}

function setSecondNum(number) {
  numbers.push(number);
  num = '';
  console.log(numbers);
}

function disableButtons (btns) {
  btns.forEach(btn => btn.setAttribute('disabled', ''));
}

function enableButtons (btns) {
  btns.forEach(btn => btn.removeAttribute('disabled'));
}

function clear () {
  displayRow1.textContent = '';
  displayRow2.textContent = '';
  numbers.length = 0;
  num = '';
  mathFunc = '';
  answerReceived = false;
  enableButtons(numBtns);
  enableButtons(mathBtns);
  enableButtons(equalBtn);
}

function negate(number) {
  num = Number(number) * -1;
  const arr = displayRow1.textContent.split(' ');
  arr[arr.length - 1] = num;
  displayRow1.textContent = arr.join(' ');
}