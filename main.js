"use strict";

function main() {
	var board = new Board(8);
	var score = 0;

	document.getElementById("game").innerHTML = board.toString();
	document.getElementById("score").innerHTML = score;
	document.getElementById("instructions").innerHTML = "Enter a position (row, column):";
}
