const tabs = document.querySelectorAll('.jsTabs');

for (let a = 0; a < tabs.length; a++) {
	const tabBtns = tabs[a].querySelectorAll('.jsTabsBtn');
	const tabItems = tabs[a].querySelectorAll('.jsTabsItem');


	for (let i = 0; i < tabBtns.length; i++) {
		tabBtns[i].addEventListener('click', function () {
			const id = this.getAttribute('data-id');

			const activeBtn = tabs[a].querySelector('.jsTabsBtn[data-id="' + id + '"]');


			const activeItem = tabs[a].querySelector('.jsTabsItem[data-id="' + id + '"]');


			for (var b = 0; b < tabItems.length; b++) {
				if (tabItems[b].classList.contains('is-active')) {
					tabItems[b].classList.remove('is-active');
					activeItem.classList.add('is-active')
				}
			}

			tabs[a].querySelector('.jsTabsBtn.is-active').classList.remove('is-active');
			this.classList.add('is-active');
		})
	}
}

