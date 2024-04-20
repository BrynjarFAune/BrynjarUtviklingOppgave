// Variables
const calculator = document.querySelector('.calculator');
const input = document.querySelector('input');
const buttons = document.querySelectorAll('button');
let btnGroup = {};
// Map buttons into btnGroup object for easier access
buttons.forEach(btn => {
  const name = btn.textContent;
  btnGroup[name] = btn;
  console.log(`Name: ${name}, value: ${btn}\n`);
});


// Functions
const clear = () => {
  input.value = '';
}

const backSpace = () => {
  input.value = input.value.slice(0, -1);
}


// EventListeners
btnGroup['CE'].addEventListener('click', backSpace);
btnGroup['AC'].addEventListener('click', clear);
