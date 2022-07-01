const accordionElems = Array.from(document.getElementsByClassName('jsAccordion'));

if (accordionElems.length) {
    accordionElems.forEach((accordionEl) => {
        const accordionTrigger = accordionEl.querySelector('.jsAccordionTrigger');

        accordionTrigger.addEventListener('click', () => {
            accordionEl.classList.toggle('is-open')
        })
    })
}