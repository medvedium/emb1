import noUiSlider from 'nouislider'

const priceSlider = document.querySelector('#price-slider')

if (priceSlider) {
	noUiSlider.create(priceSlider, {
		start: [20, 80],
		connect: true,
		range: {
			min: 0,
			max: 100
		}
	})
}

const filterTitle = document.querySelectorAll('.jsFilterTitle')

if (filterTitle) {
	filterTitle.forEach((item) => {
		item.addEventListener('click', (event) => {
			item.closest('.catalog-filter__item').classList.toggle('is-open')
		})
	})
}

const filterToggle = document.querySelector('.jsToggleFilter')
const catalogFilter = document.querySelector('.catalog__filter')
const catalogFilterClose = document.querySelector('.filter-header__close')

if (filterToggle) {
	filterToggle.addEventListener('click', () => {
		catalogFilter.classList.add('is-open')
		document.body.style.overflow = 'hidden'
		catalogFilter.addEventListener('click', (event) => {
			const { target } = event
			if (target === document.querySelector('.jsCloseFilter')) {
				catalogFilter.classList.remove('is-open')
				document.body.style.overflow = 'auto'
			}
		})
		window.addEventListener('keyup', (event) => {
			if (event.code === 'Escape' && catalogFilter.classList.contains('is-open')) {
				catalogFilter.classList.remove('is-open')
				document.body.style.overflow = 'auto'
			}
		})
	})
}
