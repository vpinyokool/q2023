const $body = $("body");
const $element = $(".fade-out-element");
let opacity = 1;

function fadeOutHero() {
	// Create a GSAP timeline to smoothly animate the opacity change
	const timeline = gsap.timeline();
	timeline.to($element, {
		opacity: 0,
		duration: 0.5,
		ease: "power1.inOut",
	});
}
function animateSections() {
	$("section").each(function (index) {
		const section = $(this);

		// Set initial properties
		$body.addClass("_no-scroll");
		gsap.set(section, {
			opacity: 0,
			y: 100,
			rotationX: 30,
			transformStyle: "preserve-3d",
		});

		// Animate using GSAP
		gsap.to(section, {
			opacity: 1,
			y: 0,
			rotationX: 0,
			duration: 0.8, // Animation duration
			// duration: 8, // Animation duration
			delay: 0.5 * index, // Staggered delay
			ease: "back.out(1.7)",
			onComplete: function () {
				console.log("Animation complete");
				$body.removeClass();
			},
		});
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
			gsap.set($introParagraphs, { opacity: 0, y: 20,});

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
	gsap.to(char, {
		rotate: 24,
		duration: 1.2,
		ease: "power1.inOut",
		delay: 1,
		repeat: -1, // Infinite loop
		repeatDelay: 0.1, // Delay before each repeat (in seconds)
		yoyo: true,
	});
}

$(document).ready(function () {
	// Listen to the scroll event
	$(window).scroll(function () {
		// Calculate the opacity based on the scroll position
		opacity = 1 - $(window).scrollTop() / 400; // Adjust the threshold as needed

		// Apply the opacity to the element
		$element.css("opacity", opacity);
	});
	fadeOutHero();
	setTimeout(function () {
		animateSections();
		animateHeader();
	}, 100); // Adjust the delay time as needed
});

// window.onload = function () {
// 	var shadowRoot = document.querySelector("spline-viewer").shadowRoot;
// 	shadowRoot.querySelector("#logo").remove();
// };
