const mapToggler = document.querySelectorAll('.jsMapToggler')

if (mapToggler) {
  mapToggler.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active')
      item.closest('.contacts-tab__inner').querySelectorAll('.map-block__content').forEach(item => {
        item.classList.toggle('active')
      })
    })
  })
}
