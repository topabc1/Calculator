document.addEventListener("DOMContentLoaded", () => {

const numberBtns = Array.from(document.querySelectorAll(".number"));
const operatorBtns = Array.from(document.querySelectorAll(".operator"));
const inputDisplayEl = document.querySelector("#input-display");
const displayEl = document.querySelector("#display");
const clearEl = document.querySelector("#clear");
const decimalEl = document.querySelector("#decimal");
const equalsEl = document.querySelector("#equals");
let input;
let output;
let decimalID;
let calc;
let result;

/* START *********************************************************/
input = "";
output = "";
inputDisplayEl.innerHTML = "0";
displayEl.innerHTML = "0";
decimalID = false;
calc = [];
result = 0;

/* UPDATE *********************************************************/
numberBtns.forEach((item, index) => {
	item.addEventListener("click", () => {
		if(input != "0" && input != "/" && input != "x" && input != "-" && input != "+") {
			input += item.innerHTML;
			output += item.innerHTML;
			inputDisplayEl.innerHTML = input;
			displayEl.innerHTML = output;
		} else if(output != "0") {
			input = "";
			input += item.innerHTML;
			output += item.innerHTML;
			inputDisplayEl.innerHTML = input;
			displayEl.innerHTML = output;
		}
	});
});

operatorBtns.forEach((item, index) => {
	item.addEventListener("click", () => {
		input = item.innerHTML;
		output += item.innerHTML;
		inputDisplayEl.innerHTML = input;
		displayEl.innerHTML = output;
		decimalID = false;
	});
});

clearEl.addEventListener("click", () => {
	input = "";
	output = "";
	inputDisplayEl.innerHTML = "0";
	displayEl.innerHTML = "0";
	decimalID = false;
	calc = [];
	result = 0;
});

decimalEl.addEventListener("click", () => {
	if(decimalID === false) {
		decimalID = true;
		input += decimalEl.innerHTML;
		inputDisplayEl.innerHTML = input;
		output += decimalEl.innerHTML;
		displayEl.innerHTML = output;
	}
});

equalsEl.addEventListener("click", () => {
	result = 0;
	Calculate();
	output = result;
	displayEl.innerHTML += "=" + output;
	input = result;
	inputDisplayEl.innerHTML = input;
});

function Calculate() {
	output = output.split("");
	for(let i = 0; i < output.length; i++) {
		if(/[\x\/\+\-]/gi.test(output[i]) && /[\-]/gi.test(output[i + 1]) && /[\d]/gi.test(output[i + 2])) {
			output[i + 1] = "m";
		}
	}
	output = output.join("");

	calc = output.split(/[\x\/\-\+]/gi);
	let t = 0; // tracks operators
	let ops = [];
	for(let i = 0; i < output.length; i++) {
		if(/[\x\+\-\/]/gi.test(output[i])) {
			ops[t] = output[i];
		} else if(/[\.\d]/gi.test(output[i]) && i != 0) {
			t++;
		}
	}
	let opsFiltered = [];
	for(let i = 0; i < ops.length; i++) {
		if(ops[i]) {
			opsFiltered.push(ops[i]);
		}
	}
	let calcFiltered = [];
	for(let i = 0; i < calc.length; i++) {
		if(calc[i]) {
			calc[i] = calc[i].split("");
			for(let a = 0; a < calc[i].length; a++) {
				if(calc[i][a] === "m") {
					calc[i][a] = "-";
				}
			}
			calc[i] = calc[i].join("");
			calcFiltered.push(calc[i]);
		}
	}

	let k = 0; // accounts for splice
	let length = opsFiltered.length;
	for(let i = 0; i < length; i++) {
		if(opsFiltered[k] === "x") {
			calcFiltered[k] = parseFloat(calcFiltered[k]) * parseFloat(calcFiltered[k + 1]);
			calcFiltered.splice(k + 1, 1);
			opsFiltered.splice(k, 1);
		} else if(opsFiltered[k] === "/") {
			calcFiltered[k] = parseFloat(calcFiltered[k]) / parseFloat(calcFiltered[k + 1]);
			calcFiltered.splice(k + 1, 1);
			opsFiltered.splice(k, 1);
		} else {
			k++;
		}
	}
	
	if(opsFiltered.length == 0) {
		result = parseFloat(calcFiltered[0]);
	} else {
		for(let i = 0; i < opsFiltered.length; i++) {
			if(opsFiltered[i] === "+" && i == 0) {
				result += parseFloat(parseFloat(calcFiltered[i]) + parseFloat(calcFiltered[i + 1]));
			} else if(opsFiltered[i] === "-" && i == 0) {
				result += parseFloat(parseFloat(calcFiltered[i]) - parseFloat(calcFiltered[i + 1]));
			} else if(opsFiltered[i] === "+") {
				result += parseFloat(calcFiltered[i + 1]);
			} else if(opsFiltered[i] === "-") {
				result -= parseFloat(calcFiltered[i + 1]);
			}
		}
	}
}

});