// Очистка корзины

const cleanCart = document.querySelector('.jsCleanCart')

if (cleanCart) {
	cleanCart.addEventListener('click', () => {
		document.querySelector('.cart-list').innerHTML = ''
	})
}

// Удалить подсказку
const removeAdvice = document.querySelectorAll('.jsRemoveAdvice')

if (removeAdvice) {
	removeAdvice.forEach((removeAdviceBtn) => {
		removeAdviceBtn.addEventListener('click', () => {
			removeAdviceBtn.closest('.cart-advices__item').remove()
		})
	})
}

const useBonus = document.querySelector('.jsUseBonus')
const bonusContent = document.querySelector('.jsBonusContent')

if (useBonus) {
	useBonus.querySelector('.checkbox__input').addEventListener('change', () => {
		if (useBonus.querySelector('.checkbox__input').checked) {
			bonusContent.classList.add('is-open')
		} else if (bonusContent.classList.contains('is-open')) {
			bonusContent.classList.remove('is-open')
		}
	})
}

const usePromocode = document.querySelector('.jsUsePromocode')
const promocodeContent = document.querySelector('.jsPromocodeContent')

if (usePromocode) {
	usePromocode.querySelector('.checkbox__input').addEventListener('change', () => {
		if (usePromocode.querySelector('.checkbox__input').checked) {
			promocodeContent.classList.add('is-open')
		} else if (promocodeContent.classList.contains('is-open')) {
			promocodeContent.classList.remove('is-open')
		}
	})
}

const promocodeInput = document.querySelector('.jsPromocodeInput')
const promocodeCheck = document.querySelector('.jsPromocodeCheck')
const promocodeStatus = document.querySelector('.jsPromocodeStatus')

if (promocodeInput && promocodeCheck) {
	// Перевод вводимого текста в верхний регистр
	promocodeInput.addEventListener('input', () => {
		promocodeInput.value = promocodeInput.value.toUpperCase()
	})

	promocodeCheck.addEventListener('click', () => {
		// Отмена корректного промокода
		function promocodeCancel() {
			promocodeCheck.textContent = 'Применить'
			promocodeInput.classList.remove('correct')
			promocodeStatus.classList.remove('correct')
			promocodeInput.removeAttribute('readonly')
			promocodeInput.value = ''

			promocodeCheck.removeEventListener('click', promocodeCancel)
		}

		if (promocodeInput.value === 'CORRECT') {
			// Случай корректного промокода
			if (promocodeStatus.classList.contains('incorrect')) {
				promocodeStatus.classList.remove('incorrect')
			}
			if (promocodeInput.classList.contains('incorrect')) {
				promocodeInput.classList.remove('incorrect')
			}
			promocodeInput.classList.add('correct')
			promocodeStatus.textContent = 'Промокод применен'
			promocodeStatus.classList.add('correct')
			promocodeCheck.textContent = 'Отменить'
			promocodeInput.setAttribute('readonly', 'readonly')

			promocodeCheck.addEventListener('click', promocodeCancel)
		} else {
			// Случай некорректного промокода
			promocodeInput.classList.add('incorrect')
			promocodeStatus.textContent = 'Неверный промокод'
			promocodeStatus.classList.add('incorrect')
		}
	})
}

// Удаление элемента корзины с подтверждением
let removeCartItem = document.querySelectorAll('.jsRemoveCartItem')

for (let i = 0; i < removeCartItem.length; i++) {
	removeCartItem[i].addEventListener('click', function () {
		document.querySelector('.jsRemoveCartItemConfirm').addEventListener('click', () => {
			this.closest('.cart-item').remove()
		})
	})
}