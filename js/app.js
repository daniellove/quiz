$(document).on('ready', function() {
	resetQuiz();
	clickButton();
});

var resetQuiz = function() {
// Reset counters,
// deal cards
// amd clear #progress
	n = correct = incorrect = opposition = 1;
	updateNode("#instruction", "Click the chips to begin!");
	updateNode("#userFinal", "You");
	updateNode("#opponentFinal", "Opponent");
	minigameReset("#myCard");
	minigameReset("#oppCard");
	updateProgress("", "")
}

var minigameReset = function(node) {
// Remove all cards
// and add 5 face down cards
	$(node).children().remove();
	for (var i = 1; i <= 5; i++) {
		$(node).append('<img src="img/ph.png" alt="placeholder" class="card">');
	};
}

var clickButton = function() {
// Behaviour for each phase of the quiz
	$("#submit").on("mousedown", function() {
		if (n===1) {
			resestInstruction();
			nextQuestion();
			n++;
		} else if (n===6) {
			if (validateAnswer()) {
				resestInstruction();
				updateMinigame();
				endQuiz();
				n++;
			} else {
				noOptionSelected();
			};
		} else if (n <= 5) {
			if (validateAnswer()) {
				resestInstruction();
				updateMinigame();
				nextQuestion();
				n++;
			} else {
				noOptionSelected();
			};
		} else {
			resetQuiz()
		}
	});
}

var validateAnswer = function() {
// If chosenOption is defined then continue
	chosenOption = $(".radio[type=radio]:checked").val();
	if(typeof chosenOption != "undefined") {
		return true;
	} else {
		return false;
	}
}

var noOptionSelected = function() {
	$("#instruction").addClass("warning");
	updateNode("#instruction", "Please select an option before clicking then chips");
}

var nextQuestion = function() {
// Add appropriate question, options and example image
// then update the user on their progress
	quizQuestions();
	quizOptions();
	quizExamples();
	updateProgress("Question:", n + " of 5");
}

var quizQuestions = function() {
// Clear question from previous phase.
// Set the questions to be used in array
// and append the appropriate question for the current phase
	clearQuestion();
	q1 = "Question 1";
	q2 = "Question 2";
	q3 = "Question 3";
	q4 = "Question 4";
	q5 = "Question 5";
	questionArray = [q1, q2, q3, q4, q5];
	$("#questions").append('<p class="q">' + questionArray[(n-1)] + '</p>');
}

// Options selector
var quizOptions = function() {
// Clear options from previous phase.
// Select appropriate set of options for current phase
// then append these options
// and add a value to the correct answer
	clearOptions();
	optionsSelector();	
	var optionArray = [a, b, c, d];
	for (var i = 1; i <= 4; i++) {
		$("#options").append('<div><input type="radio" name="radio" id="radio' + i + '" class="radio" value="0"/><label for="radio' + i + '">' + optionArray[(i-1)] + '</label></div>');
	};
	correctAnswer();
}

var quizExamples = function() {
// Clear the image from previous phase
// then append the image for the current phase
	clearImage();
	$("#examples").append('<img src="img/examples/' + n + '.jpg" alt="example ' + n + '" class="exampleImage">');
}

var endQuiz = function() {
// Remove final question, options and example image
// Show final hand
	updateNode("#instruction", "Click the chips to play again!")
	clearQuestion();
	clearOptions();
	clearImage();
	finalResult();
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

var updateNode = function(node, text) {
	$(node).text(text);
}

var resestInstruction = function() {
	$("#instruction").removeClass("warning")
	updateNode("#instruction", "Click the chips to submit your answer");
}

var updateProgress = function(head, body) {
//Update each node in #progress
	$("#progressTitle").text(head);
	$("#progressBody").text(body);
}

var optionsSelector = function() {
// Set options based on phase
	if (n===1) {
		a = "incorrect";
		b = "incorrect";
		c = "correct";
		d = "incorrect";
	} else if (n===2) {
		a = "correct";
		b = "incorrect";
		c = "incorrect";
		d = "incorrect";
	} else if (n===3) {
		a = "incorrect";
		b = "incorrect";
		c = "incorrect";
		d = "correct";
	} else if (n===4) {
		a = "incorrect";
		b = "incorrect";
		c = "correct";
		d = "incorrect";
	} else if (n===5) {
		a = "incorrect";
		b = "correct";
		c = "incorrect";
		d = "incorrect";
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

var finalResult = function() {
// Provide final result for minigame depending on number of correct answers
// Final hand published
// Note: correct variable starts at 1 so correct answers, 'i', is correct variable less 1
// Note: User requires 3 or more correct answers to win
	i = (correct-1);
	if (i>=3) {
		updateProgress("Game over", "You win!")
	} else {
		updateProgress("Game over", "You lose")
	};
	if (i===5) {
		updateNode("#userFinal", "You: Full house!");
	} else if (i===4){
		updateNode("#userFinal", "You: Two pair");
	} else if (i===3) {
		updateNode("#userFinal", "You: Ace pair & King high");
	} else if (i===2) {
		updateNode("#userFinal", "You: Ace pair");
	} else if (i===1) {
		updateNode("#userFinal", "You: Ace high")
	} else {
		updateNode("#userFinal", "You: 10 high")
	};
	updateNode("#opponentFinal", "Opponent: Ace pair & Queen high");
}

var updateMinigame = function() {
// Flip a good card when the correct answer is chosen
// else flip a dud card
// 'variable++' adds 1 to the users correct/incorrect score
// and/or gets the next flip card ready
	if (n>1) {
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