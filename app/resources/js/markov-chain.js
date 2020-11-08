document.getElementById("generator").addEventListener("click", markov);

function markov() {
    let chain = {};
    let input = getInput();
	let items = getItems(input);
}

function getInput() {
	return document.getElementById("input").value;
}

function getItems(input) {
	return input.match(/(\w+)/g);
}