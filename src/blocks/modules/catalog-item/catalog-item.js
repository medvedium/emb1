const itemCard = document.querySelectorAll('.catalog-item')
const moveStatusItem = function() {
	itemCard.forEach((item) => {

			if (window.innerWidth <= 625 && item.querySelector('.item-pricing .item-pricing__status')) {
				const status = item.querySelector('.item-pricing .item-pricing__status')
				const tempItem = document.createElement('div')
				for (let i = 0; i < status.classList.length; i++) {
					tempItem.classList.add(status.classList[i])
				}
				tempItem.innerHTML = status.innerHTML
				item.querySelector('.catalog-item__title').after(tempItem)
				status.remove()
			} else if (window.innerWidth >= 625 && item.querySelector('.catalog-item__description .item-pricing__status')) {
				const status = item.querySelector('.catalog-item__description .item-pricing__status')
				const tempItem = document.createElement('div')
				for (let i = 0; i < status.classList.length; i++) {
					tempItem.classList.add(status.classList[i])
				}
				tempItem.innerHTML = status.innerHTML
				item.querySelector('.item-pricing__price').after(tempItem)
				status.remove()
			}
	})
}

moveStatusItem()
window.addEventListener('resize', moveStatusItem)