const display = document.querySelector('.display');
const controls = document.querySelector('.controls');
const controlButtons = controls.querySelectorAll('button');
const allOperators = ['+', '-', 'x', '÷', '%', '=', 'c'];
const mainOperators = ['+', '-', 'x', '÷', '%'];

let firstValue = '';
let secondValue = '';
let operator = '';
let result = '';

const formatNumber = (num) => new Intl.NumberFormat().format(Number(num));

const calculate = (value) => {
  firstValue = parseFloat(firstValue);
  secondValue = parseFloat(secondValue);

  switch (operator) {
    case '+':
      result = firstValue + secondValue;
      break
    case '-':
      result = firstValue - secondValue;
      break
    case 'x':
      result = firstValue * secondValue;
      break
    case '÷':
      result = firstValue / secondValue;
      break
    case '%':
      result = firstValue % secondValue;
  }

  display.innerText = formatNumber(result);
  value === '=' ? firstValue = '' : firstValue = result;
  secondValue = '';
}
const removeActive = () => controlButtons.forEach(button => button.classList.remove('active'));

controls.addEventListener('click', (e) => {
  const { innerText: btnValue } = e.target;
  if (!btnValue) return;

  if (mainOperators.includes(btnValue)) {
    removeActive();
    e.target.classList.toggle('active');
  }

  if (btnValue === 'c') {
    removeActive();
    firstValue = secondValue = operator = '';
    return display.innerText = '';
  }

  const btnValueIsOperator = allOperators.includes(btnValue);

  /*
    todo: if last character in the display is a symbol and the user clicks on another symbol,
     replace last character with the new symbol 
     
     ⬇️⬇️⬇️
     Haha, I kinda baked this solution from the get go. The if statement below solves the problem.
  */
  if (isNaN(btnValue) && btnValue !== 'del' && firstValue && btnValueIsOperator) {
    // display.innerText = '';
    secondValue && calculate(btnValue);
    btnValue !== '=' ? operator = btnValue : operator;
  }
  else if (!isNaN(btnValue) && !operator) {
    firstValue += btnValue;
    display.innerText = formatNumber(firstValue);
  }
  else if (firstValue && operator && btnValue !== 'del') {
    removeActive();
    secondValue += btnValue;
    display.innerText = formatNumber(secondValue);
  }

  else if (display.innerText && !firstValue && isNaN(btnValue) && mainOperators.includes(btnValue)) {
    firstValue = display.innerText;
    // display.innerText = '';
    operator = btnValue;
  }

  /*
    todo: if the value on the screen is a result, and the user clicks on a number, replace the value on the screen with the new number.

    Reply: I kinda baked the solution to this as well from the get go. The else if statement below solves the problem.
  */
  else if (display.innerText && !firstValue && !isNaN(btnValue)) {
    // display.innerText = '';
    operator = '';
    firstValue += btnValue;
    display.innerText = formatNumber(firstValue);
  }

  if (firstValue && operator && secondValue && btnValue === '=') calculate(btnValue);

  if (!secondValue && btnValue === '=') return null;


  /*
  todo: add backspace functionality

  Reply: I didn't bake this at beginning, I'll write the code for it below.*/
  if (btnValue === 'del' && !firstValue && !secondValue) return null;

  else if (btnValue === 'del' && firstValue && !secondValue) {
    firstValue = backspaceFunc(firstValue)
  }
  else if (btnValue === 'del' && firstValue && operator && secondValue) {
    secondValue = backspaceFunc(secondValue);
  }
});

function backspaceFunc(value) {
  const backspaceValue = String(value).substring(0, String(value).length - 1);
  // value = backspaceValue;
  console.log('Value =' + backspaceValue);
  display.innerText = formatNumber(backspaceValue);
  return backspaceValue;
}


/*
    todo: fix => if result is 0, calculator stops calculating

    Reply: Weirdly, this doesn't happen on my calculator and I don't know why. Hey I guess if it ain't broken don't fix it. What do you think Ebenezer?
  */