var video = document.querySelector('.bg-video');
video.onmousemove = function (e) {
	e.preventDefault();
};

//slider
let slideIndex = 1;
let plusSlides = n => showSlides(slideIndex += n);

let showSlides = n => {
	let slides = document.getElementsByClassName('slides');
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (let slide of slides) {
		slide.style.display = 'none';
	}
	slides[slideIndex - 1].style.display = 'block';
};

showSlides(slideIndex);

//tooltips
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

//animation
$('.logo').on('mouseover', () => $('.logo-img').removeClass('reverse').addClass('rotate'));
$('.logo').on('mouseout', () => $('.logo-img').removeClass('rotate').addClass('reverse'));