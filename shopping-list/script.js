const newItem = document.getElementById('itemName');
const itemList = document.getElementById('list');
let groceryList = ['Apple'];

newItem.addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		addItem();
	}
})

function addItem() {
	let item = newItem.value.trim();
	if (!item) {
		return;
	}
	groceryList.push(item);
	newItem.value = "";
	update();
}

function update() {
	itemList.innerHTML = '';
	for (let i = 0; i < groceryList.length; i++) {
		let entry = groceryList[i];
		let item = document.createElement('li');
		item.textContent = entry;
		item.addEventListener("click", function() {
			item.classList.toggle("complete");
		});
		// Make a remove button
		let button = document.createElement('button');
		button.textContent = 'x';
		button.classList = "rm-button";
		button.addEventListener("click", function() {
			// Remove item from array
			groceryList.splice(i, 1);
			// Remove corresponding list item
			this.parentNode.remove();
		});
		// Add the button to the li
		item.append(button);
		itemList.appendChild(item);
	}
}

function clearList() {
	groceryList = [];
	update();
}

update();
