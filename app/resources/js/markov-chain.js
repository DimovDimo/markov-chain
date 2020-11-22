const joinItemsConstant = " ";
const endOfSentenceConstant = ".";

document.getElementById("generator").addEventListener("click", markov);

function markov() {
	removeResults();
	let chain = generateChain();	
	let article = generateArticle(chain);	
	htmlOutput(article);
}

function generateArticle(chain) {
	let article = document.createElement("article");
	let title = generateTitle(chain);
	article.appendChild(title);
	appendParagraphs(chain, article);

	return article;
}

function appendParagraphs(chain, article) {
	let length = getRandomLength("min-paragraphs", "max-paragraphs");
	for (let i = 0; i < length; i++) {
		let paragraph = generateParagraph(chain);
		article.appendChild(paragraph);
	}
}

function generateTitle(chain) {
	let words = getRandomWords(chain, "min-title", "max-title");
	words[0] = capitalize(words[0]);

	let title = words.join(joinItemsConstant);
	let titleHtml = document.createElement("h2");
	titleHtml.textContent = title;
	
	return titleHtml;
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
		let words = getRandomWords(chain, "min-words", "max-words");
		let sentence = generateSentence(words);
		paragraph.push(sentence);
	}

	let paragraphHtml = getParagraphHtml(paragraph);

	return paragraphHtml;
}

function getParagraphHtml(text) {
	let paragraphHtml = document.createElement("p");
	paragraphHtml.textContent = text.join(joinItemsConstant);
	
	return paragraphHtml;
}

function generateSentence(words) {
	words[0] = capitalize(words[0]);
	words[words.length - 1] = [words[words.length - 1], endOfSentenceConstant].join("");

    return words.join(joinItemsConstant);
}

function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

function getRandomWords(chain, minId, maxId) {
	let length = getRandomLength(minId, maxId);
	let words = generateItems(chain, length);
	
	return words;
}

function getRandomLength(minId, maxId) {
	let min = undefined;
	let max = undefined;

	({ min, max } = getMinMax(minId, maxId));
	
	return getRandomInteger(min, max);
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
	document.getElementById("results").appendChild(result);
}

function removeResults() {
	document.getElementById("results").innerText = "";
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