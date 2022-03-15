const confirmService = document.querySelector('.jsConfirmService')

if (confirmService) {
	confirmService.addEventListener('click', function (event) {
		event.preventDefault()
		this.closest('.service__form').innerHTML = `
          <div class="form__success-inner wide">
            <div class="form__success-icon">
              <img src="img/big-icons/check.svg" alt="" />
            </div>
            <div class="text-center form__success-title mb-2">
              <div class="h4">Готово</div>
            </div>
            <div class="text-center form__success-desc">
              <div class="text text--color--gray-4">
                Спасибо за обращение. <br>
                В ближайшее время с вами свяжется наш менеджер
              </div>
            </div>
          </div>
    `
	})
}
