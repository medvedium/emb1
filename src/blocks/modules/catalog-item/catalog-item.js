const statusItem = document.querySelectorAll('.item-pricing__status')
const catalogInner = document.querySelector('.catalog__inner')

const moveStatusItem = function () {
	statusItem.forEach((item) => {
		const tempItem = document.createElement('div')
		for (let i = 0; i < item.classList.length; i++) {
			tempItem.classList.add(item.classList[i])
		}
		tempItem.innerHTML = item.innerHTML
		if (window.innerWidth <= 600) {
			item.closest('.catalog-item').querySelector('.catalog-item__title').after(tempItem)
			item.remove()
		}
	})
}

moveStatusItem()
window.addEventListener('resize', moveStatusItem)
