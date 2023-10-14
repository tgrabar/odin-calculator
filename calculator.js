function Calculator(firstOperand, secondOperand, operator) {
  this.firstOperand = firstOperand;
  this.secondOperand = secondOperand;
  this.operator = operator;
  this.answer = '';
  this.inputs = ['', '', ''];
  this.calculate = function() {
    if (!this.answer && this.firstOperand && this.secondOperand) {
      if (this.operator === '+') this.answer = Number(this.firstOperand) + Number(this.secondOperand);
      if (this.operator === '-') this.answer = Number(this.firstOperand) - Number(this.secondOperand);
      if (this.operator === '*') this.answer = Number(this.firstOperand) * Number(this.secondOperand);
      if (this.operator === '/') this.answer = Number(this.firstOperand) / (Number(this.secondOperand) === 0 ? 1 : Number(this.secondOperand));      
      updateDisplay();
      this.firstOperand = '';
      this.secondOperand = '';
      this.operator = '';
      this.inputs.splice(0, 3, '', '', '');
    }
  }
  this.setOperand = function (key) {
    if (this.answer) this.clear();
    if (!this.operator) {
      if (key === '.' && this.firstOperand.includes('.')) return;
      this.firstOperand += key;
      this.inputs[0] = this.firstOperand;
      updateDisplay();
    } 
    else {
      if (key === '.' && this.secondOperand.includes('.')) return;
      this.secondOperand += key;
      this.inputs[2] = this.secondOperand;
      updateDisplay();
    }
  }
  this.setOperator = function (key) {
    if (this.operator) return;
    if (this.answer) {
      this.firstOperand = this.answer;
      this.operator = key;
      this.answer = '';
      this.inputs.splice(0, 3, this.firstOperand, this.operator, '');
      updateDisplay();
    }
    else if (this.firstOperand !== '' && this.secondOperand === '') {
      this.operator = key;
      this.inputs[1] = this.operator;
      updateDisplay();
    }      
  }
  this.clear = function () {
    this.firstOperand = '';
    this.secondOperand = '';
    this.operator = '';
    this.answer = '';
    this.inputs.splice(0, 3, '', '', '');
    updateDisplay();
  }
  this.backSpace = function() {
    if (this.secondOperand) {
      this.secondOperand = this.secondOperand.slice(0, -1);
      this.inputs[2] = this.secondOperand;
      updateDisplay();
    }
    else if (this.operator) {
      this.operator = '';
      this.inputs[1] = '';
      updateDisplay();
    }
    else if (this.firstOperand) {
      this.firstOperand = this.firstOperand.slice(0, -1);
      this.inputs[0] = this.firstOperand;
      updateDisplay();
    }
  }
  this.negate = function() {
    if (this.secondOperand) {
      this.secondOperand = String(Number(this.secondOperand) * -1);
      this.inputs[2] = this.secondOperand;
      updateDisplay();
    }    
    else if (this.firstOperand && !this.operator) {
      this.firstOperand = String(Number(this.firstOperand) * -1);
      this.inputs[0] = this.firstOperand;
      updateDisplay();
    }
  }
}

const calculator = new Calculator('', '', '');

const numKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const mathKeys = ['+', '-', '*', '/'];

const displayRow1 = document.querySelector('.disp-row1');
const displayRow2 = document.querySelector('.disp-row2');
const numBtns = document.querySelectorAll('.num-btn');
const mathBtns = document.querySelectorAll('.math-btn');
const equalBtn = document.querySelector('.eq-btn');

document.querySelector('#clear').addEventListener('click', () => calculator.clear());
document.querySelector('#negate').addEventListener('click', () => calculator.negate());
document.querySelector('#backspace').addEventListener('click', () => calculator.backSpace());

numBtns.forEach((btn) => { btn.addEventListener('click', e =>  calculator.setOperand(e.target.dataset.key)); });
numKeys.forEach(key => document.addEventListener('keydown', (e) => {
  if(e.key === key) {
    keyPressEffect(e);
    calculator.setOperand(key);
    }
  }));

mathBtns.forEach((btn) => { btn.addEventListener('click', e => calculator.setOperator(e.target.dataset.key)); });
mathKeys.forEach(key => document.addEventListener('keydown', (e) => {
  if(e.key === key) {
    keyPressEffect(e);
    calculator.setOperator(key);
  }
 }));

equalBtn.addEventListener('click', () => calculator.calculate());
document.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    keyPressEffect(e);
    calculator.calculate();
  }
})

document.addEventListener('keydown', (e) => {
  if(e.key === 'Backspace') {
    keyPressEffect(e);
    calculator.backSpace();
  }
})

function updateDisplay() {
  displayRow1.textContent = calculator.inputs.join(' ').replace('*', '×').replace('/', '÷');
  displayRow2.textContent = calculator.answer;
}

function keyPressEffect(e) {
  const keyPressed = document.querySelector(`button[data-key="${e.key}"]`)
  keyPressed.classList.add('active');
  setTimeout(() => keyPressed.classList.remove('active'), 150);
}