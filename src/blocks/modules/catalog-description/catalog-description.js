const descriptionShowMore = document.querySelector('.jsDescriptionShowMore')
const description = document.querySelector('.jsDescription')

if (descriptionShowMore) {
	descriptionShowMore.addEventListener('click', () => {
		description.querySelectorAll('p').forEach(p => {
			p.style.display = 'block'
			p.style.opacity = '1'
		})
		descriptionShowMore.remove()
	})
}