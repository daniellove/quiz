$(document).on('ready', function() {
	clickButton();
});

var	n = 1,
	x = 1,
	y = 1;

var clickButton = function() {
	$("#submit").on("mousedown", function() {
		if (n <= 5) {
			$("#q-no").text("Question " + n + ":");
			$("#p-no").text(n + " of 5");
			myCard();
			n++;
		} else {
			resetQuiz()
		}
	});
}

var myCard = function() {
	if (prompt()) {
		$("#cp" + n).remove();
		$("#myCard").prepend('<img src="img/correct/' + x + '.png" alt="correct" id="cp' + x + '" class="card">')
		x++;
	} else {
		$("#cp" + n).remove();
		$("#myCard").prepend('<img src="img/incorrect/' + y + '.png" alt="incorrect" id="cp' + y + '" class="card">')
		y++;
	}
}

var resetQuiz = function() {
	n=1;
	x=1;
	y=1;

	$("#q-no").text("Questions");
	$("#p-no").text("0 of 5");
	$("#myCard").children().remove();
	for (var i = 1; i <= 5; i++) {
		$("#myCard").append('<img src="img/ph.png" alt="placeholder" id="cp' + i + '" class="card">')
	};
}