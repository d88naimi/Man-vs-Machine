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

var timer = {
	timerCount: 21,
	timerStart: function(){
		console.log("did it start");
		timer.theTimer = setInterval(function(){
			timer.timerCount--;
			$("#tiles").html(timer.timerCount);
			if (timer.timerCount <= 0) {
				timer.timerStop();
				timer.timerReset();
				game.wolframAnswered = true;
				game.userAnswered = true;
				game.questionAswered();
			};
		}, 1000)
	},
	timerStop: function(){
		clearInterval(timer.theTimer);
	},
	timerReset: function(){
		timer.timerCount = 21;
	}
};

var game = {

	gameOver: function(){
		console.log("the game ended");
		timer.timerStop();
		$(".answersDiv").empty();
		$(".answersDiv").html("The game ended, please see the results below.");
	},

	userButton: null,

	wolframAnswered: false,

	userAnswered: false,

	questionAswered: function(){
		console.log(this.userButton)
		if (this.wolframAnswered && this.userAnswered){
			timer.timerStop();
			clearTimeout(game.waitforwolf);
			$("#questionTable").append("<th>Q"+this.currentQuestion+"</th>");
			if (this.userButton === "true"){
				// user answered correctly build table
				console.log("Correct");
				$("#userTable").append("<td>Correct</td>");
			}
			else{
				// user answered incorrectly build table
				console.log("Incorrect");
				$("#userTable").append("<td>Incorrect</td>");
				$("#answerButton").addClass("rightAnswer")
			};
			// put in wolfram comparison here and build table
			console.log(game.wolframResponses[game.currentQuestion-1].indexOf(game.triviaResponses[game.currentQuestion-1].correct_answer));
			if(game.wolframResponses[game.currentQuestion-1].indexOf(game.triviaResponses[game.currentQuestion-1].correct_answer.trim()) !== -1){
				$("#wolframTable").append("<td>Correct</td>");
			}
			else{
				$("#wolframTable").append("<td>Incorrect</td>");
			}1
			

			console.log(game.triviaResponses[game.currentQuestion-1]);
			console.log(game.wolframResponses[game.currentQuestion-1]);
			this.userButton = null;
			this.wolframAnswered = false;
			this.userAnswered = false;
			this.currentQuestion++;
			setTimeout(function(){
				$('#userAnswered').slideToggle();
				$('#wolframAnswered').slideToggle();
				game.displayQuestion();
			}, 3000);
			
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

		timer.timerReset();
		timer.timerStart();

		if (this.currentQuestion < this.triviaResponses.length) {

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
							.attr("id", "answerButton")
							.text(this.triviaResponses[this.currentQuestion-1].correct_answer)
							.on("click", function(){
								$(this).addClass("rightAnswer")
								$('#userAnswered').slideToggle()
								game.userAnswered = true
								game.userButton = $(this).attr("answer")
								game.questionAswered()
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
							$(this).addClass("wrongAnswer")
							$('#userAnswered').slideToggle()
							game.userAnswered = true
							game.userButton = $(this).attr("answer")
							game.questionAswered(this)
						})
				);
			};
			buttonarr = shuffle(buttonarr);
			$(".answersDiv").empty();
			for(i=0; i<buttonarr.length; i++){
				$(".answersDiv").append(buttonarr[i]);
			};
			game.waitforwolf = setTimeout(function(){
				game.wolframAnswered = true;
				$('#wolframAnswered').slideToggle();
				game.questionAswered();
				console.log("wolfram answered");
				// Log somewhere that wolfram answered
			}, game.wolframTiming[game.currentQuestion-1])
		}
		else
		{
			game.gameOver();
		};
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
		var URL = "https://api.wolframalpha.com/v2/query?";
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
    var count=21;

    var counter=setInterval(timer, 1000);

    function timer(){
         count=count-1;
     if (count === 0){
            clearInterval(counter);
         }
    $("#tiles").html(count);
    }
timer()
}

startTimer();
