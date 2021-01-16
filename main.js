"use strict";

const size = 8;

var board;

function start() {
	board = new Board(size, document.getElementById("game"));
	board.update();
	document.getElementById("score").innerHTML = board.score;

	document.getElementById("row").setAttribute("max", size - 1);
	document.getElementById("column").setAttribute("max", size - 1);
}

function move() {
	var error = document.getElementById("error");
	error.innerHTML = "";

	var row = document.getElementById("row").value;
	var column = document.getElementById("column").value;
	var direction = document.getElementById("direction").value;

	if ((row == 0 && direction == "up")
		|| (row == size - 1 && direction == "down")
		|| (column == 0 && direction == "left")
		|| (column == size - 1 && direction == "right")) {
		error.innerHTML = "Invalid movement!";
	} else {
		board.move(row, column, direction);
	}
}
