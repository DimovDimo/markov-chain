document.getElementById("generator").addEventListener("click", markov);

function markov() {
    let input = getInput().toLowerCase();
	let items = getItems(input);
	let chain = getChain(items);
	let result = generateItems(chain, 400, " ");
	htmlOutput(result);
}

function htmlOutput(result) {
	document.getElementById("result").innerText = result;
}

function generateItems(chain, length, joinParameter) {
	let keys = Object.keys(chain);
	let value = getRandomElement(keys);
	let result = [];
	for (let i = 0; i < length; i++) {
		value = getRandomElement(chain[value]);
		result.push(value);
	}

	return result.join(joinParameter);
}

function getRandomElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function getChain(items) {
	let chain = {};
	for (let i = 0; i < items.length; i++) {
		let item = items[i];
		newItem(chain, item);
		relatedItem(items, i, chain, item);
	}
	
	return chain;
}

function relatedItem(items, i, chain, item) {
	if (items[i + 1]) {
		chain[item].push(items[i + 1]);
	}
}

function newItem(chain, item) {
	if (!chain[item]) {
		chain[item] = [];
	}
}

function getInput() {
	return document.getElementById("input").value;
}

function getItems(input) {
	return input.match(/(\w+)/g);
}