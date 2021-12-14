import Swiper from '../../../../node_modules/swiper/swiper-bundle.esm.browser';

const mainSlider = document.querySelector('.jsMainSlider');
let mainSliderInit;

if (mainSlider) {
	mainSliderInit = new Swiper('.jsMainSliderInit', {
		slidesPerView: 1,
		loop: false,
		navigation: {
			nextEl: ".jsMainSliderBtnNext",
			prevEl: ".jsMainSliderBtnPrev",
		}
	});

	mainSliderInit.on('slideChange', function () {
		document.querySelector('.jsMainSliderCurrent').innerHTML = this.activeIndex + 1
	})
}



const newsItemsSlider = document.querySelector('.jsNewsItemsSlider');
let newsItemsSliderInit;

if (newsItemsSlider) {
	newsItemsSliderInit = new Swiper('.jsNewsItemsSliderInit', {
		slidesPerView: 2,
		spaceBetween: 8,
		loop: false,
		navigation: {
			nextEl: ".jsNewsItemsSliderBtnNext",
			prevEl: ".jsNewsItemsSliderBtnPrev",
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 1,
				spaceBetween: false
			},
		}
	});

	newsItemsSliderInit.on('slideChange', function () {
		document.querySelector('.jsNewsItemsSliderCount').innerHTML = this.activeIndex + 1
	})
}



const parnterSlider = document.querySelector('.jsPartnerSlider');
let partnerSliderInit;

if  (parnterSlider) {
	partnerSliderInit = new Swiper('.jsPartnerSliderInit', {
		slidesPerView: 'auto',
		loop: false,
		navigation: {
			nextEl: ".jsPartnerSliderBtnNext",
			prevEl: ".jsPartnerSliderBtnPrev",
		},
		breakpoints: {
			1024: {
				slidesPerView: 3
			},
			1200: {
				slidesPerView: 4
			},
		}
	})
}


const newsSlider = document.querySelector('.jsNewsSlider');
let newsSliderInit;

if (newsSlider) {
	newsSliderInit = new Swiper('.jsNewsSliderInit', {
		slidesPerView: 'auto',
		loop: false,
		spaceBetween: 32,
		navigation: {
			nextEl: ".jsNewsSliderBtnNext",
			prevEl: ".jsNewsSliderBtnPrev",
		},
		breakpoints: {
			1024: {
				slidesPerView: 3
			},
			1600: {
				slidesPerView: 4
			},
		}
	})
}

const  specialSliders = document.querySelectorAll('.jsSpecialSlider');

for (let i = 0; i < specialSliders.length; i++) {
	let sliderInit = specialSliders[i].querySelector('.jsSpecialSliderInner');
	let sliderPrevBtn = specialSliders[i].querySelector('.jsSliderBtnPrev');
	let sliderPrevNxt = specialSliders[i].querySelector('.jsSliderBtnNext');
	let sliderScroll = specialSliders[i].querySelector('.jsSliderScroll');

	const specSlider = new Swiper(sliderInit, {
		slidesPerView: 2,
		loop: false,
		scrollbar: {
			el: sliderScroll,
		},
		navigation: {
			nextEl: sliderPrevNxt,
			prevEl: sliderPrevBtn,
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
				scrollbar: false,
			},
			1024: {
				slidesPerView: 4,
				scrollbar: false,
			},
			1600: {
				slidesPerView: 5,
				scrollbar: false,
			},
		},
	});
}
