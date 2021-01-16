"use strict";

function main() {
	document.getElementById("game").innerHTML = "0 1 2 3 4 5 6 7\n\n"
		+ "! $ + % # @ $ *    0\n"
		+ "! * @ $ # % # !    1\n"
		+ "% + % % ! # $ *    2\n"
		+ "% % $ $ * * @ !    3\n"
		+ "* @ % @ * ! $ $    4\n"
		+ "+ $ @ # % + * #    5\n"
		+ "* % ! * ! @ # $    6\n"
		+ "# ! # @ @ $ ! *    7";

	document.getElementById("score").innerHTML = "Score: 0";

	document.getElementById("instructions").innerHTML = "Enter a position (row, column):";
}

main()
