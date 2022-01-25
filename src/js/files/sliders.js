/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
// import Swiper, { Navigation, Pagination } from 'swiper'
import Swiper from "swiper/bundle";
// import Swiper from "swiper/bundle";
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
// import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

function bildSliders() {
	//BildSlider
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)')
	if (sliders) {
		sliders.forEach((slider) => {
			slider.parentElement.classList.add('swiper')
			slider.classList.add('swiper-wrapper')
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide')
			}
		})
	}
}

// Инициализация слайдеров
function initSliders() {
	bildSliders()
	// Перечень слайдеров
	if (document.querySelector('.product-hero-track__slider--equipment')) {
		new Swiper('.product-hero-track__slider--equipment', {
			slidesPerView: 4,
			spaceBetween: 12,
			slidesPerGroup: 1,
			speed: 800,
			direction: 'vertical',
			mousewheel: {
				sensitivity: 1
			},
			navigation: {
				prevEl: '.product-hero-prev',
				nextEl: '.product-hero-next'
			},
			on: {
			}
		})
	}
	if (document.querySelector('.product-hero__slider--equipment')) {
		new Swiper('.product-hero__slider--equipment', {
			effect: "slide",
			speed: 500,
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 0,
			navigation: {
				nextEl: '.product-hero-main-next',
				prevEl: '.product-hero-main-prev',
			},
			pagination: {
				el: '.product-hero__dots',
				type: 'fraction'
			},
			thumbs: {
				swiper: {
					el: '.product-hero-track__slider'
				}
			},

			breakpoints: {
				1100: {
					navigation: false
				}
			},

			on: {}
		})
	}
	if (document.querySelector('.product-hero-track__slider--flizelin')) {
		new Swiper('.product-hero-track__slider--flizelin', {
			slidesPerView: 3,
			spaceBetween: 12,
			slidesPerGroup: 1,
			speed: 800,
			direction: 'vertical',
			mousewheel: {
				sensitivity: 1
			},
			navigation: {
				prevEl: '.product-hero-prev',
				nextEl: '.product-hero-next'
			},
			on: {}
		})
	}
	if (document.querySelector('.product-hero__slider--flizelin')) {
		new Swiper('.product-hero__slider--flizelin', {
			effect: "slide",
			speed: 500,
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 0,
			navigation: {
				nextEl: '.product-hero-main-next',
				prevEl: '.product-hero-main-prev',
			},
			pagination: {
				el: '.product-hero__dots',
				type: 'fraction'
			},
			thumbs: {
				swiper: {
					el: '.product-hero-track__slider--flizelin'
				}
			},

			breakpoints: {
				1100: {
					navigation: false
				}
			},

			on: {}
		})
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders()

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll')
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index]
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar')
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true
				}
			})
			sliderScroll.scrollbar.updateSize()
		}
	}
}

window.addEventListener('load', function (e) {
	// Запуск инициализации слайдеров
	initSliders()
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
})
