$(document).ready(function(){
	$('#wolframAnswered').hide();
	$('#userAnswered').hide();
})


$('#an1').click(function(){

	var wolframAnswered = "Wolfram Answered!";

	// $('#an2').removeClass('btn-primary').addClass('btn-danger').addClass('wrongAnswer');

	$('#an3').removeClass('btn-info').addClass('btn-success').addClass('rightAnswer');

	// $('#whoAnsweredThisMessage').animate({
	// 	marginTop:0,
	// 	duration: 800

	// }, 500, function(){
	// 	$(this).after("<div>" + wolframAnswered + "</div>");

	// });

});


$('#an5').click(function(){

	$('.disAp').fadeOut("slow");
});

$('#clickMeOne').on("click", function(){

	$('#wolframAnswered').slideToggle();

})

$('#clickMeTwo').on("click", function(){

	$('#userAnswered').slideToggle(function(){
		$('#userAnswered').slideToggle();

	});

})