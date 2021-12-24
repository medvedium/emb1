import "@babel/polyfill";
import "../scss/style.scss";
import "./import/modules.js";

import Modal from 'bootstrap/js/dist/modal.js';

let favoriteBtns = document.querySelectorAll('.jsFavorite');

for (let i = 0; i < favoriteBtns.length; i++) {
	favoriteBtns[i].addEventListener('click', function (e) {
		e.preventDefault();
		this.classList.toggle('is-active')
	})
}
