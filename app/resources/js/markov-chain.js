const joinItemsConstant = " ";
const endOfSentenceConstant = ".";

document.getElementById("generator").addEventListener("click", markov);

function markov() {
    let chain = generateChain();
	let paragraph = generateParagraph(chain);
	htmlOutput(paragraph);
}

function generateChain() {
	let input = getInput().toLowerCase();
	let items = getItems(input);
	return getChain(items);
}

function generateParagraph(chain) {
	let length = getRandomLength("min-sentences", "max-sentences");
	let paragraph = [];
	for (let i = 0; i < length; i++) {
		let words = getRandomWords(chain);
		let sentence = generateSentence(words);
		paragraph.push(sentence);
	}

	return paragraph.join(joinItemsConstant);
}

function generateSentence(words) {
	words[0] = capitalize(words[0]);
	words[words.length - 1] = [words[words.length - 1], endOfSentenceConstant].join("");

    return words.join(joinItemsConstant);
}

function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

function getRandomWords(chain) {
	let length = getRandomLength("min-words", "max-words");
	let items = generateItems(chain, length);
	
	return items;
}

function getRandomLength(minId, maxId) {
	let min = undefined;
	let max = undefined;

	({ min, max } = getMinMax(minId, maxId));
	let length = getRandomInteger(min, max);

	return length;
}

function getMinMax(minId, maxId) {
	let min = Number(document.getElementById(minId).value);
	let max = Number(document.getElementById(maxId).value);

    return setMinMax(min, max);
}

function setMinMax(min, max) {
	if (min > max) {
		let newMin = min;
		min = max;
		max = newMin;
	}

	return { min, max };
}

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function htmlOutput(result) {
	document.getElementById("result").innerText = result;
}

function generateItems(chain, length) {
	let keys = Object.keys(chain);
	let value = getRandomElement(keys);
	let result = [];
	for (let i = 0; i < length; i++) {
		value = getRandomElement(chain[value]);
		result.push(value);
	}

	return result;
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