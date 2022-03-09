const toggler = document.querySelector('.jsToggleViews')
const favoriteMosaicView = document.querySelector('.jsMosaicView')
const favoriteListView = document.querySelector('.jsListView')
const favoriteInner = document.querySelector('.jsFavoriteInner')
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

	if (favoriteInner && favoriteInner.classList.contains('mosaic')) {
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

const toggleFavoriteView = function () {
	if (toggler) {
		if (window.innerWidth <= 424) {
			toggler.style.display = 'none'
			if (favoriteInner.classList.contains('mosaic')) {
				favoriteInner.classList.remove('mosaic')
			}
		} else {
			toggler.style.display = 'flex'

			if (favoriteMosaicView.classList.contains('active')) {
				favoriteInner.classList.add('mosaic')
			}
		}

		favoriteListView.addEventListener('click', () => {
			if (!favoriteListView.classList.contains('active')) {
				favoriteListView.classList.add('active')
				favoriteMosaicView.classList.remove('active')
				favoriteInner.classList.toggle('mosaic')
			}
			textChange()
		})

		favoriteMosaicView.addEventListener('click', () => {
			if (!favoriteMosaicView.classList.contains('active')) {
				favoriteMosaicView.classList.toggle('active')
				favoriteListView.classList.toggle('active')
				favoriteInner.classList.toggle('mosaic')
			}
			textChange()
		})
	}
}

toggleFavoriteView()
window.addEventListener('resize', toggleFavoriteView)

// Очистка избранного

const cleanFavorite = document.querySelector('.jsCleanFavorite')

if (cleanFavorite) {
	cleanFavorite.addEventListener('click', () => {
		document.querySelector('.favorite__inner').innerHTML = ''
	})
}