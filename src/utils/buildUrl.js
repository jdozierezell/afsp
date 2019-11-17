const buildUrl = (typename, slug) => {
	let folder = ''
	switch (typename) {
		case 'DatoCmsTag':
			folder = '/tag'
			break
		case 'DatoCmsStory':
			folder = '/story'
			break
		case 'DatoCmsDetail':
			folder = '/detail'
			break
		case 'DatoCmsAuthor':
			folder = '/author'
			break
		case 'DatoCmsLanding':
			folder = '/landing'
			break
		default:
			break
	}
	return `${folder}/${slug}`
}

export default buildUrl
