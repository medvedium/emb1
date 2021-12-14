const searchBlockInput = document.querySelector('.jsSearchBlockInput');
const searchBlockTrigger = document.querySelector('.jsSearchBlockTrigger');

if (searchBlockInput) {
	searchBlockInput.addEventListener('focus', function () {
		this.closest('.jsSearchBlock').classList.add('is-active');
	});

	searchBlockInput.addEventListener('blur', function () {
		this.closest('.jsSearchBlock').classList.remove('is-active');
	});
}

if (searchBlockTrigger) {
	searchBlockTrigger.addEventListener('click', function () {
		this.closest('.jsSearchBlock').classList.remove('is-active');
	});
}

