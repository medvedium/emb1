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

const reviewsItems = document.querySelectorAll('.reviews-item__inner-wrap')

if (reviewsItems) {
	for (let i = 0; i < reviewsItems.length; i++) {
		if (reviewsItems[i].offsetHeight >= 385) {
			reviewsItems[i].classList.add('is-hide')

			const showMoreBtn = document.createElement('button')
			showMoreBtn.classList.add('reviews-item__show-more')
			showMoreBtn.innerHTML = `
			<span>
				<svg class="icon icon--lg">
					<use xlink:href="img/icons/icons.svg#union"></use>
				</svg>
			</span>
			`

			reviewsItems[i].append(showMoreBtn)

			showMoreBtn.addEventListener('click', function() {
				this.closest('.reviews-item__inner-wrap').classList.remove('is-hide')
				this.remove()
			})
		}
	}
}