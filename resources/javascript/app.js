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

	wolframAnswered: false,

	userAnswered: false,

	questionAswered: function(button){
		if (this.wolframAnswered && this.userAnswered){
			if ($(button).attr("answer")){
				// user answered correctly build table
			}
			else{
				// user answered incorrectly build table
			};
			// put in wolfram comaprison here and build table
			this.wolframAnswered = false;
			this.userAnswered = false;
			this.currentQuestion++;
		};
	},

	stopQueries: function(){
		this.ajaxAbort = true;
	},
	// current question used to determine which question from trivia responses to display to page
	currentQuestion: 1,

	// ajaxabort doesnt actually abort ajax, it just prevents future callbacks from being stored in our trivia and wolfram arrays
	ajaxAbort: false,

	// these arrays will hold our questions and responses from wolfram after the gather questions method is run
	triviaResponses: [],
	wolframResponses: [],
	wolframTiming: [],

	// this method will generate question n from the trivia response array and display it to the page
	displayQuestion: function(){
		// set question number
		$("#incrementQuestion").text(this.currentQuestion)
		// set the question text
		$("#insertQuestion").text(this.triviaResponses[this.currentQuestion-1].question)
		var buttonarr = [];
		for(i=0; i<4; i++){
			if (i === 3){
				buttonarr.push(
					$("<button>")
						.addClass("btn btn-info positionBtn styleBtn")
						.attr("number", 4)
						.attr("answer", true)
						.text(this.triviaResponses[this.currentQuestion-1].correct_answer)
						.on("click", function(){
							game.userAnswered = true
							game.questionAswered(this)
						})
				);
				continue;
			};
			buttonarr.push(
				$("<button>")
					.addClass("btn btn-info positionBtn styleBtn")
					.attr("number", i+1)
					.attr("answer", false)
					.text(this.triviaResponses[this.currentQuestion-1].incorrect_answers[i])
					.on("click", function(){
						game.userAnswered = true
						game.questionAswered(this)
					})
			);
		};
		buttonarr = shuffle(buttonarr);
		$(".answersDiv").empty();
		for(i=0; i<buttonarr.length; i++){
			$(".answersDiv").append(buttonarr[i]);
		};
		setTimeout(function(){
			game.wolframAnswered = true;
			game.questionAswered();
			console.log("wolfram answered");
		}, game.wolframTiming[game.currentQuestion-1])
	},

	sendtoWolfram: function(triviaData){
		for (i=0; i<triviaData.results.length;i++){
			this.queryWolfram(triviaData.results[i].question, triviaData.results[i]);
		};
	},

	// this method calls the trivia api for n amount of questions and sends them to the send to wolfram method when they return
	queryTrivia: function(amount){
		var queryURL = "https://opentdb.com/api.php?amount="+amount+"&category=22&type=multiple";
		$.ajax({
    		url: queryURL,
    		method: "GET",
  		}).done(function(response) {
  			game.sendtoWolfram(response);
  		});
	},

	// this method calls the wolfram API for a specified question, then if successfully answered
	// stores the answer in an array along with the entire question object at the same index
	queryWolfram: function(question, triviaQuestion){
		var queryObj = {
			appid: "A6PYJY-7QJY4JG733",
			input: question,
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
  				game.wolframTiming.push(Math.round(response.queryresult.timing*1000));
  				game.wolframResponses.push(response.queryresult.pods[1].subpods[0].plaintext);
  				game.triviaResponses.push(triviaQuestion);
  			};
  		});
	}
};


game.queryTrivia(20);
setTimeout(function(){
	game.stopQueries();
	game.displayQuestion();
}, 20000);


function startTimer(){

//short hand document ready function
$(function() {

	var awesome = {
	 	//setting up the variable to hold the timer function
	 	gameTimerObject: {
			//starting the counter with no numbers defined
			counter: null,

			timer: null,

			//start of the timer function if it is not already running and count down by
			// 1 number per second.
			start: function(callBack) {
				if (null != this.timer) {
					return true;
				}
				else {
					var self = this;
					this.timer = setInterval(function() {
						var currentCount = self.updateCounter();

						callBack(currentCount);
					}, 1000);

					return ("number" === this.timer);
				}
			},
			//unset timer and return to null state in variables.
			stop: function() {
				if (null !== this.timer) {
					clearInterval(this.timer);
					this.timer = null;
				}
			},
			//resturning updates to counter variable
			resetCounter: function(seconds) {
				this.counter = seconds;
				return this.counter;
			},
			//checks to see is counter varible is zero
			// if counter is greater than 0 decrease by 
			//1 every second until 0 is reached
			updateCounter: function() {
				this.counter = (this.counter > 0)
				? this.counter - 1
				: 0;
				return this.counter;
			}
	 		// End of line
	 	},
							//this.gameTimerObject.clone()
							doAwesome: function(cb) {
								var newTimer = this.gameTimerObject
			//variable holding total time, where the counter starts
			var totalTime = 20;
			//sending "totalTime" variable to html div
			// $("#time-left").html(totalTime);
			cb(totalTime);
			this.gameTimerObject.resetCounter(totalTime);
			this.gameTimerObject.start(cb);
		}
	}; // end of awesome

			// This is what your buddy needs to do to use your object.
			awesome.doAwesome(function(timeLeft) {
				//sending updated information to html after completing
				// resetCounter/start functions to reset counter to 0
				// and beging counting down from 20(line 54) to 0
				$("#tiles").html(timeLeft);
				//when 0 is reachead, run stop() function to stop
				// subtracting 1 from timeleft variable and replace
				// number with message defined in line 70
			if (timeLeft === 0) {
			this.stop();
			$("#tiles").html("Times Up!");
						}
		});
	});
}

startTimer();
