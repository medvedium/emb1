const entityLabel = document.querySelectorAll('.jsEntity');

if (entityLabel) {
	for (let i = 0; i < entityLabel.length; i++) {
		const inputOrganization = entityLabel[i].closest('.jsForm').querySelector('.jsInputOrganization');
		const inputInn = entityLabel[i].closest('.jsForm').querySelector('.jsInputInn');
		const inputName = entityLabel[i].closest('.jsForm').querySelector('.jsInputName');

		entityLabel[i].addEventListener('change', function () {
			if (this.classList.contains('jsEntityIndividual')) {
				inputOrganization.classList.add('d-none');
				inputOrganization.querySelector('.jsInput').removeAttribute('required');
				inputOrganization.querySelector('.input').classList.remove('is-error');

				inputInn.classList.add('d-none');
				inputInn.querySelector('.jsInput').removeAttribute('required');
				inputInn.querySelector('.input').classList.remove('is-error');

				inputName.classList.remove('d-none');
				inputName.querySelector('.jsInput').setAttribute('required', 'required');
			} else if (this.classList.contains('jsEntityLegal')) {
				inputOrganization.classList.remove('d-none');
				inputOrganization.querySelector('.jsInput').setAttribute('required', 'required');

				inputInn.classList.remove('d-none');
				inputInn.querySelector('.jsInput').setAttribute('required', 'required');

				inputName.classList.add('d-none');
				inputName.querySelector('.jsInput').removeAttribute('required');
				inputName.querySelector('.input').classList.remove('is-error');
			}
		})
	}
}


const forms = document.querySelectorAll('.jsForm');

for (let i = 0; i < forms.length; i++) {

	let ok = true;
	const btn =  forms[i].querySelector('.jsFormSubmitBtn');
	const inputs = forms[i].querySelectorAll('.jsInput[required]');
	const checkbox = forms[i].querySelector('.jsFormCheckBox');
	const passEq = forms[i].querySelectorAll('.jsInputPasswordEq');

	for (let j = 0; j < inputs.length; j++) {
		inputs[j].addEventListener('input', function() {

			if (!this.classList.contains('jsInputPhone') && !this.classList.contains('jsInputEmail')  && !this.classList.contains('jsInputPasswordEq')) {
				const val = this.value;
				if (val) {
					ok = true
				}
			}

			if (this.classList.contains('jsInputPhone')) {
				let regPhone = new RegExp('(7|8)\\s[\(][0-9]{3}[\)]\\s[0-9]{3}[\-][0-9]{2}[\-][0-9]{2}');

				if(this.value != 0 & regPhone.test(this.value) == true){
					this.closest('.input').classList.remove('is-error')
					ok = true
				} else  {
					this.closest('.input').classList.add('is-error')
					ok = false
				}
			}

			if (this.classList.contains('jsInputEmail')) {
				let regEmail = new RegExp('^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$');

				if(this.value != 0 & regEmail.test(this.value) == true){
					this.closest('.input').classList.remove('is-error')
					ok = true;
				} else  {
					this.closest('.input').classList.add('is-error')
					ok = false;
				}
			}

			//if (this.classList.contains('jsInputPasswordEq')) {

				//if (this.classList.contains('jsInputPasswordEq--1')) {
					//if (this.value !== this.closest('.jsForm').querySelector('.jsInputPasswordEq--2').value) {
						//for (let q = 0; q < passEq.length; q++) {
							//passEq[q].closest('.input').classList.add('is-error');
						//}
						//this.closest('.input').classList.add('is-error');
					//} else  {
						//for (let q = 0; q < passEq.length; q++) {
							//passEq[q].closest('.input').classList.remove('is-error');
						//}
						//this.closest('.input').classList.remove('is-error');
					//}
				//}

				//if (this.classList.contains('jsInputPasswordEq--2')) {
					//if (this.value !== this.closest('.jsForm').querySelector('.jsInputPasswordEq--1').value) {
						//for (let q = 0; q < passEq.length; q++) {
							//passEq[q].closest('.input').classList.add('is-error')
						//}
					//} else  {
						//for (let q = 0; q < passEq.length; q++) {
							//passEq[q].closest('.input').classList.remove('is-error');
						//}
					//}
				//}
			//}

		});
	}


	if (checkbox) {
		checkbox.addEventListener('change', function () {
			if (this.checked && this.classList.contains('is-empty')) {
				this.classList.remove('is-empty');
				ok = true;
			}
		});
	}

	btn.addEventListener('click', function (e) {
		e.preventDefault();

		for (let b = 0; b < forms[i].querySelectorAll('.jsInput[required]').length; b++) {
			if (forms[i].querySelectorAll('.jsInput[required]')[b].value === '') {
				ok = false;
				forms[i].querySelectorAll('.jsInput[required]')[b].closest('.input ').classList.add('is-error')
			}  else {
				// forms[i].querySelectorAll('.jsInput[required]')[b].closest('.input ').classList.remove('is-error')
			}
		}

		if (passEq.length){
			if (
				this.closest('.jsForm').querySelector('.jsInputPasswordEq--1').value ===
				this.closest('.jsForm').querySelector('.jsInputPasswordEq--2').value

				&&  this.closest('.jsForm').querySelector('.jsInputPasswordEq--1').value !== ''
				&&  this.closest('.jsForm').querySelector('.jsInputPasswordEq--2').value !== ''
			) {
				ok = true
				console.log(1)
				for (let q = 0; q < passEq.length; q++) {
					passEq[q].closest('.input').classList.remove('is-error');
				}
			} else  {
				console.log(2)
				ok = false
				for (let q = 0; q < passEq.length; q++) {
					passEq[q].closest('.input').classList.add('is-error');
				}
			}
		}

		if (checkbox) {
			if  (!checkbox.checked) {
				checkbox.classList.add('is-empty');
				ok = false
			} else  {
				checkbox.classList.remove('is-empty')
			}
		}

		if (ok && this.closest('.jsForm').querySelectorAll('.input.is-error').length == 0 ) {

			if (!this.closest('.jsForm').classList.contains('form-with-success')) {
				this.closest('.jsForm').submit();
			} else {
				this.closest('.jsForm').querySelector('.jsFormFront').classList.add('is-hidden');
				this.closest('.jsForm').querySelector('.jsFormSuccess').classList.add('is-visible');
			}
		}

	})

}
