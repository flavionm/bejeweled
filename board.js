"use strict";

class Board {
	// Creates the board and makes sure it is valid.
	constructor(size, display) {
		this.size = size;
		this.board = new Array(size);
		this.jewels = ["red", "green", "blue", "yellow", "purple"];
		this.score = 0;
		this.jewel_value=10;
		this.display = display;
		var id = 0;
		for (var i = 0; i < this.size; i++) {
			this.board[i]=Array(size);
			for(var j=0;j<this.size;j++){
				const jewel = document.createElement('div');
    			jewel.setAttribute('draggable', true);
    			jewel.setAttribute('id', id);
    			id++;
    			jewel.style.backgroundColor = this.jewels[Math.floor(Math.random() * this.jewels.length)];
    			jewel.addEventListener('dragstart', dragStart)
    			jewel.addEventListener('dragend', dragEnd);
				jewel.addEventListener('dragover', dragOver);
				jewel.addEventListener('dragenter', dragEnter);
				jewel.addEventListener('drageleave', dragLeave);
				jewel.addEventListener('drop', dragDrop);
    			this.display.appendChild(jewel);
    			this.board[i][j]=jewel;
			}
    		
  		}  				
	}
	
	//Change the color of given jewel
	changeBackColor(jewelId,colorBeingReplaced){
		var row  = Math.floor(jewelId/this.size);
		var column = jewelId%this.size;
		this.board[row][column].style.backgroundColor=colorBeingReplaced;
	}
	
	//Checks if the move made destroyed any pieces. Updates the score and returns the number of pieces destroyed;
	checkMove(){
		var num_jewels_destroyed=0;
		var jewel_selected;

		for(var i=0;i<this.size;i++){
			for(var j=0;j<this.size;j++){

				jewel_selected=this.board[i][j].style.backgroundColor;
				
				//condition to check if the jewel is already destroyed
				if(jewel_selected != ""){
					
					// check if 5 jewels are equal(horizontally)
					if(j <= (this.size-5) && jewel_selected==this.board[i][j+1].style.backgroundColor && this.board[i][j+1].style.backgroundColor==this.board[i][j+2].style.backgroundColor
						&& this.board[i][j+2].style.backgroundColor==this.board[i][j+3].style.backgroundColor && this.board[i][j+3].style.backgroundColor==this.board[i][j+4].style.backgroundColor){
						num_jewels_destroyed+=5;
						this.board[i][j].style.backgroundColor="";
						this.board[i][j+1].style.backgroundColor="";
						this.board[i][j+2].style.backgroundColor="";
						this.board[i][j+3].style.backgroundColor="";
						this.board[i][j+4].style.backgroundColor="";
					}
					// check if  4 jewels are equal(horizontally)
					else if(j <= (this.size-4) && jewel_selected==this.board[i][j+1].style.backgroundColor && this.board[i][j+1].style.backgroundColor==this.board[i][j+2].style.backgroundColor
						&& this.board[i][j+2].style.backgroundColor==this.board[i][j+3].style.backgroundColor){
						num_jewels_destroyed+=4;
						this.board[i][j].style.backgroundColor="";
						this.board[i][j+1].style.backgroundColor="";
						this.board[i][j+2].style.backgroundColor="";
						this.board[i][j+3].style.backgroundColor="";
					}
					// check if 3 jewels are equal(horizontally)
					else if(j <= (this.size-3) && jewel_selected==this.board[i][j+1].style.backgroundColor 
						&& this.board[i][j+1].style.backgroundColor==this.board[i][j+2].style.backgroundColor){
						num_jewels_destroyed+=3;
						this.board[i][j].style.backgroundColor="";
						this.board[i][j+1].style.backgroundColor="";
						this.board[i][j+2].style.backgroundColor="";
					}				
					// check if 5 jewels are equal(vertically)
					if(i <= (this.size-5) && jewel_selected==this.board[i+1][j].style.backgroundColor && this.board[i+1][j].style.backgroundColor==this.board[i+2][j].style.backgroundColor
						&& this.board[i+2][j].style.backgroundColor==this.board[i+3][j].style.backgroundColor && this.board[i+3][j].style.backgroundColor==this.board[i+4][j].style.backgroundColor){
						num_jewels_destroyed+=5;
						this.board[i][j].style.backgroundColor="";
						this.board[i+1][j].style.backgroundColor="";
						this.board[i+2][j].style.backgroundColor="";
						this.board[i+3][j].style.backgroundColor="";
						this.board[i+4][j].style.backgroundColor="";
					}
					// check if 4 jewels are equal(vertically)
					else if(i <= (this.size-4) && jewel_selected==this.board[i+1][j].style.backgroundColor && this.board[i+1][j].style.backgroundColor==this.board[i+2][j].style.backgroundColor
						&& this.board[i+2][j].style.backgroundColor==this.board[i+3][j].style.backgroundColor){
						num_jewels_destroyed+=4;
						this.board[i][j].style.backgroundColor="";
						this.board[i+1][j].style.backgroundColor="";
						this.board[i+2][j].style.backgroundColor="";
						this.board[i+3][j].style.backgroundColor="";
					}
					// check if 3 jewels are equal(vertically)
					else if(i <= (this.size-3) && jewel_selected==this.board[i+1][j].style.backgroundColor 
						&& this.board[i+1][j].style.backgroundColor==this.board[i+2][j].style.backgroundColor){
						num_jewels_destroyed+=3;
						this.board[i][j].style.backgroundColor="";
						this.board[i+1][j].style.backgroundColor="";
						this.board[i+2][j].style.backgroundColor="";
					}
				}

			}
		}

		//updating the score
		this.score+=this.jewel_value*num_jewels_destroyed;
		return num_jewels_destroyed;		
	}

	//Create new pieces
	createPieces(){
		for(var i=0; i < this.size;i++){
			for(var j=0;j < this.size;j++){				
				//for each piece on top of a cleared piece move it down one position 
				//or create a new one if it is on the first row
				if(this.board[i][j].style.backgroundColor == ""){
					if(i > 0){
						for(var k=i;k >= 0;k--){
							if(k > 0){
								this.board[k][j].style.backgroundColor=this.board[k-1][j].style.backgroundColor;	
							}
							else{
								this.board[k][j].style.backgroundColor=this.jewels[Math.floor(Math.random() * 5)];	
							} 								
						}						
					}
					else{
						this.board[i][j].style.backgroundColor=this.jewels[Math.floor(Math.random() * 5)];
					}
				}
			}
		}
	}

}
