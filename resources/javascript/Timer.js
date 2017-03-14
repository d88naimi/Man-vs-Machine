
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

	var cleverBotCS = response.cs

	console.log(cleverBotCS)
	console.log(response);


	$("#cbOutput")
		.append(
			"<h3><span>" +
			"<strong>" +
			response.clever_output + "</strong></span></h3>");


	console.log(response.clever_output)
	})




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
//End of Line

// This is what your buddy needs to do to use your object.
awesome.doAwesome(function(timeLeft) {
	//sending updated information to html after completing
	// resetCounter/start functions to reset counter to 0
	// and beging counting down from 20(line 54) to 0
	$("#time-left").html(timeLeft);
	//when 0 is reachead, run stop() function to stop
	// subtracting 1 from timeleft variable and replace
	// number with message defined in line 70
	if (timeLeft === 0) {
		this.stop();
		$("#time-left").html("PlaceHolderText-TimeUp");
	}
});
});



