
//short hand document ready function
 $(function() {
 	//setting up the variable to hold the timer function
	var gameTimerObject = {
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
};


	//variable holding total time, where the counter starts
	var totalTime = 20;
	//sending "totalTime" variable to html div
	$("#time-left").html(totalTime);

	gameTimerObject.resetCounter(totalTime);

	gameTimerObject.start(function(timeleft) {
		//sending updated information to html after completing
			// resetCounter/start functions to reset counter to 0
				// and beging counting down from 20(line 54) to 0
	$("#time-left").html(timeleft);
			//when 0 is reachead, run stop() function to stop
				// subtracting 1 from timeleft variable and replace
					// number with message defined in line 70
		if (timeleft === 0) {
			this.stop();
			$("#time-left").html("PlaceHolderText-TimeUp");
		}
	});
//End of Line
});
