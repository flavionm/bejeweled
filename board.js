"use strict";

class Board {
	constructor(size) {
		this.size = size;
		this.board = new Array(size);
		this.jewels = ["r", "g", "b", "y", "p"];
		this.score = 0;

		for (var i = 0; i < size; i++) {
			this.board[i] = Array(size);
			for (var j = 0; j < size; j++) {
				this.board[i][j] = this.jewels[Math.floor(Math.random() * 5)];
			}
		}
	}

	move(row, column, direction) {
		console.log(row + " " + column + " " + direction);
	}

	toString() {
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

		return boardString;
	}
}
