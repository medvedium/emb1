const compilationBtns = document.querySelectorAll('.jsCompilationBtn')


for (let i = 0; i < compilationBtns.length; i++) {
	compilationBtns[i].addEventListener('click', function () {
		this.closest('.jsCompilation').classList.add('is-active');
	})
}
