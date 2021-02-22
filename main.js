"use strict";

var board;
const size = 8;

var colorBeingDragged = null;
var colorBeingReplaced = null;
var jewelIdBeingDragged = null;
var jewelIdBeingReplaced = null;

//flag to check if a valid moved destroyed any pieces
var piece_destr = false;
//timer of setInterval
var timer = 600;

//flag to block dragging while the pieces are falling
var block_drag = true;

var div, hide

// Initialize game elements.
function start() {
    const grid = document.querySelector('.grid')
    board = new Board(size, grid);
    div = document.getElementById("drag");
    div.addEventListener("dragover", function(e) {
        e.preventDefault();
    });
    div.addEventListener("drop", dropThrough);
    hide = document.getElementById("hide")
}

//creates opaque block to drag
function dragStart(event) {
    if (block_drag) {
        colorBeingDragged = this.style.backgroundColor;
        this.style.backgroundColor = "white";
        jewelIdBeingDragged = parseInt(this.id);
        div.style.backgroundColor = colorBeingDragged;
        hide.style.visibility = "visible";
        event.dataTransfer.setDragImage(hide, 5000, 5000);
    } else {
        event.preventDefault();
    }
}

//moves opaque block along with the cursor
function dragOver(e) {
    e.preventDefault();
    var x = e.pageX;
    var y = e.pageY;
    div = document.getElementById("drag");
    div.style.visibility = "visible";
    div.style.top = y - 35 + 'px';
    div.style.left = x - 35 + 'px';
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave(e) {
    e.preventDefault()
}

//switch colors between the dragged block and the block being dropped into
function dragDrop() {
    colorBeingReplaced = this.style.backgroundColor
    jewelIdBeingReplaced = parseInt(this.id)
    this.style.backgroundColor = colorBeingDragged
    board.changeBackColor(jewelIdBeingDragged, colorBeingReplaced)
}

function dragEnd() {
    //resets opaque block
    div.style.top = 0;
    div.style.left = 0;
    div.style.visibility = "hidden";
    hide.style.visibility = "hidden";

    var validMoves = [jewelIdBeingDragged - 1, jewelIdBeingDragged - size, jewelIdBeingDragged + 1, jewelIdBeingDragged + size]
    var validMove = validMoves.includes(jewelIdBeingReplaced)

    //checking for a valid move
    if (jewelIdBeingReplaced && validMove) {
        piece_destr = true;
        checkBoard();
    } else if (jewelIdBeingReplaced && !validMove) {
        board.changeBackColor(jewelIdBeingReplaced, colorBeingReplaced)
        board.changeBackColor(jewelIdBeingDragged, colorBeingDragged)
    } else board.changeBackColor(jewelIdBeingDragged, colorBeingDragged)
}

//makes sure the block drops on the grid
function dropThrough(e) {
    var x = e.pageX;
    var y = e.pageY;

    this.style.visibility = "hidden";

    var divBelow = document.elementFromPoint(x, y);
    divBelow.dispatchEvent(new DragEvent('drop', {}));
}

//checks if there are any lines of the same color, and eliminates them after a delay
function checkBoard() {

    var points = board.checkMove();
    //checking if move destroyed any pieces
    if (points > 0) {
        piece_destr = false;
        block_drag = false;
        setTimeout(function() {
            createPieces();
            updateScore();
        }, timer);
    }
    else if (jewelIdBeingReplaced != null && jewelIdBeingDragged != null && piece_destr) {
        board.changeBackColor(jewelIdBeingReplaced, colorBeingReplaced)
        board.changeBackColor(jewelIdBeingDragged, colorBeingDragged)
    }
    if (points == 0) {
        block_drag = true;
    }
}

//creates the new pieces
function createPieces() {
    board.createPieces();
}

//formats and updates the game score
function updateScore() {
    document.getElementById("score").innerHTML = ("000" + board.score).slice(-4);
    setTimeout(function() {
        checkBoard();
    }, timer)
}
