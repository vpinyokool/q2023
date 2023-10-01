var $body = $("body");
var $pin = $("div.fixed");
var $bf = $(".twentytwenty-container");

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

function runSwiper() {
	var swiper = new Swiper(".swiper", {
      grabCursor: true,
      centeredSlides: true,
      // loop: true,

		// // If we need pagination
		// pagination: {
		// 	el: ".swiper-pagination",
		// },

		// Navigation arrows
		// navigation: {
		// 	nextEl: ".swiper-button-next",
		// 	prevEl: ".swiper-button-prev",
		// },

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
	gsap.to(char, {
		rotate: 24,
		duration: 0.8,
		ease: "power1.inOut",
		delay: 1,
		repeat: -1, // Infinite loop
		repeatDelay: 0.1, // Delay before each repeat (in seconds)
		yoyo: true,
	});
}

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
