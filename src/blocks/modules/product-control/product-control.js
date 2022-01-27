const productQuantity = document.querySelector('.jsProductQuantity')
const productMore = document.querySelector('.jsProductMore')
const productMoreTab = document.querySelector('.jsProductMoreTab')

if (productQuantity) {
	productQuantity.value += ' шт.'
}

if (productMore) {
	productMore.addEventListener('click', (e) => {
		e.preventDefault()
		productMoreTab.click()
	})
}

const deliveryScrollBtn = document.querySelector('.jsDeliveryScrollBtn')
const deliveryTab = document.querySelector('.jsDeliveryTab')

if (deliveryScrollBtn) {
	deliveryScrollBtn.addEventListener('click', () => {
		deliveryTab.click()
	})
}



const colorChooseBtn = document.querySelector('.jsColorChoose')
const colorChooseTab = document.querySelector('.jsColorChooseTab')

if (colorChooseBtn) {
	colorChooseBtn.addEventListener('click', (event) => {
		event.preventDefault()
		colorChooseTab.click()
	})
}