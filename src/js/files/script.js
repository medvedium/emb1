// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


let favoriteBtns = document.querySelectorAll('.jsFavorite');

for (let i = 0; i < favoriteBtns.length; i++) {
	favoriteBtns[i].addEventListener('click', function (e) {
		e.preventDefault();
		this.classList.toggle('is-active')
	})
}
