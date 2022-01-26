const productQuantity = document.querySelector('.jsProductQuantity')
const productMore = document.querySelector('.jsProductMore')

if (productQuantity) {
	productQuantity.value += ' шт.'
}

if (productMore) {
	productMore.addEventListener('click', (e) => {
		e.preventDefault()
		document.querySelectorAll('.product-tabs__title')[0].click()
	})
}
