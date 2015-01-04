$(document).on('ready', function() {
	resetQuiz();
	clickButton();
});

var clickButton = function() {
	$("#submit").on("mousedown", function() {
		if (n <= 5) {
			quizQuestion();
			minigame();
			n++;
		} else if (n===6) {
			endQuiz();
			minigame();
			n++;
		} else {
			resetQuiz()
		}
	});
}

// Quiz
var quizQuestion = function() {
	var	z = (n-1),
		q1 = "Question 1",
		q2 = "Question 2",
		q3 = "Question 3",
		q4 = "Question 4",
		q5 = "Question 5",
		questionsArray = [q1, q2, q3, q4, q5];
	updateProgress("Question:", n + " of 5");
	$("#questions").append('<p class="q">' + questionsArray[z] + '</p>');
//	quizOptions();
	quizExamples();
}

var updateProgress = function(head, body) {
	$(".q").remove();
	$("#progressTitle").text(head);
	$("#progressNumber").text(body);
}

var quizExamples = function() {
	$(".exampleImage").remove();
	$("#examples").append('<img src="img/examples/' + n + '.jpg" alt="example ' + n + '" class="exampleImage">');
	console.log("image " + n)
}

var endQuiz = function() {
	if (true) {
		updateProgress("Game over", "You win!");
	} else {
		updateProgress("Game over", "You lose...");
	};
}

// Minigame

var minigame = function() {
	if (true) {
		cardChange("#myCard", correct, "correct");
		correct++;
		incorrect++;
	} else {
		cardChange("#myCard", incorrect, "incorrect");
		incorrect++
	};
	cardChange("#oppCard", opposition, "opponent");
	opposition++
}

var cardChange = function(node, variable, source) {
	if (n > 1) {
		$("#cp" + (n-1)).remove();
		$(node).prepend('<img src="img/' + source + '/' + variable + '.png" alt="' + source + '" class="card">');
	};
}

// Reset Quiz

var resetQuiz = function() {
	n = 1;
	correct = incorrect = opposition = 0;
	mgReset("#myCard");
	mgReset("#oppCard");
	updateProgress("", "")
}

var mgReset = function(node) {
	$(node).children().remove();
	for (var i = 1; i <= 5; i++) {
		$(node).append('<img src="img/ph.png" alt="placeholder" id="cp' + i + '" class="card">');
	};
}