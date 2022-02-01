import Swiper from "swiper/bundle";

const imageBlock = document.querySelector('[data-block="product-image-block"]')

if (imageBlock) {
  // imageBlock.addEventListener('click', () => {

  const heroModal = document.getElementById('hero')

    heroModal.querySelector('.modal-body').innerHTML = ''
    heroModal.querySelector('.modal-footer').innerHTML = ''

    const trackSlider = document.querySelector('.product-hero-track__slider')
    const heroSlider = document.querySelector('.product-hero__slider')


    const trackSliderWrap = document.createElement('div')
    const heroSliderWrap = document.createElement('div')

    heroSliderWrap.classList.add('modal-slider-main')
    trackSliderWrap.classList.add('modal-slider-track')

  const trackSliderNavPrev = document.createElement('div')
  const trackSliderNavNext = document.createElement('div')

  trackSliderNavPrev.innerHTML =
    `
      <div class="modal-slider-prev">
        <svg class="icon icon--arrow icon--lg slider__btn-icon">
          <use xlink:href="img/icons/icons.svg#arrow-left"></use>
        </svg>
      </div>
    `

   trackSliderNavNext.innerHTML =
    `
      <div class="modal-slider-next">
        <svg class="icon icon--arrow icon--lg slider__btn-icon">
          <use xlink:href="img/icons/icons.svg#arrow-right"></use>
        </svg>
      </div>
    `

    trackSliderWrap.innerHTML = trackSlider.innerHTML
    heroSliderWrap.innerHTML = heroSlider.innerHTML

  heroModal.querySelector('.modal-footer').append(trackSliderNavPrev)
  heroModal.querySelector('.modal-footer').append(trackSliderNavNext)

    heroModal.querySelector('.modal-body').append(heroSliderWrap)
    heroModal.querySelector('.modal-footer').append(trackSliderWrap)


    new Swiper('.modal-slider-main', {
      effect: "slide",
      speed: 500,
      slidesPerView: 1,
      spaceBetween: 0,
      allowTouchMove: false,
      navigation: false,
      thumbs: {
        swiper: {
          el: '.modal-slider-track'
        }
      },


      on: {}
    })

  new Swiper('.modal-slider-track', {
    slidesPerView: 3,
    spaceBetween: 30,
    slideToClickedSlide: true,
    centeredSlides: true,
    navigation: {
      nextEl: '.modal-slider-next',
      prevEl: '.modal-slider-prev',
    },

    on: {}
  })
  // })
}