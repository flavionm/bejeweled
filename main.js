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
var timer = 2000;

var div, hide

// Initialize game elements.
function start() {
    const grid = document.querySelector('.grid')
    board = new Board(size, grid);
    document.getElementById("score").innerHTML = board.score;
    div = document.getElementById("drag");
    div.addEventListener("dragover", function(e) {
        e.preventDefault();
    });
    div.addEventListener("drop", dropThrough);
    hide = document.getElementById("hide")
    //document.getElementById("row").setAttribute("max", size - 1);
    //document.getElementById("column").setAttribute("max", size - 1);
}

function dragStart(event) {
    colorBeingDragged = this.style.backgroundColor;
    this.style.backgroundColor = "white";
    jewelIdBeingDragged = parseInt(this.id);
    div.style.backgroundColor = colorBeingDragged;
    hide.style.visibility = "visible";
    event.dataTransfer.setDragImage(hide, 5000, 5000);
}

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
    // var div = document.getElementById("drag");
    div.style.top = 0;
    div.style.left = 0;
    div.style.visibility = "hidden";
    hide.style.visibility = "hidden";

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

function dropThrough(e) {
    var x = e.pageX;
    var y = e.pageY;

    this.style.visibility = "hidden";

    var divBelow = document.elementFromPoint(x, y);
    divBelow.dispatchEvent(new DragEvent('drop', {}));
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
