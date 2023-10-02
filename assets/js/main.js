var $body = $("body");
var $pin = $("div.fixed");
var $bf = $(".twentytwenty-container");
// Lock the body's overflow to prevent scrolling


function whichDay() {
	  // Get the current date
  var currentDate = new Date();

  // Define an array of day names
  var daysOfWeek = [
  	"Sunday! Hope you are enjoying your weekend Ben!",
  	"Monday! Hope you had a nice weekend Ben!",
  	"Tuesday! Hope you had a nice weekend Ben!",
  	"Hump day! It's midweek!",
  	"Thursday!",
  	"Friday! It's almost the weekend!",
  	"Saturday! Hope you are enjoying your weekend Ben!"
  	];

  // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  var dayIndex = currentDate.getDay();

  // Get the day name from the array
  var dayName = daysOfWeek[dayIndex];

  // Replace the text of elements with class 'day'
  $(".day").text(dayName);
}
function animateSections() {
	$("section").each(function (index) {
		const section = $(this);

		// Animate using GSAP
		gsap.to(section, {
			opacity: 1,
			y: 0,
			rotationX: 0,
			duration: 0.8, // Animation duration
			delay: 0.5 * index, // Staggered delay
			ease: "back.out(1.7)",
			onComplete: function () {
				$body.removeClass();
			},
		});
	});
}

function runSwiper() {
	var swiper = new Swiper(".swiper", {
      grabCursor: true,
      centeredSlides: true,
      // loop: true,

		// And if we need scrollbar
		scrollbar: {
			el: ".swiper-scrollbar",
			// hide: true,
		},
	});
}

function animateHeader() {
	// Split the text using SplitText
	var hiSplit = new SplitText("h1.main", { type: "words,chars" });

	// Define the animation timeline for the characters
	var hiTimeline = gsap.timeline();

	hiSplit.chars.forEach(function (char, index) {
		// Animate each character with a stagger effect
		hiTimeline.from(
			char,
			{
				opacity: 0,
				y: 30,
				duration: 1.2,
				ease: "elastic.out(1, 0.5)",
			},
			index * 0.2,
		);

		// If it's the last character, trigger the animation on it
		if (index === hiSplit.chars.length - 1) {
			animateLastCharacter(char);
		}
	});

	// Play the character animation
	hiTimeline.play();

	// Select the intro paragraphs
	var $introParagraphs = $("header h3");
	gsap.set($introParagraphs, { opacity: 0, y: 20 });

	// Define the animation for the intro paragraphs
	setTimeout(function () {
		$introParagraphs.each(function (index, introParagraph) {
			gsap.to(introParagraph, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				delay: 0.1 * index,
				ease: "back.out(1.7)",
			});
		});
	}, 1000); // Adjust the delay time as needed

}

	function animateLastCharacter(char) {

	// nothing to see here

	// $(char).addClass('_victory');
	// 	gsap.to(char, {
	// 	rotate: 24,
	// 	y: -200,
	// 	duration: .4,
	// 	ease: "power1.inOut",
	// 	delay: 1,
	// 	repeat: -1, // Infinite loop
	// 	repeatDelay: 0.1, // Delay before each repeat (in seconds)
	// 	yoyo: true,
	// });
}




// INIT

$body.addClass("_no-scroll");
whichDay();

window.onload = function () {
	var shadowRoot = document.querySelector("spline-viewer").shadowRoot;
	shadowRoot.querySelector("#logo").remove();

	$pin.addClass("_loaded");
	$bf.twentytwenty();
	$body.scrollTop(0);

	runSwiper();
	animateSections();
	animateHeader();


};
