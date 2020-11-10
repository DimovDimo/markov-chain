document.getElementById("generator").addEventListener("click", markov);

function markov() {
    let input = getInput().toLowerCase();
	let items = getItems(input);
	let chain = getChain(items);
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