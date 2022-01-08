const showMoreTags = document.querySelector('.jsTagsShowMore')

if (showMoreTags) {
	showMoreTags.addEventListener('click', () => {
		document.querySelector('.catalog-tags').classList.toggle('is-open')
	})
}