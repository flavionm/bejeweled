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
var timer = 400;


// Initialize game elements.
function start() {
    const grid = document.querySelector('.grid')
    board = new Board(size, grid);
    document.getElementById("score").innerHTML = board.score;
    //document.getElementById("row").setAttribute("max", size - 1);
    //document.getElementById("column").setAttribute("max", size - 1);
}

function dragStart() {
    colorBeingDragged = this.style.backgroundColor
    jewelIdBeingDragged = parseInt(this.id)
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave() {
    this.style.backgroundColor = ''
}

function dragDrop() {
    colorBeingReplaced = this.style.backgroundColor
    jewelIdBeingReplaced = parseInt(this.id)
    this.style.backgroundColor = colorBeingDragged
    board.changeBackColor(jewelIdBeingDragged, colorBeingReplaced)
}

function dragEnd() {

    var validMoves = [jewelIdBeingDragged - 1, jewelIdBeingDragged - size, jewelIdBeingDragged + 1, jewelIdBeingDragged + size]
    var validMove = validMoves.includes(jewelIdBeingReplaced)

    //checking for a valid move
    if (jewelIdBeingReplaced && validMove) {
        piece_destr = true;
    } else if (jewelIdBeingReplaced && !validMove) {
        board.changeBackColor(jewelIdBeingReplaced, colorBeingReplaced)
        board.changeBackColor(jewelIdBeingDragged, colorBeingDragged)
    } else board.changeBackColor(jewelIdBeingDragged, colorBeingDragged)
}

function checkBoard() {

    var points = board.checkMove();
    //checking if move destroyed any pieces
    if (points > 0 && piece_destr) {
        piece_destr = false;
    }
    else if (jewelIdBeingReplaced != null && jewelIdBeingDragged != null && piece_destr) {
        board.changeBackColor(jewelIdBeingReplaced, colorBeingReplaced)
        board.changeBackColor(jewelIdBeingDragged, colorBeingDragged)
    }
}

function createPieces() {
    board.createPieces();
}

function updateScore() {
    document.getElementById("score").innerHTML = board.score;
}

window.setInterval(function () {
    checkBoard();
    createPieces();
    updateScore();
}, timer);
