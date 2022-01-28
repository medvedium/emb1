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

    trackSliderWrap.innerHTML = trackSlider.innerHTML
    heroSliderWrap.innerHTML = heroSlider.innerHTML

    heroModal.querySelector('.modal-body').append(heroSliderWrap)
    heroModal.querySelector('.modal-footer').append(trackSliderWrap)

    new Swiper('.modal-slider-main', {
      effect: "slide",
      speed: 500,
      slidesPerView: 1,
      // slidesPerGroup: 1,
      spaceBetween: 0,
      // loop: true,
      // navigation: {
      //   nextEl: '.product-hero-main-next',
      //   prevEl: '.product-hero-main-prev',
      // },
      // pagination: {
      //   el: '.product-hero__dots',
      //   type: 'fraction'
      // },
      thumbs: {
        swiper: {
          el: '.modal-slider-track'
        }
      },

      // breakpoints: {
      //   1100: {
      //     navigation: false
      //   }
      // },

      on: {}
    })

  new Swiper('.modal-slider-track', {
    // effect: "slide",
    // speed: 500,
    slidesPerView: 5,
    slidesPerGroup: 1,
    spaceBetween: 0,
    slideToClickedSlide: true,
    // loop: true,
    centeredSlides: true,
    // slidesPerView: 'auto',
    // navigation: {
    //   nextEl: '.product-hero-main-next',
    //   prevEl: '.product-hero-main-prev',
    // },
    // pagination: {
    //   el: '.product-hero__dots',
    //   type: 'fraction'
    // },
    // thumbs: {
    //   swiper: {
    //     el: '.product-hero-track__slider'
    //   }
    // },

    // breakpoints: {
    //   1100: {
    //     navigation: false
    //   }
    // },

    on: {}
  })
  // })
}