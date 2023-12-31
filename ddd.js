let expression = prompt('введите выражение');
expression = expression.toString();
let characters = expression.split('');
let index = 0;
let postfix = '';
let stack = [];

let priority = {
  '-': 0,
  '+': 0,
  '*': 1,
  '/': 1,
  '^': 2,
  '(': -1
};

while (index < characters.length) {
  if (/\d/.test(characters[index])) {
    postfix += characters[index];
  } else {
    if (stack.length === 0) {
      stack.push(characters[index]);
    } else {
      if (characters[index] === '(') {
        stack.push(characters[index]);
      } else if (characters[index] === ')') {
        while (stack[stack.length - 1] !== '(') {
          postfix += stack.pop();
        }
        stack.pop();
      } else if (priority[stack[stack.length - 1]] < priority[characters[index]]) {
        stack.push(characters[index]);
      } else if (priority[stack[stack.length - 1]] === priority[characters[index]]) {
        postfix += stack[stack.length - 1];
        stack[stack.length - 1] = characters[index];
      } else if (priority[stack[stack.length - 1]] > priority[characters[index]]) {
        while (priority[stack[stack.length - 1]] >= priority[characters[index]] && stack.length !== 0) {
          postfix += stack[stack.length - 1];
          stack.pop();
        }
        stack.push(characters[index]);
      }
    }
  }
  index++;
}

while (stack.length !== 0) {
  if (stack[stack.length - 1] !== '(') {
    postfix += stack[stack.length - 1];
  }
  stack.pop();
}

let postfixCharacters = postfix.split('');
let result = 0;
let stack2 = [];

index = 0;

while (index < postfixCharacters.length) {
  if (/\d/.test(postfixCharacters[index])) {
    stack2.push(postfixCharacters[index]);
    index++;
  } else {
    let operand1 = parseInt(stack2.pop());
    let operand2 = parseInt(stack2.pop());
    let operation = postfixCharacters[index];

    switch (operation) {
      case '*':
        stack2.push(operand2 * operand1);
        break;
      case '-':
        stack2.push(operand2 - operand1);
        break;
      case '/':
        stack2.push(operand2 / operand1);
        break;
      case '^':
        stack2.push(Math.pow(operand2, operand1));
        break;
      case '+':
        stack2.push(operand2 + operand1);
        break;
    }

    index++;
  }
}

console.log(stack2[0]);
