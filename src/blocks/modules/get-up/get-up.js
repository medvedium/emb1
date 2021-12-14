const getUp = document.querySelector('.jsGetUp');

if (getUp) {
	getUp.addEventListener('click', function () {
		(function smoothscroll(){
			const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
			if (currentScroll > 0) {
				window.requestAnimationFrame(smoothscroll);
				window.scrollTo (0,currentScroll - (currentScroll/5));
			}
		})();
	})
}


const body = document.querySelector('.body');

const topBodyOffset = function () {
	if (body.getBoundingClientRect().top < (-350)) {
		getUp.classList.add('is-active')
	} else {
		getUp.classList.remove('is-active')
	}

};

document.addEventListener('DOMContentLoaded', function () {
	if (getUp) {
		topBodyOffset()
	}
});

document.addEventListener('scroll', function () {
	if (getUp) {
		topBodyOffset()
	}
});
