"use strict";

const size = 8;

const board = new Board(size);

function start() {
	document.getElementById("game").innerHTML = board.toString();
	document.getElementById("score").innerHTML = board.score;

	document.getElementById("row").setAttribute("max", size - 1);
	document.getElementById("column").setAttribute("max", size - 1);
}

function move() {
	var row = document.getElementById("row").value;
	var column = document.getElementById("column").value;
	var direction = document.getElementById("direction").value;

	board.move(row, column, direction);
}
