import "./import/modules";

import Modal from 'bootstrap/js/dist/modal';

let favoriteBtns = document.querySelectorAll('.jsFavorite');

for (let i = 0; i < favoriteBtns.length; i++) {
	favoriteBtns[i].addEventListener('click', function (e) {
		e.preventDefault();
		this.classList.toggle('is-active')
	})
}
