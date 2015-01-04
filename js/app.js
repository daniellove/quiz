$(document).on('ready', function() {
	resetQuiz();
	clickButton();
});

var resetQuiz = function() {
	// Phase counter
	n = 1;
	// Counters for minigame
	correct = incorrect = opposition = 1;
	// Deal to user
	minigameReset("#myCard");
	// Deal to opposition
	minigameReset("#oppCard");
	// Reset quiz progress
	updateProgress("", "")
}

var minigameReset = function(node) {
	// Remove all cards
	$(node).children().remove();
	// Add 5 face down cards
	for (var i = 1; i <= 5; i++) {
		$(node).append('<img src="img/ph.png" alt="placeholder" class="card">');
	};
}


var clickButton = function() {
	$("#submit").on("mousedown", function() {
		// For phases 1 to 5...
		if (n <= 5) {
			// Set up for current phase
			nextQuestion();
			// Update the minigame
			minigame();
			// Ready for next phase
			n++;
		// For phase 6...
		} else if (n===6) {
			// Clear the quiz
			endQuiz();
			// Provide minigame result
			minigame();
			// Ready to reset quiz
			n++;
		} else {
			resetQuiz()
		}
	});
}

var nextQuestion = function() {
	// Add appropriate question
	quizQuestions();
	// Add appropriate options
	quizOptions();
	// Add appropriate example image
	quizExamples();
	// Update the user on their progress through the quiz
	updateProgress("Question:", n + " of 5");
}

// Question selector
var quizQuestions = function() {
	// Clear question from previous phase
	clearQuestion();
	// Set questions to be used in array
	q1 = "Question 1";
	q2 = "Question 2";
	q3 = "Question 3";
	q4 = "Question 4";
	q5 = "Question 5";
	// Append question for current phase
	questionArray = [q1, q2, q3, q4, q5];
	$("#questions").append('<p class="q">' + questionArray[(n-1)] + '</p>');
}

// Options selector
var quizOptions = function() {
	// Clear options from previous phase
	clearOptions();
	// Select appropriate set of options for current phase
	optionsSelector();	
	// Append options for current phase
	var optionArray = [a, b, c, d];
	for (var i = 1; i <= 4; i++) {
		$("#options").append('<div><input type="radio" name="radio' + i + '" id="radio' + i + '" class="radio"/><label for="radio' + i + '">' + optionArray[(i-1)] + '</label></div>');
	};
}

// Example image selector
var quizExamples = function() {
	// Clear image from previous phase
	clearImage();
	// Append image for current phase
	$("#examples").append('<img src="img/examples/' + n + '.jpg" alt="example ' + n + '" class="exampleImage">');
}

var endQuiz = function() {
	// Remove final question, options and example image
	clearQuestion();
	clearOptions();
	clearImage();
	// Provide final result for minigame
	// User requires 3 or more correct answers to beat the opposition
	if (incorrect > 2) {
		updateProgress("Game over", "You lose...");
	} else {
		updateProgress("Game over", "You win!");
	};
}

var clearQuestion = function() {
	$(".q").remove();
}

var clearOptions = function() {
	$("#options").children().remove();
}

var clearImage = function() {
	$(".exampleImage").remove();
}

var updateProgress = function(head, body) {
	$("#progressTitle").text(head);
	$("#progressBody").text(body);
}

// Set options based on phase
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

var minigame = function() {
	if (n>1) {
		// If the correct answer was selected...
		if (true) {
			// Flip a good card
			cardFlip("#myCard", correct, "correct");
			// Set up for next correct answer
			correct++;
		} else {
			// Flip a dud card
			cardFlip("#myCard", incorrect, "incorrect");
			// Set up for next incorrect answer
			incorrect++
		};
		// Flip opposition card
		// Opposition always has the same 5 cards
		cardFlip("#oppCard", opposition, "opponent");
		// Set up for oppositions next card
		opposition++
	}
}

var cardFlip = function(node, variable, source) {
	if (n > 1) {
		// Remove the last face down card
		$(node).children().last().remove();
		// Prepend a face up card
		$(node).prepend('<img src="img/' + source + '/' + variable + '.png" alt="' + source + '" class="card">');
	};
}