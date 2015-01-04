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
		q1 = "Question 1"
		q2 = "Question 2",
		q3 = "Question 3",
		q4 = "Question 4",
		q5 = "Question 5",
		questionArray = [q1, q2, q3, q4, q5];
	updateProgress("Question:", n + " of 5");
	$("#questions").append('<p class="q">' + questionArray[z] + '</p>');
	quizOptions();
	quizExamples();
}

var quizOptions = function() {
	clearOptions();
	optionsSelector();	
	var optionArray = [a, b, c, d];
	for (var i = 1; i <= 4; i++) {
		$("#options").append('<div><input type="radio" name="radio' + i + '" id="radio' + i + '" class="radio"/><label for="radio' + i + '">' + optionArray[(i-1)] + '</label></div>');
	};
}

var optionsSelector = function() {
	if (n===1) {
		a = "1a";
		b = "1b";
		c = "1c";
		d = "1d";
	}else if (n===2) {
		a = "2a";
		b = "2b";
		c = "2c";
		d = "2d";
	}else if (n===3) {
		a = "3a";
		b = "3b";
		c = "3c";
		d = "3d";
	}else if (n===4) {
		a = "4a";
		b = "4b";
		c = "4c";
		d = "4d";
	}else if (n===5) {
		a = "5a";
		b = "5b";
		c = "5c";
		d = "5d";
	}
}

var quizExamples = function() {
	clearImage();
	$("#examples").append('<img src="img/examples/' + n + '.jpg" alt="example ' + n + '" class="exampleImage">');
}

var endQuiz = function() {
	clearOptions();
	clearImage();
	if (true) {
		updateProgress("Game over", "You win!");
	} else {
		updateProgress("Game over", "You lose...");
	};
}

var clearOptions = function() {
	$("#options").children().remove();
}

var clearImage = function() {
	$(".exampleImage").remove();
}

var updateProgress = function(head, body) {
	$(".q").remove();
	$("#progressTitle").text(head);
	$("#progressNumber").text(body);
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