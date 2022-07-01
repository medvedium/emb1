const orderSelectElems = Array.from(document.getElementsByClassName('jsOrderSelect'));

if (orderSelectElems.length) {
    orderSelectElems.forEach((orderSelectEl) => {
        const selectTitle = orderSelectEl.querySelector('.jsOrderSelectTitle');
        const selectTitleText = orderSelectEl.querySelector('.jsOrderSelectTitleText');
        const selectItemEles = Array.from(orderSelectEl.getElementsByClassName('jsOrderSelectListItem'))

        selectTitle.addEventListener('click', () => {
            orderSelectEl.classList.toggle('is-open');
        });

        selectItemEles.forEach((selectItemEl) => {
            selectItemEl.addEventListener('click', () => {
                selectTitleText.textContent = selectItemEl.textContent;
                
                orderSelectEl.classList.toggle('is-open');
            })
        })
    })
}