const increaseImg = () =>{
  const imageBlock = document.querySelector('[data-block="product-image-block"]');

  try {
    if(window.innerWidth > 610) {
      imageBlock.addEventListener('click', (e)=>{
        let target = e.target;

        if(target.classList.contains('img') && target.closest('.main-img') && !target.dataset.video) {

          let divModalWrap    = document.createElement('div'),
            divModal        = document.createElement('div');

          divModalWrap.classList.add('modal-wrap');
          divModal.classList.add('modal');
          divModal.classList.add('modal_860');
          divModal.classList.add('slide-in-long');
          divModal.classList.add('modal_photogallary');

          document.body.appendChild(divModalWrap);
          divModalWrap.appendChild(divModal);

          let navImg  = target.closest('.img-block').querySelectorAll('.img-nav .img'),
            mainImg = target.closest('.img-block').querySelectorAll('.main-img .img');

          let imgNavBlock = document.createElement('div');
          imgNavBlock.classList.add('swiper-wrapper');

          let mainImgBlock = document.createElement('div');
          mainImgBlock.classList.add('swiper-wrapper');

          if(navImg[0]) {
            navImg.forEach(item => {
              imgNavBlock.innerHTML = imgNavBlock.innerHTML + `<div class="swiper-slide nav-item">
                                                                                <img src="${item.src}" alt="" class="img">
                                                                             </div>`;
            });
          }

          if(mainImg[0]) {
            mainImg.forEach(item => {
              if(!item.dataset.video) {
                mainImgBlock.innerHTML = mainImgBlock.innerHTML + ` <div class="swiper-slide">
                                                                                        <img src="${item.src}" alt="" class="img">
                                                                                    </div>`;
              } else {
                mainImgBlock.innerHTML = mainImgBlock.innerHTML + ` <div class="swiper-slide">
                                                                                        <iframe width="100%" height="450" src="${item.dataset.video}" allowfullscreen></iframe>
                                                                                    </div>`;
              }
            });
          }

          divModal.innerHTML = `
                        <div class="close-modal"></div>
                        <div class="img-block" data-block="product-image-block">
                            <div class="main-img" >
                                <div class="swiper-container" data-slider="main-img-slider">
                                    <div class="swiper-wrapper">
                                        ${mainImgBlock.innerHTML}
                                    </div>
                                </div>
                            </div>
                            <div class="img-nav-wrap">
                                <div class="img-nav swiper-container" data-slider="nav-img-prod">
                                    <div class="swiper-wrapper">
                                        ${imgNavBlock.innerHTML}
                                    </div>
                                </div>
                                <div class="slider-prev img-nav-prev"></div>
                                <div class="slider-next img-nav-next"></div>
                            </div>
                        </div>
                    
                    `;

          // слайдер в модалке
          const productCardSliderNavBlock1 = document.querySelector('.modal-wrap [data-slider="nav-img-prod"]');
          const productCardSliderMainBlock1 = document.querySelector('.modal-wrap [data-slider="main-img-slider"]');

          let productCardSliderNav = new Swiper(productCardSliderNavBlock1, {
            spaceBetween: 10,
            slidesPerView: 3,
            direction: 'horizontal',
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            navigation: {
              nextEl: '.modal-wrap .img-nav-next',
              prevEl: '.modal-wrap .img-nav-prev',
            },
          });

          let productCardSliderMain = new Swiper(productCardSliderMainBlock1, {
            spaceBetween: 10,
            thumbs: {
              swiper: productCardSliderNav
            }
          });
          //END слайдер в модалке
          let modalBlock = document.querySelector('.modal-wrap');

          modalBlock.addEventListener('click', (e) => {
            let target = e.target;

            if(target.classList.contains('modal-wrap') || target.classList.contains('close-modal')) {
              modalBlock.remove();
            }
          });
          // закрыть слайдер


        }
      });
    }
  } catch(e){}
};

export default increaseImg;