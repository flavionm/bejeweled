"use strict";

class Board {
	constructor(size, display) {
		this.size = size;
		this.board = new Array(size);
		this.jewels = ["r", "g", "b", "y", "p"];
		this.score = 0;
		this.display = display;

		for (var i = 0; i < size; i++) {
			this.board[i] = Array(size);
			for (var j = 0; j < size; j++) {
				this.board[i][j] = this.jewels[Math.floor(Math.random() * 5)];
			}
		}

		this.clear();

		this.update();
	}

	move(row, column, direction) {
		const selected = this.board[row][column];
		var nextRow = row;
		var nextColumn = column;

		if (direction == "up") {
			nextRow--;
		} else if (direction == "down") {
			nextRow++;
		} else if (direction == "left") {
			nextColumn--;
		} else if (direction == "right") {
			nextColumn++;
		}

		const nextSelected = this.board[nextRow][nextColumn];
		this.board[row][column] = nextSelected;
		this.board[nextRow][nextColumn] = selected;

		this.update();

		if (this.clear() == false) {
			this.board[row][column] = selected;
			this.board[nextRow][nextColumn] = nextSelected;
		}

		this.update();
	}

	clear() {
		//TODO: implement exclusion of matching gems.

		return false;
	}

	update() {
		var boardString = "";

		for (var i = 0; i < this.size; i++) {
			boardString += i + " ";
		}

		boardString += "\n\n";

		for (var i = 0; i < this.size; i++) {
			for (var jewel of this.board[i]) {
				boardString += jewel + " ";
			}
			boardString += "    " + i + "\n";
		}

		this.display.innerHTML = boardString;
	}
}
