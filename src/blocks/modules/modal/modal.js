let cityModalTrigger = document.querySelector('.jsCityModalTrigger');

if (cityModalTrigger) {
	cityModalTrigger.addEventListener('click', function () {
		if (window.matchMedia("(min-width: 1024px)").matches) {
			document.querySelector('.modal-backdrop').classList.add('modal-backdrop--transparent');
			document.querySelector('.body').classList.remove('modal-open');
			document.querySelector('.body').removeAttribute('style');
		}
	});
}

