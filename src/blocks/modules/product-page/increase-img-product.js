import Swiper from 'swiper/bundle'

const heroBlock = document.querySelector('.product-hero__swiper')

function heroDatasetToggle() {
	if (heroBlock) {
		if (window.innerWidth < 960) {
			heroBlock.dataset.bsToggle = ''
		} else if (window.innerWidth >= 960) {
			heroBlock.dataset.bsToggle = 'modal'
		}
	}
}

heroDatasetToggle()
window.addEventListener('resize', heroDatasetToggle)

const imageBlock = document.querySelector('[data-block="product-image-block"]')

if (imageBlock) {
	imageBlock.addEventListener('click', () => {

		const getActiveSlide = function (selector) {
			let activeSlide = 0
			for (let i = 0; i < selector.length; i++) {
				if (selector[i].classList.contains('swiper-slide-active')) {
					activeSlide = i
				}
			}
			return activeSlide
		}

		const heroSlides = document.querySelectorAll('.product-hero__main .product-hero__slide')

		let activeSlide = getActiveSlide(heroSlides)
		console.log(activeSlide);


		const heroModal = document.getElementById('hero')

		heroModal.querySelector('.modal-body').innerHTML = ''
		heroModal.querySelector('.modal-footer').innerHTML = ''

		const trackSlider = document.querySelector('.product-hero-track__slider')
		const heroSlider = document.querySelector('.product-hero__slider')

		const trackSliderWrap = document.createElement('div')
		const heroSliderWrap = document.createElement('div')

		heroSliderWrap.classList.add('modal-slider-main')
		trackSliderWrap.classList.add('modal-slider-track')

		const trackSliderNavPrev = document.createElement('div')
		const trackSliderNavNext = document.createElement('div')

		trackSliderNavPrev.innerHTML = `
      <div class="modal-slider-prev">
        <svg class="icon icon--arrow icon--lg slider__btn-icon">
          <use xlink:href="img/icons/icons.svg#arrow-left"></use>
        </svg>
      </div>
    `

		trackSliderNavNext.innerHTML = `
      <div class="modal-slider-next">
        <svg class="icon icon--arrow icon--lg slider__btn-icon">
          <use xlink:href="img/icons/icons.svg#arrow-right"></use>
        </svg>
      </div>
    `

		trackSliderWrap.innerHTML = trackSlider.innerHTML
		heroSliderWrap.innerHTML = heroSlider.innerHTML

		heroModal.querySelector('.modal-footer').append(trackSliderNavPrev)
		heroModal.querySelector('.modal-footer').append(trackSliderNavNext)

		heroModal.querySelector('.modal-body').append(heroSliderWrap)
		heroModal.querySelector('.modal-footer').append(trackSliderWrap)

heroModal.querySelector('[data-bs-toggle]').dataset.bsToggle = ''



		const modalTrackSlider = new Swiper('.modal-slider-track', {
			spaceBetween: 30,
			slidesPerView: 3,
			direction: 'horizontal',
			freeMode: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			navigation: {
				nextEl: '.modal-slider-next',
				prevEl: '.modal-slider-prev'
			},



			// // initialSlide: activeSlide,
			// slidesPerView: 3,
			// slidesPerGroup: 1,
			// spaceBetween: 30,
			// // slideToClickedSlide: true,
			// // centeredSlides: false,
			// navigation: {
			// 	nextEl: '.modal-slider-next',
			// 	prevEl: '.modal-slider-prev'
			// },

			on: {}
		})

		const modalHeroSlider = new Swiper('.modal-slider-main', {
			spaceBetween: 10,
			slidesPerView: 1,
			thumbs: {
				swiper: modalTrackSlider
			},

			// initialSlide: activeSlide,
			// effect: 'slide',
			// speed: 500,
			// slidesPerView: 1,
			// slidesPerGroup: 1,
			// spaceBetween: 0,
			// // slideToClickedSlide: true,
			// // allowTouchMove: false,
			// navigation: {
			// 	nextEl: '.modal-slider-next',
			// 	prevEl: '.modal-slider-prev'
			// },
			// autoHeight: true,
			// thumbs: {
			// 	swiper: {
			// 		el: '.modal-slider-track'
			// 	}
			// },

			on: {}
		})

		// modalHeroSlider.controller.control = null;

	})

}