$(document).on('ready', function() {
var	n = 1,
	x = 1,
	y = 1;

	resetQuiz();
	clickButton();
});

var clickButton = function() {
	$("#submit").on("mousedown", function() {
		if (n <= 5) {
			$("#q-no").text("Question " + n + ":");
			$("#p-no").text(n + " of 5");
			myCard();
			oppCard();
			n++;
		} else {
			resetQuiz()
		}
	});
}

var myCard = function() {
	if (true) {
		cardChange("#myCard", x, "correct");
		x++;
	} else {
		cardChange("#myCard", y, "incorrect");
		y++
	}
}

var oppCard = function() {
	cardChange("#oppCard", n, "opponent");
}

function cardChange (node, variable, alt) {
	$("#cp" + n).remove();
	$(node).prepend('<img src="img/' + alt + '/' + variable + '.png" alt="' + alt + '" class="card">');
}

var resetQuiz = function() {
	n=1;
	x=1;
	y=1;

	$("#q-no").text("Questions");
	$("#p-no").text("0 of 5");
	cardReset("#myCard");
	cardReset("#oppCard");
}

var cardReset = function(node) {
	$(node).children().remove();
	for (var i = 1; i <= 5; i++) {
		$(node).append('<img src="img/ph.png" alt="placeholder" id="cp' + i + '" class="card">');
	};
};