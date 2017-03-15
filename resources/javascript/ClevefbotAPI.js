
console.log("hello, Start")

	var authKey = "CCCzkPEAa_f6rUIYoQWZehRqOFQ"
	var question = null
	var queryURLBase = "http://www.cleverbot.com/getreply?"


	var queryObject = {
		key: "CCCzkPEAa_f6rUIYoQWZehRqOFQ",
		input: "Hello Cleverbot",
		callback: "ProcessReply"
	}

	$.ajax({
		url: queryURLBase + $.param(queryObject),
		method: "GET",
		crossOrigin: true,
		dataType: 'jsonp',
	}) .done(function(response){
	console.log(response);

	$("#cbOutput")
		.append(
			"<h3><span>" +
			"<strong>" +
			response.clever_output + "</strong></span></h3>");


	console.log(response.clever_output)
	})


