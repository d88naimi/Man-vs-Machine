// wolfram-------------------------

// appid wolfram A6PYJY-7QJY4JG733

// http://api.wolframalpha.com/v1/result?appid=DEMO&i=How+far+is+Los+Angeles+from+New+York%3f

// https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple

var wolfram = {
	queryWolfram: function(queryString){
		var queryObj = {
			appid: "A6PYJY-7QJY4JG733",
			i: queryString
		};
		var URL = "https://api.wolframalpha.com/v1/result?";
		var queryURL = URL + $.param(queryObj);
		$.ajax({
    		url: queryURL,
    		method: "GET"
  		}).done(function(response) {
  			console.log(response);
  		});
	}
};

var trivia = {

};

var cleverBot = {

};

wolfram.queryWolfram("how far away is the moon?");