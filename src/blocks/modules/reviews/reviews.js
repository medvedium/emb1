const showReviewsForm = document.querySelector('.jsReviewsShowForm')
const reviewsForm = document.querySelector('.jsReviewsForm')
const reviewsBtnText = document.querySelector('.jsReviewBtnText')
const reviewsSubmit = document.querySelector('.jsReviewsSubmit')

if (showReviewsForm) {
	showReviewsForm.addEventListener('click', () => {
		showReviewsForm.classList.toggle('is-active')

		if (showReviewsForm.classList.contains('is-active')) {
			reviewsBtnText.textContent = 'Отменить'
		} else {
			reviewsBtnText.textContent = 'Оставить отзыв'
		}

		reviewsForm.classList.toggle('is-open')

		reviewsSubmit.addEventListener('click', (event) => {
			event.preventDefault()
			reviewsForm.innerHTML = `
      <div class="form__success-inner wide">
            <div class="form__success-icon">
              <img src="img/big-icons/check.svg" alt="" />
            </div>
            <div class="text-center form__success-title mb-2">
              <div class="h4">Готово</div>
            </div>
            <div class="text-center form__success-desc">
              <div class="text text--color--gray-4">
                Ваш отзыв успешно отправлен. <br> 
                Скоро он появится на сайте
              </div>
            </div>
          </div>`
		})
	})
}
