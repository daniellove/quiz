$(document).on('ready', function() {
	// Refer 1
	resetQuiz();
	// Refer 2
	clickButton();
});

// 1: Reset the quiz
var resetQuiz = function() {
	n = correct = incorrect = opposition = 1;
	// Refer 1.1
	updateNode(".instruction", "Click the chips to face your opponent!");
	updateNode("#userFinal", "You");
	updateNode("#opponentFinal", "Opponent");
	// Refer 1.2
	minigameReset("#myCard");
	minigameReset("#oppCard");
	// Refer 1.3
	updateProgress("", "")
	// Refer 1.4
	clearQuestion();
}
	// 1.1: Update the text inside the given node
	var updateNode = function(node, text) {
		$(node).text(text);
	}

	// 1.2: Reset the minigame
	var minigameReset = function(node) {
		$(node).children().remove();
		for (var i = 1; i <= 5; i++) {
			$(node).append('<img src="img/ph.png" alt="placeholder" class="card">');
		};
	}

	// 1.3: Update the progress div
	var updateProgress = function(head, body) {
		$("#progressTitle").text(head);
		$("#progressBody").text(body);
	}

	// 1.4: Clear question set previous phase
	var clearQuestion = function() {
		$(".q").remove();
	}

// 2: Work through quiz phases
var clickButton = function() {
	$("#submit").on("mousedown", function() {
		if (n===1) {
			// Refer 2.1
			startQuiz();
		} else if (n <= 5) {
			if (// Refer 2.2
			validateAnswer()) {
				// Refer 2.3
				nextPhase();
			} else {
				// Refer 2.4
				noAnswer();
			}
		} else if (n===6) {
			if (// Refer 2.2
			validateAnswer()) {
				// Refer 2.5
				finalPhase();
			} else {
				//Refer 2.4
				noAnswer();
			}
		} else {
			// Refer 2.6
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
		n++;
	}

		// 2.1.1: Remove warning and/or update instructions
		var resestInstruction = function() {
			$(".instruction").removeClass("warning")
			// Refer 1.1
			updateNode(".instruction", "Click the chips to submit your answer");
		}

		// 2.1.2: Set up for current question
		var nextQuestion = function() {
			// Refer 2.1.2.1
			quizQuestions();
			// Refer 2.1.2.2
			quizOptions();
			// Refer 2.1.2.3
			quizExamples();
			// Refer 1.3
			updateProgress("Question:", n + " of 5");
		}

			// 2.1.2.1: Set the question for the current phase
			var quizQuestions = function() {
				// Refer 1.4
				clearQuestion();
				q1 = "In Five Card Poker would a Royal Flush beat 4 Aces?";
				q2 = "In Blackjack what's the term used if a player scores over 21?";
				q3 = "What is the term used when two ones are rolled in Casino Craps?";
				q4 = "In Texas Hold'em what are your two starting cards called?";
				q5 = "In Roulette what is NOT a betting option";
				questionArray = [q1, q2, q3, q4, q5];
				// Refer 2.1.2.1.1
				selectQuestion(questionArray[(n-1)]);
			}

				// 2.1.2.1.1: Prepend <h3> in questions section
				var selectQuestion = function(text) {
					$("#questions").prepend('<h3 class="q">' + text + '</h3>');
				}

			// 2.1.2.2: Set the options for the current phase
			var quizOptions = function() {
				// Refer 2.1.2.2.1
				clearOptions();
				// Refer 2.1.2.2.2
				optionsSelector();
				// Create array using selected option set
				var optionArray = [a, b, c, d];
				// Append selected option set
				for (var i = 1; i <= 4; i++) {
					$("#options").append('<div><input type="radio" name="radio" id="radio' + i + '" class="radio" value="0"/><label for="radio' + i + '">' + optionArray[(i-1)] + '</label></div>');
				};
				// Refer 2.1.2.2.3
				correctAnswer();
			}
				// 2.1.2.2.1: Clear options set in previous phase
				var clearOptions = function() {
					$("#options").children().remove();
				}

				// 2.1.2.2.2: Select option set for current phase
				// Note: Question number = 'n'
				var optionsSelector = function() {
					if (n===1) {
						a = "Yes";
						b = "No";
						c = "They would draw";
						d = "Those two hands can't happen together";
					} else if (n===2) {
						a = "Blackjack";
						b = "Hit";
						c = "Bust";
						d = "Full House";
					} else if (n===3) {
						a = "Rat Eyes";
						b = "Snake Eyes";
						c = "Ace Deuce";
						d = "Double Ones";
					} else if (n===4) {
						a = "Box cards";
						b = "House cards";
						c = "Hole cards";
						d = "River cards";
					} else if (n===5) {
						a = "White";
						b = "Black";
						c = "1st 12";
						d = "19 to 36";
					}
				}

				// 2.1.2.2.3: Add value of 1 to the correct answer for the current phase
				var correctAnswer = function() {
					if (n===1) {
						i = 4;
					} else if (n===2) {
						i = 3;
					} else if (n===3) {
						i = 2;
					} else if (n===4) {
						i = 3;
					} else if (n===5) {
						i = 1;
					}
					$("#radio" + i).val(1);
				}

			// 2.1.2.3: Set the example image for the current phase
			var quizExamples = function() {
				// Refer 2.1.2.3.1
				clearImage();
				// Append example image for current phase
				$("#examples").append('<img src="img/examples/' + n + '.jpg" alt="example ' + n + '" class="exampleImage">');
			}
				// 2.1.2.3.1: Remove example image set in previous phase
				var clearImage = function() {
					$(".exampleImage").remove();
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
		n++;
	}
		// 2.3.1: Update hands based on result from previous phase
		var updateMinigame = function() {
			if (n>1) {
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
				if (n > 1) {
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
		n++;
	}

		// 2.5.1: End the current quiz session
		var endQuiz = function() {
			// Refer 2.1.2.2.1
			clearOptions();
			// Refer 2.1.2.3.1
			clearImage();
			// Refer 2.5.1.1
			finalResult();
		}

			// 2.5.1.1: Provide final result for minigame
			// Note: Variable 'correct' starts at 1 so variable 'i' has been used to offset this
			var finalResult = function() {
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
						selectQuestion("Winner wineer chicken dinner! You got all 5 correct!");
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