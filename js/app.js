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
	updateNode("#instruction", "Click the chips to begin!");
	updateNode("#userFinal", "You");
	updateNode("#opponentFinal", "Opponent");
	// Refer 1.2
	minigameReset("#myCard");
	minigameReset("#oppCard");
	// Refer 1.3
	updateProgress("", "")
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
			$("#instruction").removeClass("warning")
			// Refer 1.1
			updateNode("#instruction", "Click the chips to submit your answer");
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
				// Refer 2.1.2.1.1
				clearQuestion();
				q1 = "Question 1";
				q2 = "Question 2";
				q3 = "Question 3";
				q4 = "Question 4";
				q5 = "Question 5";
				questionArray = [q1, q2, q3, q4, q5];
				// Append question for current phase
				$("#questions").append('<p class="q">' + questionArray[(n-1)] + '</p>');
			}

				// 2.1.2.1.1: Clear question set previous phase
				var clearQuestion = function() {
					$(".q").remove();
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

				// 2.1.2.2.3: Add value of 1 to the correct answer for the current phase
				var correctAnswer = function() {
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
		$("#instruction").addClass("warning");
		// Refer 1.1
		updateNode("#instruction", "Please select an option before clicking then chips");
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
			// Refer 2.1
			updateNode("#instruction", "Click the chips to play again!")
			// Refer 2.1.2.1.1
			clearQuestion();
			// Refer 2.1.2.2.1
			clearOptions();
			// Refer 2.1.2.3.1
			clearImage();
			// Refer 2.5.1.1
			finalResult();
		}

			// 2.5.1.1: Provide final result for minigame
			// Note: Final hand is published based on number of correct answers
			// Note: User requires 3 or more correct answers to win minigame
			// Note: Variable 'correct' starts at 1 so variable 'i' has been used to offset this
			var finalResult = function() {
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

