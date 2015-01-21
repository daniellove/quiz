function questionArray() {
	questionBank = [
		{	question: "In Five Card Poker would a Royal Flush beat 4 Aces?",
			possibleOptions: [{text: "Yes", val: 0},{text: "No", val: 0}, {text: "They would draw", val: 0}, {text: "Those two hands can't happen together", val: 1}],
			image: 1
		},
		{	question: "In Blackjack what's the term used if a player scores over 21?",
			possibleOptions: [{text: "Blackjack", val: 0},{text: "Hit", val: 0}, {text: "Bust", val: 1}, {text: "Full House", val: 0}],
			image: 2
		},
		{	question: "What is the term used when two ones are rolled in Casino Craps?",
			possibleOptions: [{text: "Rat Eyes", val: 0},{text: "Snake Eyes", val: 1}, {text: "Ace Deuce", val: 0}, {text: "Double Ones", val: 0}],
			image: 3
		},
		{	question:  "In Texas Hold'em what are your two starting cards called?",
			possibleOptions: [{text: "Box cards", val: 0},{text: "House cards", val: 0}, {text: "Hole cards", val: 1}, {text: "River cards", val: 0}],
			image: 4
		},
		{	question: "In Roulette what is NOT a betting option",
			possibleOptions: [{text: "White", val: 1},{text: "Black", val: 0}, {text: "1st 12", val: 0}, {text: "19 to 36", val: 0}],
			image: 5
		}
	]
};
