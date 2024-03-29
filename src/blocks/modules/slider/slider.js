// import Swiper from 'swiper/swiper-bundle.esm.browser.js';
import Swiper from 'swiper/bundle'

// Стили Swiper
// Базовые стили
// import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
import 'swiper/css'

const mainSlider = document.querySelector('.jsMainSlider')
let mainSliderInit

if (mainSlider) {
	mainSliderInit = new Swiper('.jsMainSliderInit', {
		slidesPerView: 1,
		loop: false,
		navigation: {
			nextEl: '.jsMainSliderBtnNext',
			prevEl: '.jsMainSliderBtnPrev'
		}
	})

	mainSliderInit.on('slideChange', function () {
		document.querySelector('.jsMainSliderCurrent').innerHTML = this.activeIndex + 1
	})
}

const newsItemsSlider = document.querySelector('.jsNewsItemsSlider')
let newsItemsSliderInit

if (newsItemsSlider) {
	newsItemsSliderInit = new Swiper('.jsNewsItemsSliderInit', {
		slidesPerView: 2,
		spaceBetween: 8,
		loop: false,
		navigation: {
			nextEl: '.jsNewsItemsSliderBtnNext',
			prevEl: '.jsNewsItemsSliderBtnPrev'
		},
		breakpoints: {
			768: {
				slidesPerView: 3
			},
			1024: {
				slidesPerView: 1,
				spaceBetween: false
			}
		}
	})

	newsItemsSliderInit.on('slideChange', function () {
		document.querySelector('.jsNewsItemsSliderCount').innerHTML = this.activeIndex + 1
	})
}

const parnterSlider = document.querySelector('.jsPartnerSlider')
let partnerSliderInit

if (parnterSlider) {
	partnerSliderInit = new Swiper('.jsPartnerSliderInit', {
		slidesPerView: 'auto',
		loop: false,
		navigation: {
			nextEl: '.jsPartnerSliderBtnNext',
			prevEl: '.jsPartnerSliderBtnPrev'
		},
		breakpoints: {
			1024: {
				slidesPerView: 3
			},
			1200: {
				slidesPerView: 4
			}
		}
	})
}

const newsSlider = document.querySelector('.jsNewsSlider')
let newsSliderInit

if (newsSlider) {
	newsSliderInit = new Swiper('.jsNewsSliderInit', {
		slidesPerView: 'auto',
		loop: false,
		spaceBetween: 32,
		navigation: {
			nextEl: '.jsNewsSliderBtnNext',
			prevEl: '.jsNewsSliderBtnPrev'
		},
		breakpoints: {
			1024: {
				slidesPerView: 3
			},
			1600: {
				slidesPerView: 4
			}
		}
	})
}

const specialSliders = document.querySelectorAll('.jsSpecialSlider')

for (let i = 0; i < specialSliders.length; i++) {
	let sliderInit = specialSliders[i].querySelector('.jsSpecialSliderInner')
	let sliderPrevBtn = specialSliders[i].querySelector('.jsSliderBtnPrev')
	let sliderPrevNxt = specialSliders[i].querySelector('.jsSliderBtnNext')
	let sliderScroll = specialSliders[i].querySelector('.jsSliderScroll')

	const specSlider = new Swiper(sliderInit, {
		slidesPerView: 2,
		loop: false,
		scrollbar: {
			el: sliderScroll
		},
		navigation: {
			nextEl: sliderPrevNxt,
			prevEl: sliderPrevBtn
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
				scrollbar: false
			},
			1024: {
				slidesPerView: 4,
				scrollbar: false
			},
			1600: {
				slidesPerView: 5,
				scrollbar: false
			}
		}
	})
}

const recentSlider = document.querySelector('.jsRecentSliderInner')
let recentSliderInit

if (recentSlider) {
	recentSliderInit = new Swiper('.jsRecentSliderInner', {
		slidesPerView: 2,
		loop: false,
		scrollbar: {
			el: '.jsRecentSliderScroll'
		},
		navigation: {
			nextEl: '.jsRecentSliderBtnNext',
			prevEl: '.jsRecentSliderBtnPrev'
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
				scrollbar: false
			},
			1024: {
				slidesPerView: 4,
				scrollbar: false
			},
			1600: {
				slidesPerView: 5,
				scrollbar: false
			}
		}
	})
}

const complectSlider = document.querySelector('.jsComplectSliderInner')
let complectSliderInit

if (complectSlider) {
	complectSliderInit = new Swiper('.jsComplectSliderInner', {
		slidesPerView: 2,
		loop: false,
		scrollbar: {
			el: '.jsComplectSliderScroll'
		},
		navigation: {
			nextEl: '.jsComplectSliderBtnNext',
			prevEl: '.jsComplectSliderBtnPrev'
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
				scrollbar: false
			},
			1024: {
				slidesPerView: 4,
				scrollbar: false
			},
			1600: {
				slidesPerView: 5,
				scrollbar: false
			}
		}
	})
}

const optionalEquipmentSlider = document.querySelector('.jsOptionalEquipmentSliderInner')
let optionalEquipmentSliderInit

if (optionalEquipmentSlider) {
	optionalEquipmentSliderInit = new Swiper('.jsOptionalEquipmentSliderInner', {
		slidesPerView: 2,
		loop: false,
		scrollbar: {
			el: '.jsOptionalEquipmentSliderScroll'
		},
		navigation: {
			nextEl: '.jsOptionalEquipmentSliderBtnNext',
			prevEl: '.jsOptionalEquipmentSliderBtnPrev'
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
				scrollbar: false
			},
			1024: {
				slidesPerView: 4,
				scrollbar: false
			},
			1600: {
				slidesPerView: 5,
				scrollbar: false
			}
		}
	})
}

const seeAlsoSlider = document.querySelector('.jsSeeAlsoSliderInner')
let seeAlsoSliderInit

if (seeAlsoSlider) {
	seeAlsoSliderInit = new Swiper('.jsSeeAlsoSliderInner', {
		slidesPerView: 2,
		loop: false,
		scrollbar: {
			el: '.jsSeeAlsoSliderScroll'
		},
		navigation: {
			nextEl: '.jsSeeAlsoSliderBtnNext',
			prevEl: '.jsSeeAlsoSliderBtnPrev'
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
				scrollbar: false
			},
			1024: {
				slidesPerView: 4,
				scrollbar: false
			},
			1600: {
				slidesPerView: 5,
				scrollbar: false
			}
		}
	})
}

if (document.querySelector('.jsEquipmentSliderMain') &&
  document.querySelector('.jsEquipmentSliderTrack')) {
	let productTrack = new Swiper('.jsEquipmentSliderTrack', {
		direction: 'vertical',
		slidesPerView: 4,
		spaceBetween: 12,
		navigation: {
			prevEl: '.product-hero-prev',
			nextEl: '.product-hero-next'
		},
		on: {}
	})

	new Swiper('.jsEquipmentSliderMain', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 0,
		autoHeight: true,
		navigation: {
			nextEl: '.product-hero-main-next',
			prevEl: '.product-hero-main-prev'
		},
		pagination: {
			el: '.product-hero__dots',
			type: 'fraction'
		},
		thumbs: {
			swiper: productTrack
		},

		breakpoints: {
			680: {
				autoHeight: false
			},
			1100: {
				navigation: false,
				autoHeight: false
			}
		},

		on: {}
	})
}
if (document.querySelector('.jsFlizelinSliderMain') &&
  document.querySelector('.jsFlizelinSliderTrack')) {
	let productTrack = new Swiper('.jsFlizelinSliderTrack', {
		direction: 'vertical',
		slidesPerView: 3,
		spaceBetween: 12,
		navigation: {
			prevEl: '.product-hero-prev',
			nextEl: '.product-hero-next'
		},
		on: {}
	})

	new Swiper('.jsFlizelinSliderMain', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 0,
		autoHeight: true,
		navigation: {
			nextEl: '.product-hero-main-next',
			prevEl: '.product-hero-main-prev'
		},
		pagination: {
			el: '.product-hero__dots',
			type: 'fraction'
		},
		thumbs: {
			swiper: productTrack
		},

		breakpoints: {
			1100: {
				navigation: false
			}
		},

		on: {}
	})
}
if (document.querySelector('.jsThreadSliderMain') &&
  document.querySelector('.jsThreadSliderTrack')) {
	let productTrack = new Swiper('.jsThreadSliderTrack', {
		direction: 'vertical',
		slidesPerView: 3,
		spaceBetween: 12,
		navigation: {
			prevEl: '.product-hero-prev',
			nextEl: '.product-hero-next'
		},
		on: {}
	})

	new Swiper('.jsThreadSliderMain', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 0,
		autoHeight: true,
		navigation: {
			nextEl: '.product-hero-main-next',
			prevEl: '.product-hero-main-prev'
		},
		pagination: {
			el: '.product-hero__dots',
			type: 'fraction'
		},
		thumbs: {
			swiper: productTrack
		},

		breakpoints: {
			1100: {
				navigation: false
			}
		},

		on: {}
	})
}
