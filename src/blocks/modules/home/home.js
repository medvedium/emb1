import { Modal } from 'bootstrap'

const citySuggestModal = new Modal(document.getElementById('city-suggest'), {})

if (!localStorage.getItem('cityChosen')) {
	citySuggestModal.show()
}
