"use strict";

class Board {
	// Creates the board and makes sure it is valid.
	constructor(size, display) {
		this.size = size;
		this.board = new Array(size);
		this.jewels = ["r", "g", "b", "y", "p"];
		this.score = 0;
		this.jewel_value=10;
		this.display = display;

		for (var i = 0; i < size; i++) {
			this.board[i] = Array(size);
			for (var j = 0; j < size; j++) {
				this.board[i][j] = this.jewels[Math.floor(Math.random() * 5)];
			}
		}

		while(this.clear()>0){
			this.create();
		}

		this.update();
		this.score = 0;
	}

	// Moves the selected piece, clear necessary pieces, and undoes the move if it's invalid.
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

		if (this.clear() == 0 ) {
			this.board[row][column] = selected;
			this.board[nextRow][nextColumn] = nextSelected;
		}
		else{
			this.create();
			while(this.clear() > 0){
				this.create();
			}
		}

		this.update();
	}

	// Clear equals pieces from the board. Returns how many pieces were cleared.
	clear() {
		var num_jewels_destroyed=0;
		var jewel_selected;

		for(var i=0;i<this.size;i++){
			for(var j=0;j<this.size;j++){


				jewel_selected=this.board[i][j];
				//condition to check if it is the right or left end of the board
				if(j > 1 && j < 6 && jewel_selected != "-1"){

					// the 5 jewels are equal(horizontally)
					if(this.board[i][j-2]==this.board[i][j-1] && this.board[i][j-1]==jewel_selected
						&& jewel_selected==this.board[i][j+1] && this.board[i][j+1]==this.board[i][j+2]){
						num_jewels_destroyed+=5;
						this.board[i][j-2]="-1";
						this.board[i][j-1]="-1";
						this.board[i][j]="-1";
						this.board[i][j+1]="-1";
						this.board[i][j+2]="-1";
					}

					// the first 4 jewels are equal(horizontally)
					else if(this.board[i][j-2]==this.board[i][j-1] && this.board[i][j-1]==jewel_selected
						&& jewel_selected==this.board[i][j+1] && this.board[i][j+1]!=this.board[i][j+2]){
						num_jewels_destroyed+=4;
						this.board[i][j-2]="-1";
						this.board[i][j-1]="-1";
						this.board[i][j]="-1";
						this.board[i][j+1]="-1";
					}

					// the last 4 jewels are equal(horizontally)
					else if(this.board[i][j-2]!=this.board[i][j-1] && this.board[i][j-1]==jewel_selected
						&& jewel_selected==this.board[i][j+1] && this.board[i][j+1]==this.board[i][j+2]){
						num_jewels_destroyed+=4;
						this.board[i][j-1]="-1";
						this.board[i][j]="-1";
						this.board[i][j+1]="-1";
						this.board[i][j+2]="-1";
					}

					// the first 3 jewels are equal(horizontally)
					else if(this.board[i][j-2]==this.board[i][j-1] && this.board[i][j-1]==jewel_selected
						&& jewel_selected!=this.board[i][j+1] && this.board[i][j+1]!=this.board[i][j+2]){
						num_jewels_destroyed+=3;
						this.board[i][j-2]="-1";
						this.board[i][j-1]="-1";
						this.board[i][j]="-1";
					}

					// the middle 3 jewels are equal(horizontally)
					else if(this.board[i][j-2]!=this.board[i][j-1] && this.board[i][j-1]==jewel_selected
						&& jewel_selected==this.board[i][j+1] && this.board[i][j+1]!=this.board[i][j+2]){
						num_jewels_destroyed+=3;
						this.board[i][j-1]="-1";
						this.board[i][j]="-1";
						this.board[i][j+1]="-1";
					}

					// the last 3 jewels are equal(horizontally)
					else if(this.board[i][j-2]!=this.board[i][j-1] && this.board[i][j-1]!=jewel_selected
						&& jewel_selected==this.board[i][j+1] && this.board[i][j+1]==this.board[i][j+2]){
						num_jewels_destroyed+=3;
						this.board[i][j]="-1";
						this.board[i][j+1]="-1";
						this.board[i][j+2]="-1";
					}
				}

				//condition to check if it is the top or bottom end of the board
				if( i > 1 && i < 6 && jewel_selected != "-1"){

					// the 5 jewels are equal(vertically)
					if(this.board[i-2][j]==this.board[i-1][j] && this.board[i-1][j]==jewel_selected
						&& jewel_selected==this.board[i+1][j] && this.board[i+1][j]==this.board[i+2][j]){
						num_jewels_destroyed+=5;
						this.board[i-2][j]="-1";
						this.board[i-1][j]="-1";
						this.board[i][j]="-1";
						this.board[i+1][j]="-1";
						this.board[i+2][j]="-1";
					}
					// the first 4 jewels are equal(vertically)
					if(this.board[i-2][j]==this.board[i-1][j] && this.board[i-1][j]==jewel_selected
						&& jewel_selected==this.board[i+1][j] && this.board[i+1][j]!=this.board[i+2][j]){
						num_jewels_destroyed+=4;
						this.board[i-2][j]="-1";
						this.board[i-1][j]="-1";
						this.board[i][j]="-1";
						this.board[i+1][j]="-1";
					}
					// the last 4 jewels are equal(vertically)
					if(this.board[i-2][j]!=this.board[i-1][j] && this.board[i-1][j]==jewel_selected
						&& jewel_selected==this.board[i+1][j] && this.board[i+1][j]==this.board[i+2][j]){
						num_jewels_destroyed+=4;
						this.board[i-1][j]="-1";
						this.board[i][j]="-1";
						this.board[i+1][j]="-1";
						this.board[i+2][j]="-1";
					}
					// the first 3 jewels are equal(vertically)
					if(this.board[i-2][j]==this.board[i-1][j] && this.board[i-1][j]==jewel_selected
						&& jewel_selected!=this.board[i+1][j] && this.board[i+1][j]!=this.board[i+2][j]){
						num_jewels_destroyed+=3;
						this.board[i-2][j]="-1";
						this.board[i-1][j]="-1";
						this.board[i][j]="-1";
					}
					// the middle 3 jewels are equal(vertically)
					if(this.board[i-2][j]!=this.board[i-1][j] && this.board[i-1][j]==jewel_selected
						&& jewel_selected==this.board[i+1][j] && this.board[i+1][j]!=this.board[i+2][j]){
						num_jewels_destroyed+=3;
						this.board[i-1][j]="-1";
						this.board[i][j]="-1";
						this.board[i+1][j]="-1";
					}
					// the last 3 jewels are equal(vertically)
					if(this.board[i-2][j]!=this.board[i-1][j] && this.board[i-1][j]!=jewel_selected
						&& jewel_selected==this.board[i+1][j] && this.board[i+1][j]==this.board[i+2][j]){
						num_jewels_destroyed+=3;
						this.board[i][j]="-1";
						this.board[i+1][j]="-1";
						this.board[i+2][j]="-1";
					}
				}

			}
		}
		//updating the score
		this.score+=this.jewel_value*num_jewels_destroyed;

		return num_jewels_destroyed;
	}

	//Create new pieces
	create(){
		for(var i=0; i < this.size;i++){
			for(var j=0;j < this.size;j++){
				if(this.board[i][j] == "-1"){
					this.board[i][j]=this.jewels[Math.floor(Math.random() * 5)];
				}
			}
		}
	}


	// Updates visible board.
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
