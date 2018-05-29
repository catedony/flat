let slideIndex = 1;
showSlides(slideIndex);

let plusSlides = n => showSlides(slideIndex += n);

let showSlides = n => {
	const slides = document.getElementsByClassName('slides');
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