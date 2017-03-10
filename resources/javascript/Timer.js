
	var gameTimerObject = {

			counter: null,

			timer: null,


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

	stop: function() {
		if (null !== this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	},

	resetCounter: function(seconds) {
		this.counter = seconds;
		return this.counter;
	},

	updateCounter: function() {
		this.counter = (this.counter > 0)
		? this.counter - 1
		: 0;
		return this.counter;
	}
 // End of line
};

// $(function() {
	var totalTime = 20;

	$("time-left").html(totalTime);

	gameTimerObject.resetCounter(totalTime);

	gameTimerObject.start(function(timeleft) {

	$("#time-left").html(timeleft);

		if (timeleft === 0) {
			this.stop();
			$("time-left").html("PlaceHolderText-TimeUp")
		}
	});
//End of Line	
// });