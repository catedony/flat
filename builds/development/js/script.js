'use strict';

//header
var video = document.querySelector('.bg-video');
var header = document.querySelector('.header');

var adjustHeader = function adjustHeader() {
	if (document.documentElement.clientWidth > 767) {
		header.style.maxHeight = video.offsetHeight + 'px';
	}
};
adjustHeader();
window.onresize = adjustHeader;

//slider
var slideIndex = 1;
var plusSlides = function plusSlides(n) {
	return showSlides(slideIndex += n);
};

var showSlides = function showSlides(n) {
	var slides = document.getElementsByClassName('slides');
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = slides[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var slide = _step.value;

			slide.style.display = 'none';
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	slides[slideIndex - 1].style.display = 'block';
};

showSlides(slideIndex);

//tooltips
$(function () {
	$('[data-toggle="tooltip"]').tooltip();
});

//animation
$('.logo').on('mouseover', function () {
	return $('.logo-img').removeClass('reverse').addClass('rotate');
});
$('.logo').on('mouseout', function () {
	return $('.logo-img').removeClass('rotate').addClass('reverse');
});