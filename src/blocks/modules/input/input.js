import IMask from 'imask'


const maskOptions = {
	mask: '+{7} (000) 000-00-00'
};

const inputPhone = document.querySelectorAll('.jsInputPhone');
for (let i = 0; i < inputPhone.length; i++) {
	new IMask(inputPhone[i], maskOptions);
}


const input = document.querySelectorAll('.jsInput');

const checkChange = function (that) {
	const val = that.value;
	if (val) {
		that.parentNode.classList.add('is-changed');
	} else {
		that.parentNode.classList.remove('is-changed');
		that.parentNode.classList.remove('is-error');
	}
};

for (let i = 0; i < input.length; i++) {
	input[i].addEventListener('focus', function() {
		this.parentNode.classList.add('is-focused');
		checkChange(this);
	});

	input[i].addEventListener('blur', function() {
		this.parentNode.classList.remove('is-focused');
		checkChange(this);
	});

	input[i].addEventListener('input', function() {
		checkChange(this);
	});
}

const inputPasswordTrigger = document.querySelectorAll('.jsInputPasswordTrigger');

if (inputPasswordTrigger) {
	for (let i = 0; i < inputPasswordTrigger.length; i++) {
		inputPasswordTrigger[i].addEventListener('click', function () {
			const parent  = this.closest('.input');
			const input  = parent.querySelector('.jsInput');

			if (!parent.classList.contains('is-active')){
				parent.classList.add('is-active');
				input.type = 'text';
			} else {
				parent.classList.remove('is-active')
				input.type = 'password';
			}
		})
	}
}

