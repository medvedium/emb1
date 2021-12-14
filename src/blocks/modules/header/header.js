const triggers = document.querySelectorAll('.jsMenuTrigger');

const menuToggle = function() {
	const menu = document.querySelector('.jsMenu');
	const html = document.querySelector('html');
	const headerBg = document.querySelector('.jsHeaderBg');

	menu.classList.toggle('is-active');
	headerBg.classList.toggle('is-active');
	html.classList.toggle('is-fixed');
};


for (let i = 0; i < triggers.length; i++) {
	triggers[i].addEventListener('click', function (e) {
		e.preventDefault();
		menuToggle();
	})
}

const headerCatalogTrigger = document.querySelectorAll('.jsHeaderCatalogTrigger');

for (let i = 0; i < headerCatalogTrigger.length; i++) {
	headerCatalogTrigger[i].addEventListener('click', function (e) {
		if (window.matchMedia("(max-width: 1023px)").matches) {
			e.preventDefault()
			this.nextElementSibling.classList.add('is-active')
		}
	})
}

const closeCategory = document.querySelectorAll('.jsCloseCategory');

for (let i = 0; i < closeCategory.length; i++) {
	closeCategory[i].addEventListener('click', function () {
		document.querySelector('.jsHeaderCatalogCategory.is-active').classList.remove('is-active')
	})
}

const userCartModalTrigger = document.querySelector('.jsUserCartModalTrigger');
const userCartModal = document.querySelector('.jsCartModal');

if (userCartModalTrigger) {
	const toggleMenu = function toggleMenu() {
		userCartModal.classList.toggle('is-active');
	};
	userCartModalTrigger.addEventListener('click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		toggleMenu();
	});

	document.addEventListener('click', function (e) {
		const target = e.target;
		const its_menu = target == userCartModal || userCartModal.contains(target);
		const its_hamburger = target == userCartModalTrigger;
		const menu_is_active = userCartModal.classList.contains('is-active');

		if (!its_menu && !its_hamburger && menu_is_active) {
			toggleMenu();
		}
	});
}



 function headerFixedToggle() {
 	const  header = document.querySelector('.jsHeader'),
 		// headerSourceBottom = 32+18;
 		headerSourceBottom = header.offsetHeight;


 	if (header.classList.contains('header--fixed') && window.pageYOffset < headerSourceBottom) {
 		header.classList.remove('header--fixed');
 	} else if (window.pageYOffset > headerSourceBottom) {
 		header.classList.add('header--fixed');
 	}
 }

 headerFixedToggle();

 window.addEventListener('scroll', function() {
 	headerFixedToggle();
 });
