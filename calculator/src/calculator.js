// Variables
const calculator = document.querySelector('.calculator');
const input = document.querySelector('input');
const buttons = document.querySelectorAll('button');
let btnGroup = {};
// Map buttons into btnGroup object for easier access
buttons.forEach(btn => {
  const name = btn.textContent.trim();
  btnGroup[name] = btn;
  console.log(`Name: ${name}, value: ${btn} - `, typeof name, '\n');
});
// Change 'X' button
btnGroup['*'] = btnGroup['X'];
delete btnGroup['X'];

// Is a parenthesis open?
let parOpened = false;

// Operation buttons
const operations = ['+', '-', '*', '/', '%', '.'];



// Functions
const clear = () => {
  input.value = '';
}

// Clear input
clear();


const backSpace = () => {
  input.value = input.value.slice(0, -1);
}

const evalueate = () => {
  console.log('Evaluating equation...');

  const newValue = eval(input.value);
  if (newValue !== undefined) {
    input.value = newValue;
    console.log('done!\n');
    return;
  }
  console.log('failed.');
}


// Manage buttons

const callers = (key) => {
  console.log(`Key ${key} is a caller\n`);
  if (key === "=") {
    btnGroup[key].addEventListener('click', evalueate);
    return;
  } else if (key === "AC") {
    btnGroup[key].addEventListener('click', clear);
    return;
  } else if (key === "CE") {
    btnGroup[key].addEventListener('click', backSpace);
    return;
  }
  console.log('Caller not found...\n');
}


// Adds eventlisteners
const listener = (key) => {
  console.log(`Adding listener to ${key} key...`);
  if (['+', '-', '*', '/', '%', '.'].includes(key)) {

    btnGroup[key].addEventListener('click', function() {
      // Simply add the key to the input field
      console.log(`Handling: ${key}\n`)
      if (input.value === '' || operations.includes(input.value[input.value.length - 1])) {
        return;
      }
      input.value += key;
      console.log("success!");
    });
  } else {
    btnGroup[key].addEventListener('click', function() {
      // Simply add the key to the input field
      console.log(`Handling: ${key}\n`);
      input.value += key;
      console.log("success!");
    });
  }
}

const handleButtons = () => {
  // Loop through all buttons in object
  Object.keys(btnGroup).forEach(key => {

    if (key === "=" || key === "AC" || key === "CE") {
      // Callers function handles these
      callers(key);
    } else {
      // Pass to listener function
      listener(key);
    }
  });
}


// Handle keyboard inputs

const bouncer = (char) => {
  Object.keys(btnGroup).forEach(key => {
    // If key is an operation or fn, it should have some rules.
    if (key === char && /^\d$/.test(key)) {
      input.value += key;
    } else if (operations.includes(char)) {

      if (input.value === '' || operations.includes(input.value[input.value.length - 1])) {
        return;
      }
      else {
        input.value += char;
      }
    }
  });
}

input.addEventListener('keydown', function(e) {
  e.preventDefault();
  if (e.key === '=' || e.key === 'Enter') { evalueate(); return; }
  if (e.key === 'Backspace' || e.key === 'Delete') { backSpace(); return; }
  console.log(e.key);
  bouncer(e.key);
});




handleButtons();

