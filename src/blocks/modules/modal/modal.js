let cityModalTrigger = document.querySelector('.jsCityModalTrigger');

if (cityModalTrigger) {
	cityModalTrigger.addEventListener('click', function () {
		if (window.matchMedia("(min-width: 1024px)").matches) {
			document.querySelector('.modal-backdrop').classList.add('modal-backdrop--transparent');
			document.querySelector('.body').classList.remove('modal-open');
			document.querySelector('.body').removeAttribute('style');
		}
	});
}


const yPickupMap = document.getElementById('y-pickup-map');

ymaps.ready(init);

function init(){
    var myMap = new ymaps.Map(yPickupMap, {
        center: [59.939600, 30.430385],
        zoom: 16
    });

    myMap.geoObjects.add(new ymaps.Placemark([59.939600, 30.430385], {
        balloonContent: 'Санкт-Петербург, ул. Магнитогорская, д. 23, корп. 1'
    }, {
        preset: 'islands#greenDotIconWithCaption',
        iconColor: '#00adef'
    }))
}


const paymentsMethodElems = Array.from(document.getElementsByClassName('jsPaymentsMethod'));

if (paymentsMethodElems.length) {
    const paymentsMethodText = document.querySelector('.jsPaymentsMethodText');
    const paymentsBtn = document.querySelector('.jsPaymentsMethodBtn');
    let currentText,
        currentBtnText,
        currentBtnClasses,
        activeInput;

    paymentsMethodElems.forEach((paymentsMethodEl) => {
        const input = paymentsMethodEl.querySelector('.jsPaymentsMethodInput');
        
        input.addEventListener('change', () => {
            const newPayments = paymentsMethodEl.querySelector('.jsPaymentsMethodRadioText');

            paymentsMethodText.textContent = newPayments.textContent;

            switch(input.getAttribute('data-payments-method')) {
                case 'cash':
                    paymentsBtn.removeAttribute('download');
                    paymentsBtn.classList.remove('button--blue');
                    paymentsBtn.classList.add('button--gray');
                    paymentsBtn.classList.add('order-details__payment-btn--disable');

                    paymentsBtn.textContent = 'Оплата в магазине'

                    break;
                case 'cashless':
                    paymentsBtn.classList.remove('button--gray');
                    paymentsBtn.classList.remove('order-details__payment-btn--disable');
                    paymentsBtn.classList.add('button--blue');

                    paymentsBtn.setAttribute('download', input.getAttribute('data-payment-path'))
                    paymentsBtn.textContent = 'Скачать счёт'
                    
                    break;
                case 'online':
                    paymentsBtn.removeAttribute('download');
                    paymentsBtn.classList.remove('button--gray');
                    paymentsBtn.classList.remove('order-details__payment-btn--disable');
                    paymentsBtn.classList.add('button--blue');
                    
                    paymentsBtn.textContent = 'Оплатить'
                    
                    break;
            }
        })
    })

    const changePaymentsMethod = document.querySelector(`[data-bs-target="#payments-method"]`);
    const cancelChangePaymentsMethodElems = document.getElementById('payments-method').querySelectorAll(`[data-bs-dismiss="modal"]`);

    changePaymentsMethod.addEventListener('click', () => {
        currentText = paymentsMethodText.textContent;
        currentBtnText = paymentsBtn.textContent;
        currentBtnClasses = Array.from(paymentsBtn.classList);

        activeInput = document.querySelector('.jsPaymentsMethodInput[checked]')
    });

    cancelChangePaymentsMethodElems.forEach((cancelBtn) => {
        cancelBtn.addEventListener('click', () => {
            paymentsMethodText.textContent = currentText;
            paymentsBtn.textContent = currentBtnText;
            paymentsBtn.classList = '';
    
            for (let cl of currentBtnClasses) {
                paymentsBtn.classList.add(cl);
            }

            activeInput.checked = true;
        });
    })
}