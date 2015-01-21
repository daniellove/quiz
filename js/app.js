$(document).on('ready', function() {
	resetQuiz();
	initiateQuiz();
});

var questionArray = [
	{	question: "In Five Card Poker would a Royal Flush beat 4 Aces?",
		possibleOptions: [{text: "Yes", val: 0},{text: "No", val: 0}, {text: "They would draw", val: 0}, {text: "Those two hands can't happen together", val: 1}]
	},
	{	question: "In Blackjack what's the term used if a player scores over 21?",
		possibleOptions: [{text: "Blackjack", val: 0},{text: "Hit", val: 0}, {text: "Bust", val: 1}, {text: "Full House", val: 0}]
	},
	{	question: "What is the term used when two ones are rolled in Casino Craps?",
		possibleOptions: [{text: "Rat Eyes", val: 0},{text: "Snake Eyes", val: 1}, {text: "Ace Deuce", val: 0}, {text: "Double Ones", val: 0}]
	},
	{	question:  "In Texas Hold'em what are your two starting cards called?",
		possibleOptions: [{text: "Box cards", val: 0},{text: "House cards", val: 0}, {text: "Hole cards", val: 1}, {text: "River cards", val: 0}]
	},
	{	question: "In Roulette what is NOT a betting option",
		possibleOptions: [{text: "White", val: 1},{text: "Black", val: 0}, {text: "1st 12", val: 0}, {text: "19 to 36", val: 0}]
	}
];

var resetQuiz = function() {
	// Global variables
	phase = correct = incorrect = opposition = 1;

	updateNode(".instruction", "Click the chips to face your opponent!");
	updateNode("#userFinal", "You");
	updateNode("#opponentFinal", "Opponent");
	minigameReset("#myCard");
	minigameReset("#oppCard");
	updateProgress("", "");
	clearQuestion();
}
	
	var updateNode = function(node, text) {
		$(node).text(text);
	}

	var minigameReset = function(node) {
		$(node).children().remove();
		for (var i = 1; i <= 5; i++) {
			$(node).append('<img src="img/ph.png" alt="placeholder" class="card">');
		};
	}

	var updateProgress = function(head, body) {
		$("#progressTitle").text(head);
		$("#progressBody").text(body);
	}

	var clearQuestion = function() {
		$(".q").remove();
		$("#options").children().remove();
		$(".exampleImage").remove();
	}

// Work through quiz phases
var initiateQuiz = function() {
	$("#submit").on("mousedown", function() {
		if (phase===1) {
			startQuiz();
		} else if (phase <= 5) {
			if (validateAnswer()) {
				nextPhase();
			} else {
				noAnswer();
			}
		} else if (phase===6) {
			if (validateAnswer()) {
				finalPhase();
			} else {
				noAnswer();
			}
		} else {
			resetQuiz()
		}
	});
}
	
	// 2.1: Enter the first phase of the quiz
	var startQuiz = function() {
		// Refer 2.1.1
		resestInstruction();
		// Refer 2.1.2
		nextQuestion();
		phase++;
	}

		// 2.1.1: Remove warning and/or update instructions
		var resestInstruction = function() {
			$(".instruction").removeClass("warning")
			// Refer 1.1
			updateNode(".instruction", "Click the chips to submit your answer");
		}

			// 2.1.2.1: Set the question for the current phase
			var nextQuestion = function() {
				var i = Math.floor(Math.random()*4),
					qText = questionArray[i].question,
					qOptions = questionArray[i].possibleOptions;

				clearQuestion();
				selectQuestion(qText);
				for (var option = 1; option <= 4; option++) {
					$("#options").append('<div><input type="radio" name="radio" id="radio' + option + '" class="radio" value="' + qOptions[option-1].val + '"/><label for="radio' + option + '">' + qOptions[option-1].text + '</label></div>');
				};
				$("#examples").append('<img src="img/examples/' + (i+1) + '.jpg" alt="example ' + (i+1) + '" class="exampleImage">');

				updateProgress("Question:", phase + " of 5");
			}

			var selectQuestion = function(qText) {
				$("#questions").prepend('<h3 class="q">' + qText + '</h3>');
			}


	// 2.2: Check if an answer was selected
	var validateAnswer = function() {
		chosenOption = $(".radio[type=radio]:checked").val();
		if(typeof chosenOption != "undefined") {
			return true;
		} else {
			return false;
		}
	}

	// 2.3: Enter next phase
	var nextPhase = function() {
		// Refer 2.1.1
		resestInstruction();
		// Refer 2.1.2
		nextQuestion();
		// Refer 2.3.1
		updateMinigame();
		phase++;
	}
		// 2.3.1: Update hands based on result from previous phase
		var updateMinigame = function() {
			if (phase>1) {
				if (chosenOption>0) {
					// Refer 2.3.1.1
					// Note: If correct flip a good card
					cardFlip("#myCard", correct, "correct");
					correct++;
				} else {
					// Refer 2.3.1.1
					// Note: If incorrect flip a dud card
					cardFlip("#myCard", incorrect, "incorrect");
					incorrect++
				};
				// Refer 2.3.1.1
				// Note: Flip opponents card
				cardFlip("#oppCard", opposition, "opponent");
				opposition++
			}
		}
			// 2.3.1.1: Flip a card
			var cardFlip = function(node, variable, source) {
				if (phase > 1) {
					$(node).children().last().remove();
					$(node).prepend('<img src="img/' + source + '/' + variable + '.png" alt="' + source + '" class="card">');
				};
			}

	// 2.4: Provide warning if validation failed
	var noAnswer = function() {
		$(".instruction").addClass("warning");
		// Refer 1.1
		updateNode(".instruction", "Please select an option before clicking then chips");
	}

	// 2.5: Enter final phase
	var finalPhase = function() {
		// Refer 2.1.1
		resestInstruction();
		// Refer 2.3.1
		updateMinigame();
		// Refer 2.5.1
		endQuiz();
		phase++;
	}

			// 2.5.1.1: Provide final result for minigame
			// Note: Variable 'correct' starts at 1 so variable 'i' has been used to offset this
			var endQuiz = function() {
				i = (correct-1);
				compareCards();
				winLose();
				questionFeedback();
				
			}

				// 2.5.1.1.1: Identify best cards in hands
				// Note: Final hand is published based on number of correct answers
				var compareCards = function() {
					//Refer 1.1
					if (i===5) {
						updateNode("#userFinal", "You: Full house!");
					} else if (i===4){
						updateNode("#userFinal", "You: Two pair");
					} else if (i===3) {
						updateNode("#userFinal", "You: Ace pair & King high");
					} else if (i===2) {
						updateNode("#userFinal", "You: Ace pair & 10 high");
					} else if (i===1) {
						updateNode("#userFinal", "You: Ace high");
					} else {
						updateNode("#userFinal", "You: 10 high");
					}

					if (i === 2 || i === 3) {
						updateNode("#opponentFinal", "Opponent: Ace pair & Queen high");
					} else {
						updateNode("#opponentFinal", "Opponent: Pair");
					}

				}

				// 2.5.1.1.2: Feedback on whether the user won or lost
				// Note: User requires 3 or more correct answers to win minigame
				var winLose = function() {
					// Refer 1.3
					if (i>=3) {
						updateProgress("Game over", "You win!");
					} else {
						updateProgress("Game over", "You lose");
					}
				}

				// 2.5.1.1.3: Provide detailed feedback in #questions section
				var questionFeedback = function() {
					// Refer 1.4
					clearQuestion();
					// Refer 2.1
					updateNode(".instruction", "Click the chips to play again!");
					// Refer 2.1.2.1.1
					if (i===5) {
						selectQuestion("Winner winner chicken dinner! You got all 5 correct!");
					} else if (i===4) {
						selectQuestion("Wow you cleaned out the house with 4 of 5 correct");
					} else if (i===3) {
						selectQuestion("You won by a hair with 3 of 5. Double or nothing - beat your score!");
					} else if (i===2) {
						selectQuestion("You almost beat them with 2 of 5. You'll get it next time!");
					} else if (i===1) {
						selectQuestion("I guess you were the sucker this time with only got 1 of 5 correct. Give it another go!");
					} else {
						selectQuestion("0 correct. No time for excuses - just learn from it and try again!");
					}
				}