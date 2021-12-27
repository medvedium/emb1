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
	filterTitle.forEach(item => {
		item.addEventListener('click', (event) => {
			item.closest('.catalog-filter__item').classList.toggle('is-open')
		})
	})
}