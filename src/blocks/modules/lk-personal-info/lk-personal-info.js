const personalForm = document.querySelector(".personal-form");

if (personalForm) {
  function toggleFormTabs() {
    const personalFormRadio = document.querySelectorAll(".personal-form .radio-btn__input");
    const personalFormTabs = document.querySelectorAll(".personal-form .personal-form__inner");

    for (let i = 0; i < personalFormRadio.length; i++) {
      if (personalFormRadio[i].checked) {
        personalFormTabs.forEach((item, index) => {
          if (index === i) {
            if (!item.classList.contains("active")) {
              item.classList.add("active");
            }
          } else {
            if (item.classList.contains("active")) {
              item.classList.remove("active");
            }
          }
        });
      }
    }
  }

  toggleFormTabs()

  personalForm.addEventListener("change", toggleFormTabs);

}

const personalMenuToggler = document.querySelector('.personal-menu__item.active a')

if (personalMenuToggler) {
  personalMenuToggler.addEventListener('click', event => {
    event.preventDefault()
    personalMenuToggler.closest('.personal-menu__list').classList.toggle('is-open')
  })
}