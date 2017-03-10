// wolfram-------------------------

// appid wolfram A6PYJY-7QJY4JG733

// http://api.wolframalpha.com/v1/result?appid=DEMO&i=How+far+is+Los+Angeles+from+New+York%3f

// https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple

var questions = [];

var wolfram = {
	queryWolfram: function(queryString){
		var queryObj = {
			appid: "A6PYJY-7QJY4JG733",
			input: queryString,
			output: "json",
			format: "plaintext"
		};
		var URL = "http://api.wolframalpha.com/v2/query?";
		// var URL = "http://api.wolframalpha.com/v1/result?";
		var queryURL = URL + $.param(queryObj);
		$.ajax({
    		url: queryURL,
    		method: "GET",
    		crossDomain: true,
    		dataType: "jsonp"
  		}).done(function(response) {
  			if (response.queryresult.success) {
  				if (questions.length < 10) {
  					console.log(queryString);
  					questions.push(queryString);
  					console.log(questions);
  				}
  			}
  		});
	}
};

var trivia = {
	queryTrivia: function(amount){
		var queryURL = "https://opentdb.com/api.php?amount="+amount+"&category=22&type=multiple";
		$.ajax({
    		url: queryURL,
    		method: "GET",
  		}).done(function(response) {
  			for (i=0; i<response.results.length;i++){
  				// console.log(response.results[i].question);
  				wolfram.queryWolfram(response.results[i].question);
  			};
  			console.log(response);
  		});
	}
};

var cleverBot = {

};

trivia.queryTrivia(20);