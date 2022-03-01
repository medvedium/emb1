const partnersTrigger = document.querySelectorAll(".jsOpenPartnersModal");

if (partnersTrigger) {
  for (let i = 0; i < partnersTrigger.length; i++) {
    partnersTrigger[i].addEventListener("click", openPartnersModal);

  }

  function openPartnersModal() {
    const partnersModal = document.querySelector("#brands");
    partnersModal.querySelector(".modal-header .h5").textContent = this.dataset.brand;

    partnersModal.querySelector('.modal-body').innerHTML = `
      <img src="${this.closest('.partners__item').querySelector('img').src}" alt="">
      ${this.closest('.partners__item').querySelector('.partners__desc').innerHTML}
    `
  }
}