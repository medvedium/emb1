import { Modal } from 'bootstrap'

const partnersTrigger = document.querySelectorAll('.jsOpenPartnersModal')

if (partnersTrigger) {
	for (let i = 0; i < partnersTrigger.length; i++) {
		partnersTrigger[i].addEventListener('click', openPartnersModal)
	}

	function openPartnersModal() {
		const partnersModal = document.querySelector('#brands')
		partnersModal.querySelector('.modal-header .h5').textContent = this.dataset.brand

		partnersModal.querySelector('.modal-body').innerHTML = `
      <img src="${this.closest('.partners__item').querySelector('img').src}" alt="">
      ${this.closest('.partners__item').querySelector('.partners__desc').innerHTML}
    `
	}
}
const pageURL = window.location.href
if (pageURL.indexOf('#') !== -1) {
	const hashURL = pageURL.slice(pageURL.indexOf('#') + 1, pageURL.length)
	if (hashURL.length !== 0) {
		const partnersBrands = Array.from(document.querySelectorAll('.jsOpenPartnersModal'))
		const targetBrand = partnersBrands.filter((item) => item.dataset.brand.toLowerCase() === hashURL)
		const partnersModal = document.querySelector('#brands')

		partnersModal.querySelector('.modal-header .h5').textContent = targetBrand[0].dataset.brand
		partnersModal.querySelector('.modal-body').innerHTML = `
      <img src="${targetBrand[0].closest('.partners__item').querySelector('img').src}" alt="">
      ${targetBrand[0].closest('.partners__item').querySelector('.partners__desc').innerHTML}
    `
		let brandModal = new Modal(document.getElementById('brands'), {})
		brandModal.show()
	}
}
