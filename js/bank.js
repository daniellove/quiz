$(document).on("ready", function() {
	preloadImages();
});

function questionArray() {
	questionBank = [
		{	question: "In Roulette what is NOT a betting option?",
			possibleOptions: [{text: "White", val: 1},{text: "Black", val: 0}, {text: "1st 12", val: 0}, {text: "19 to 36", val: 0}],
			image: "roulette"
		},
		{	question: "A player does what to give up in a round of poker?",
			possibleOptions: [{text: "Fold", val: 1},{text: "Bluff", val: 0}, {text: "Check", val: 0}, {text: "Call", val: 0}],
			image: "badhand"
		},
		{	question: "What is the term used when two ones are rolled in Casino Craps?",
			possibleOptions: [{text: "Rat Eyes", val: 0},{text: "Snake Eyes", val: 1}, {text: "Ace Deuce", val: 0}, {text: "Double Ones", val: 0}],
			image: "dice"
		},
		{	question: "Who is the actor that plays Danny Ocean in Oceans Eleven?",
			possibleOptions: [{text: "Bernie Mac", val: 0},{text: "George Clooney", val: 1}, {text: "Brad Pitt", val: 0}, {text: "Matt Damon", val: 0}],
			image: "eleven"
		},
		{	question: "In Blackjack what's the term used if a player scores over 21?",
			possibleOptions: [{text: "Blackjack", val: 0},{text: "Hit", val: 0}, {text: "Bust", val: 1}, {text: "Full House", val: 0}],
			image: "blackjack"
		},
		{	question:  "In Texas Hold'em what are your two starting cards called?",
			possibleOptions: [{text: "Box cards", val: 0},{text: "House cards", val: 0}, {text: "Hole cards", val: 1}, {text: "River cards", val: 0}],
			image: "holdem"
		},
		{	question:  "In a common phrase what is \"chicken dinner\" preceded by?",
			possibleOptions: [{text: "Spinner winner...", val: 0},{text: "Picken winner...", val: 0}, {text: "Winner winner...", val: 1}, {text: "Theres no such phrase", val: 0}],
			image: "chicken"
		},
		{	question: "In Five Card Poker would a Royal Flush beat 4 Aces?",
			possibleOptions: [{text: "Yes", val: 0},{text: "No", val: 0}, {text: "They would draw", val: 0}, {text: "Those two hands can't happen together", val: 1}],
			image: "royalflush"
		},
		{	question: "What did the characters in 21 become experts in?",
			possibleOptions: [{text: "Dice rolling", val: 0}, {text: "Dice reading", val: 0}, {text: "Card shuffling", val: 0}, {text: "Card counting", val: 1}],
			image: 21
		},
		{	question: "Which of the following colours are never used for chips?",
			possibleOptions: [{text: "Pink", val: 0},{text: "Brown", val: 0}, {text: "Yellow", val: 0}, {text: "They can all be used", val: 1}],
			image: "chips"
		}
	]
};

function preloadImages() {
	// Preload example images
	i21 = new Image(736,640)
	i21.src = "img/examples/21.jpg"
	badhand = new Image(736,640)
	badhand.src = "img/examples/badhand.jpg"
	blackjack = new Image(736,640)
	blackjack.src = "img/examples/blackjack.jpg"
	chicken = new Image(736,640)
	chicken.src = "img/examples/chicken.jpg"
	chips = new Image(736,640)
	chips.src = "img/examples/chips.jpg"
	dice = new Image(736,640)
	dice.src = "img/examples/dice.jpg"
	eleven = new Image(736,640)
	eleven.src = "img/examples/eleven.jpg"
	holdem = new Image(736,640)
	holdem.src = "img/examples/holdem.jpg"
	roulette = new Image(736,640)
	roulette.src = "img/examples/roulette.jpg"
	royalflush = new Image(736,640)
	royalflush.src = "img/examples/royalflush.jpg"
	// Preload cards
	ph = new Image(148,208)
	ph.src = "img/ph.png"
	c1 = new Image(148,208)
	c1.src = "img/correct/1.png"
	c2 = new Image(148,208)
	c2.src = "img/correct/2.png"
	c3 = new Image(148,208)
	c3.src = "img/correct/3.png"
	c4 = new Image(148,208)
	c4.src = "img/correct/4.png"
	c5 = new Image(148,208)
	c5.src = "img/correct/5.png"
	i1 = new Image(148,208)
	i1.src = "img/incorrect/1.png"
	i2 = new Image(148,208)
	i2.src = "img/incorrect/2.png"
	i3 = new Image(148,208)
	i3.src = "img/incorrect/3.png"
	i4 = new Image(148,208)
	i4.src = "img/incorrect/4.png"
	i5 = new Image(148,208)
	i5.src = "img/incorrect/5.png"
	o1 = new Image(148,208)
	o1.src = "img/opponent/1.png"
	o2 = new Image(148,208)
	o2.src = "img/opponent/1.png"
	o3 = new Image(148,208)
	o3.src = "img/opponent/1.png"
	o4 = new Image(148,208)
	o4.src = "img/opponent/1.png"
	o5 = new Image(148,208)
	o5.src = "img/opponent/1.png"
}
