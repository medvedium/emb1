const footerMenuTrigger = document.querySelectorAll('.jsFooterMenuTrigger');

for (let i = 0; i < footerMenuTrigger.length; i++) {
	footerMenuTrigger[i].addEventListener('click', function () {
		this.parentNode.classList.toggle('is-active')
	})
}
