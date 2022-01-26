const colorChooseToggle = document.querySelector('.jsColorChooseToggle')
const colorChooseWrap = document.querySelector('.jsColorChooseWrap')

if (colorChooseToggle) {
	colorChooseToggle.addEventListener('click', () => {
		colorChooseWrap.classList.add('is-open')
		document.body.style.overflow = 'hidden'

		colorChooseWrap.addEventListener('click', (event) => {
			const { target } = event
			if (target.classList.contains('jsColorChooseWrap') || target.closest('.color-choose__submit')) {
				console.log(target)
				colorChooseWrap.classList.remove('is-open')
				document.body.style.overflow = 'auto'
			}
		})
	})
}
