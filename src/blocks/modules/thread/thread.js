const threadBuyBtn = document.querySelector('.jsThreadBuy')
const threadAddToCart = document.querySelectorAll('.item-thread__to-cart-text')

for (let i = 0; i < threadAddToCart.length; i++) {
	threadAddToCart[i].addEventListener('click', function () {
		threadBuyBtn.addEventListener('click', () => {
			this.closest('.item-thread').classList.add('is-in-cart')
		})

		const input = document.querySelector('#thread-buy').querySelector('.jsProductQuantity')
		if (!input.value.includes('боб.')) {
			input.value = input.value + ' боб.'
		}
	})
}

