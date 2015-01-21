$(document).on('ready', function() {
	resetQuiz();
	initiateQuiz();
});

function resetQuiz() {
	// Update visible elements
	updateNode(".instruction", "Click the chips to face your opponent!");
	updateNode("#userFinal", "You");
	updateNode("#opponentFinal", "Opponent");
	newHand("#myCard");
	newHand("#oppCard");
	updateProgress("", "");
	clearOldQuestion();

	// Reset global variables
	new questionArray;
	phase = 1,
	correct = incorrect = opposition = 0;

	// Deals a new hand for the selected player
	function newHand(player) {
		$(player).children().remove();
		for (var i = 1; i <= 5; i++) {
			$(player).append('<img src="img/ph.png" alt="placeholder" class="card">');
		};
	}
}

// Work through quiz phases
function initiateQuiz() {
	$("#submit").on("mousedown", function() {
		if (phase <= 5) {
			if (phase===1) {
				nextQuestion();
			} else if (validateAnswer()) {
				acceptAnswer();
				nextQuestion();
			} else {
				noAnswer();
			}
		} else if (phase===6) {
			if (validateAnswer()) {
				acceptAnswer();
				endQuiz();
				phase++;
			} else {
				noAnswer();
			}
		} else {
			resetQuiz()
		}
	});
}


function nextQuestion() {
	// Set up for current question
	clearOldQuestion();
	updateMinigame();
	updateProgress("Question:", phase + " of 5");

	// Randomly select an item from the bank
	var index = Math.floor(Math.random()*questionBank.length),
		// Get selected question info from the bank
		qText = questionBank[index].question,
		qOptions = questionBank[index].possibleOptions,
		qImage = questionBank[index].image;

	// Add question
	updateNode(".question", qText)
	// Append options
	for (var option = 1; option <= 4; option++) {
		$("#options").append('<div><input type="radio" name="radio" id="radio' + option + '" class="radio" value="' + qOptions[option-1].val + '"/><label for="radio' + option + '">' + qOptions[option-1].text + '</label></div>');
	};
	// Append example image
	$("#examples").append('<img src="img/examples/' + qImage + '.jpg" alt="example ' + qImage + '" class="exampleImage">');

	// Remove selected question from the bank
	questionBank.splice(index, 1);
	
	// Prepare for next phase
	phase++;
}

// Answer validation functions
function validateAnswer() {
	chosenOption = $(".radio[type=radio]:checked").val();
	if(typeof chosenOption != "undefined") {
		return true;
	} else {
		return false;
	}
}

function acceptAnswer() {
	$(".instruction").removeClass("warning")
	updateNode(".instruction", "Click the chips to submit your answer");
}

function noAnswer() {
	$(".instruction").addClass("warning");
	updateNode(".instruction", "Please select an option before clicking then chips");
}

// Minigame functions
function updateMinigame() {
	if (phase>1) {
		if (chosenOption>0) {
			correct++;
			cardFlip("#myCard", correct, "correct");
		} else {
			incorrect++
			cardFlip("#myCard", incorrect, "incorrect");
		};
		opposition++
		cardFlip("#oppCard", opposition, "opponent");
	}
}

function cardFlip(node, variable, source) {
	$(node).children().last().remove();
	$(node).prepend('<img src="img/' + source + '/' + variable + '.png" alt="' + source + '" class="card">');
}

// General functions
function updateNode(node, text) {
	$(node).text(text);
}

function updateProgress(head, body) {
	updateNode("#progressTitle", head);
	updateNode("#progressBody", body);
}

function clearOldQuestion() {
	$(".question").text("");
	$("#options").children().remove();
	$(".exampleImage").remove();
}

// Final phase of the quiz
function endQuiz() {
	clearOldQuestion()
	updateMinigame();

	// Print the users final hand
	var userPossibleHands = [
		"10 high",
		"Ace high",
		"Ace pair & 10 high",
		"Ace pair & King high",
		"Two pair",
		"Full house!"
	]
	updateNode("#userFinal", "You: " + userPossibleHands[correct])

	// Print the oppositions final hand
	// including their next highest card for a close game
	if (correct === 2 || correct === 3) {
		updateNode("#opponentFinal", "Opponent: Ace pair & Queen high");
	} else {
		updateNode("#opponentFinal", "Opponent: Pair");
	}

	// Update the progress section with the simplified final result
	if (correct>=3) {
		updateProgress("Game over", "You win!");
	} else {
		updateProgress("Game over", "You lose");
	}

	// Print the users detailed final result
	var possibleOutcomes = [
		"0 correct. No time for excuses - just learn from it and try again!",
		"I guess you were the sucker this time with only got 1 of 5 correct. Give it another go!",
		"You almost beat them with 2 of 5. You'll get it next time!",
		"You won by a hair with 3 of 5. Double or nothing - beat your score!",
		"Wow you cleaned out the house with 4 of 5 correct",
		"Winner winner chicken dinner! You got all 5 correct!",
	]
	updateNode(".question", possibleOutcomes[correct]);

	// Ask user to play again
	updateNode(".instruction", "Click the chips to play again!");
}

