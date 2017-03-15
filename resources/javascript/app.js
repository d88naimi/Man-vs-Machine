// wolfram-------------------------

// appid wolfram A6PYJY-7QJY4JG733

// http://api.wolframalpha.com/v1/result?appid=DEMO&i=How+far+is+Los+Angeles+from+New+York%3f

// https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// game object contains all methods and variables associated to game
var game = {

	// current question used to determine which question from trivia responses to display to page
	currentQuestion: 0,

	// ajaxabort doesnt actually abort ajax, it just prevents future callbacks from being stored in our trivia and wolfram arrays
	ajaxAbort: false,

	// these arrays will hold our questions and responses from wolfram after the gather questions method is run
	triviaResponses: [],
	wolframResponses: [],

	// this method will generate question n from the trivia response array and display it to the page
	displayQuestion: function(displayId, questionNumber){
		var questionHeader = $("<h1>");
		questionHeader.text(currentQuestion[questionNumber].question);
		var answers = [$("<p>"),$("<p>"),$("<p>"),$("<p>")];
		answers[0].text(currentQuestion[questionNumber].correct_answer);
		answers[0].attr("answer", true);
		answers[1].text(currentQuestion[questionNumber].incorrect_answers[0]);
		answers[1].attr("answer", false);
		answers[2].text(currentQuestion[questionNumber].incorrect_answers[1]);
		answers[2].attr("answer", false);
		answers[3].text(currentQuestion[questionNumber].incorrect_answers[2]);
		answers[3].attr("answer", false);
		ansers = shuffle(answers);
		$("#"+displayId).append(questionHeader);
		for(i=0; i<answers.length; i++){
			answers[i].on("click", function(){
				if(this.answer){
					// display correct
				}
				else{
					// display incorrect
				};
			});
			$("#"+displayId).append(answers[i]);
		};
	},

	// this method calls the open trivia api for 30 questions. those questions are then sent to wolfram and logged until we get 10 back.
	gatherQuestions: function(){
		var queryURL = "https://opentdb.com/api.php?amount=30&category=22&type=multiple";
		$.ajax({
    		url: queryURL,
    		method: "GET",
  		}).done(function(response) {
  			for (i=0; i<response.results.length;i++){
  				queryWolfram(response.results[i]);
  			};
  		});
		function queryWolfram(triviaResponse){
			var queryObj = {
				appid: "A6PYJY-7QJY4JG733",
				input: triviaResponse.question,
				output: "json",
				format: "plaintext"
			};
			var URL = "http://api.wolframalpha.com/v2/query?";
			var queryURL = URL + $.param(queryObj);
			$.ajax({
	    		url: queryURL,
	    		method: "GET",
	    		crossDomain: true,
	    		dataType: "jsonp"
	  		}).done(function(response) {
	  			if (response.queryresult.success && game.ajaxAbort === false) {
	  				game.triviaResponses.push(triviaResponse);
	  				game.wolframResponses.push(response);
	  				if (game.triviaResponses.length === 10){
	  					game.ajaxAbort = true;
	  				};
	  				console.log(game.triviaResponses);
	  				console.log(game.wolframResponses);
	  			};
	  		});
		};
	},
};

// var questions = [];

// var wolfram = {
// 	queryWolfram: function(queryString){
// 		var queryObj = {
// 			appid: "A6PYJY-7QJY4JG733",
// 			input: queryString,
// 			output: "json",
// 			format: "plaintext"
// 		};
// 		var URL = "http://api.wolframalpha.com/v2/query?";
// 		var queryURL = URL + $.param(queryObj);
// 		$.ajax({
//     		url: queryURL,
//     		method: "GET",
//     		crossDomain: true,
//     		dataType: "jsonp"
//   		}).done(function(response) {
//   			if (response.queryresult.success) {
//   				if (questions.length < 10) {
//   					console.log(queryString);
//   					questions.push(queryString);
//   					console.log(questions);
//   				}
//   			}
//   		});
// 	}
// };

// var trivia = {
// 	queryTrivia: function(amount){
// 		var queryURL = "https://opentdb.com/api.php?amount="+amount+"&category=22&type=multiple";
// 		$.ajax({
//     		url: queryURL,
//     		method: "GET",
//   		}).done(function(response) {
//   			for (i=0; i<response.results.length;i++){
//   				// console.log(response.results[i].question);
//   				wolfram.queryWolfram(response.results[i].question);
//   			};
//   			console.log(response);
//   		});
// 	}
// };

game.gatherQuestions();

// var cleverBot = {

// };

// hello@provenrecruiting.com

// UCSD Extension Presentation