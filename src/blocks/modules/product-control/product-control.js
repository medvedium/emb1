const productQuantity = document.querySelector('.jsProductQuantity')
const productMore = document.querySelector('.jsProductMore')

productQuantity.value += ' шт.'

productMore.addEventListener('click', (e) => {
  e.preventDefault()
  document.querySelectorAll('.product-tabs__title')[0].click()
})