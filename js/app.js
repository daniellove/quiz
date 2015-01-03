$(document).on('ready', function() {
	resetQuiz();
	clickButton();
});

var clickButton = function() {
	$("#submit").on("mousedown", function() {
		if (n <= 5) {
			$("#questionNumber").text("Question " + n + ":");
			$("#progressNumber").text(n + " of 5");
			myCard();
			oppCard();
			n++;
		} else {
			resetQuiz()
		}
	});
}

// Quiz



// Minigame

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

var cardChange =function(node, variable, alt) {
	$("#cp" + n).remove();
	$(node).prepend('<img src="img/' + alt + '/' + variable + '.png" alt="' + alt + '" class="card">');
}

// Reset Quiz

var resetQuiz = function() {
	n=1;
	x=1;
	y=1;

	$("#questionNumber").text("Questions");
	$("#progressNumber").text("0 of 5");
	mgReset("#myCard");
	mgReset("#oppCard");
}

var mgReset = function(node) {
	$(node).children().remove();
	for (var i = 1; i <= 5; i++) {
		$(node).append('<img src="img/ph.png" alt="placeholder" id="cp' + i + '" class="card">');
	};
};