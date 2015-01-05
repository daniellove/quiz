$(document).on('ready', function() {
	resetQuiz();
	clickButton();
});

var resetQuiz = function() {
	// Phase counter
	n = 1;
	// Counters for minigame
	correct = incorrect = opposition = 1;
	// Deal user cards
	minigameReset("#myCard");
	// Deal opposition cards
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

// Behaviour for each phase of the quiz
var clickButton = function() {
	$("#submit").on("mousedown", function() {
		if (n <= 5) {
			updateMinigame();
			nextQuestion();
			n++;
		} else if (n===6) {
			updateMinigame();
			endQuiz();
			n++;
		} else {
			resetQuiz()
		}
	});
}

// Add appropriate question, options and example image
// then update the user on their progress
var nextQuestion = function() {
	quizQuestions();
	quizOptions();
	quizExamples();
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
		$("#options").append('<div><input type="radio" name="radio" id="radio' + i + '" class="radio" value="0"/><label for="radio' + i + '">' + optionArray[(i-1)] + '</label></div>');
	};
	// Add a value to the correct answer for current phase
	correctAnswer();
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
// Show final hand
	clearQuestion();
	clearOptions();
	clearImage();
	selectResult();
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
//Update each node in #progress
	$("#progressTitle").text(head);
	$("#progressBody").text(body);
}

var optionsSelector = function() {
// Set options based on phase
	if (n===1) {
		a = "1a";
		b = "1b";
		c = "1c";
		d = "1d";
	} else if (n===2) {
		a = "2a";
		b = "2b";
		c = "2c";
		d = "2d";
	} else if (n===3) {
		a = "3a";
		b = "3b";
		c = "3c";
		d = "3d";
	} else if (n===4) {
		a = "4a";
		b = "4b";
		c = "4c";
		d = "4d";
	} else if (n===5) {
		a = "5a";
		b = "5b";
		c = "5c";
		d = "5d";
	}
}

var correctAnswer = function() {
// Set correct option based on phase
// 'i' is the correct option for each phase
	if (n===1) {
		i = 3;
	} else if (n===2) {
		i = 1;
	} else if (n===3) {
		i = 4;
	} else if (n===4) {
		i = 3;
	} else if (n===5) {
		i = 2;
	}
	$("#radio" + i).val(1);
}

var selectResult = function() {
// Provide final result for minigame depending on number of correct answers
// Note: correct variable starts at 1 so correct answers, 'i', is correct variable less 1
// User requires 3 or more correct answers to validate a 
	i = (correct-1);
	if (i===5) {
		updateProgress("Game over", "Full House!");
	} else if (i===4){
		updateProgress("Game over", "Two Pair");
	} else if (i===3) {
		updateProgress("Game over", "Ace pair & king high");
	} else if (i===2) {
		updateProgress("Game over", "Ace pair");
	} else if (i===1) {
		updateProgress("Game over", "Ace high")
	} else {
		updateProgress("Game over", "10 high")
	}
}

var updateMinigame = function() {
// Flip a good card when the correct answer is chosen
// else flip a dud card
// 'variable++' adds 1 to the users correct/incorrect score
// and/or gets the next flip card ready
	if (n>1) {
	chosenOption = $(".radio[type=radio]:checked").val();
		if (chosenOption>0) {
			cardFlip("#myCard", correct, "correct");
			correct++;
		} else {
			cardFlip("#myCard", incorrect, "incorrect");
			incorrect++
		};
		cardFlip("#oppCard", opposition, "opponent");
		opposition++
	}
}

var cardFlip = function(node, variable, source) {
// Remove the last face down card
// and add a face up card
	if (n > 1) {
		$(node).children().last().remove();
		$(node).prepend('<img src="img/' + source + '/' + variable + '.png" alt="' + source + '" class="card">');
	};
}