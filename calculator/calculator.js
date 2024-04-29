// Variables
const calculator = document.querySelector('.calculator');
const input = document.querySelector('input');
const buttons = document.querySelectorAll('button');
let btnGroup = {};
// Map buttons into btnGroup object for easier access
buttons.forEach(btn => {
  const name = btn.textContent.trim();
  btnGroup[name] = btn;
});
// Change 'X' button
btnGroup['*'] = btnGroup['X'];
delete btnGroup['X'];

// Is a parenthesis open?
let parOpened = false;

// Operation buttons
const operations = ['+', '-', '*', '/', '%'];



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
  } else {
    input.value = "Error";
    return;
  }
  console.log('failed.');
}


// Manage buttons

const callers = (key) => {
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
}

const comma = () => {
  for (let i = 0; i < input.value.length; i++) {
    if (input.value[i] === '.') {
      for (let ni = i; ni < input.value.length; ni++) {
        if (input.value[ni] === '.') {
          return false;
        } else if (operations.includes(input.value[ni])) {
          break;
        }
        if (ni === input.value.length) {
          return true;
        }
      }
    }
  }
  return true;
}


// Adds eventlisteners
const listener = (key) => {
  if (operations.includes(key)) {

    btnGroup[key].addEventListener('click', function() {
      // Simply add the key to the input field
      console.log(`Handling: ${key}\n`)
      if (input.value === '' || operations.includes(input.value[input.value.length - 1])) {
        return;
      }
      input.value += key;
      console.log("success!");
    });
  } else if (key === ".") {

    btnGroup[key].addEventListener('click', function() {
      // Simply add the key to the input field
      console.log(`Handling: ${key}\n`);
      if (comma()) {
        input.value += key;
        console.log("success!");
        return;
      }
      console.log("Invalid");
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
