$(document).on('ready', function() {

	clickButton();

});

var n = 1

var clickButton = function() {
	$("#submit").on("mousedown", function() {
		n++;
		$("#q-no").text("Question " + n + ":");
		$("#p-no").text(n + " of 5");
	});
}