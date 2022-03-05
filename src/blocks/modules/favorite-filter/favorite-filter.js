const filterTitle = document.querySelectorAll('.favorite-filter .jsFilterTitle')

if (filterTitle) {
	filterTitle.forEach((item) => {
		item.addEventListener('click', (event) => {
			item.closest('.favorite-filter__item').classList.toggle('is-open')
		})
	})
}

const filterToggle = document.querySelector('.jsToggleFilter')
const catalogFilter = document.querySelector('.favorite__filter')

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
