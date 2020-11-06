document.getElementById("generator").addEventListener("click", markov);

function markov() {
    let chain = {};
    let input = getInput();
	let items = splitInput(input);
}

function getInput() {
	return document.getElementById("input").value;
}


function splitInput(input) {
	let splitParameter = document.getElementById("split").value;
	return input.split(splitParameter);
}