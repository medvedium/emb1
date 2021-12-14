const triggers = document.querySelectorAll('.jsCatalogTrigger');

const catalogToggle = function() {
	const catalog = document.querySelector('.jsCatalog');
	const html = document.querySelector('html');


	catalog.classList.toggle('is-active');
	html.classList.toggle('is-fixed');
};


for (let i = 0; i < triggers.length; i++) {
	triggers[i].addEventListener('click', function (e) {
		e.preventDefault();
		catalogToggle();
	})
}
