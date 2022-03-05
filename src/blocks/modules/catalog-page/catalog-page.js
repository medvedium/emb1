const toggler = document.querySelector('.catalog__controls .jsToggleViews')
const catalogMosaicView = document.querySelector('.catalog__controls .jsMosaicView')
const catalogListView = document.querySelector('.catalog__controls .jsListView')
const catalogInner = document.querySelector('.jsCatalogInner')
const buyBtn = document.querySelectorAll('.item-pricing__btn .button__text')

function textChange() {
	if (buyBtn && window.innerWidth <= 625) {
		buyBtn.forEach((item) => {
			if (item.parentNode.dataset.bsToggle !== 'modal') {
				item.innerHTML = '<svg><use xlink:href="img/icons/icons.svg#buy-cart"></use></svg>'
			} else {
				item.innerHTML = '<svg><use xlink:href="img/icons/icons.svg#bell"></use></svg>'
			}
		})
	} else {
		buyBtn.forEach((item) => {
			if (item.parentNode.dataset.bsToggle !== 'modal') {
				item.innerHTML = 'Купить'
			} else {
				item.innerHTML = 'Уведомить'
			}
		})
	}

	if (catalogInner && catalogInner.classList.contains('mosaic')) {
		buyBtn.forEach((item) => {
			if (item.parentNode.dataset.bsToggle !== 'modal') {
				item.innerHTML = 'Купить'
			} else {
				item.innerHTML = 'Уведомить'
			}
		})
	}
}

textChange()
window.addEventListener('resize', textChange)

const toggleCatalogView = function () {
	if (toggler) {
		if (window.innerWidth <= 424) {
			toggler.style.display = 'none'
			if (catalogInner.classList.contains('mosaic')) {
				catalogInner.classList.remove('mosaic')
			}
		} else {
			toggler.style.display = 'flex'

			if (catalogMosaicView.classList.contains('active')) {
				catalogInner.classList.add('mosaic')
			}
		}

		catalogListView.addEventListener('click', () => {
			if (!catalogListView.classList.contains('active')) {
				catalogListView.classList.add('active')
				catalogMosaicView.classList.remove('active')
				catalogInner.classList.toggle('mosaic')
			}
			textChange()
		})

		catalogMosaicView.addEventListener('click', () => {
			if (!catalogMosaicView.classList.contains('active')) {
				catalogMosaicView.classList.toggle('active')
				catalogListView.classList.toggle('active')
				catalogInner.classList.toggle('mosaic')
			}
			textChange()
		})
	}
}

toggleCatalogView()
window.addEventListener('resize', toggleCatalogView)

const sortProduct = () => {
	const sortBox = document.querySelector('[data-box="sort-prod"]'),
		submenuItems = document.querySelectorAll('[data-box="sort-prod"] .sort-submenu-item')
	try {
		sortBox.addEventListener('click', (e) => {
			let target = e.target

			let title = sortBox.querySelector('.sort-list-title'),
				hiddenInput = sortBox.querySelector('.input')

			if (target.classList.contains('sort-list-title')) {
				if (sortBox.classList.contains('active')) {
					sortBox.classList.remove('active')
					removeEventListener('click', closeMenu)

					removeOverlay()
				} else {
					sortBox.classList.add('active')
					addEventListener('click', closeMenu)

					addOverlay()
				}
			}

			if (target.classList.contains('sort-submenu-item')) {
				submenuItems.forEach((item) => item.classList.remove('active'))
				target.classList.add('active')
				title.textContent = target.textContent
				hiddenInput.value = target.textContent
				removeEventListener('click', closeMenu)
				sortBox.classList.remove('active')
				removeOverlay()
			}
		})
	} catch (e) {}
}

function closeMenu(event) {
	let target = event.target
	let boxTarget = document.querySelector('[data-box="sort-prod"]')

	if (!boxTarget.contains(target)) {
		boxTarget.classList.remove('active')
		removeEventListener('click', closeMenu)
		removeOverlay()
	}
}

function addOverlay() {
	if (window.innerWidth < 561) {
		let overlayHtml = `<div class="overlay" data-box="overlay"></div>`

		document.body.insertAdjacentHTML('beforeend', overlayHtml)
	}
}

function removeOverlay() {
	let overlay = document.querySelector('[data-box="overlay"]')
	if (overlay) {
		overlay.remove()
	}
}

sortProduct()
