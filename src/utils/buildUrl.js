const buildUrl = (typename, slug) => {
	let folder = ''
	switch (typename) {
		case 'DatoCmsLanding':
			folder = '/landing'
			break
		case 'DatoCmsDetail':
			folder = '/detail'
			break
		default:
			break
	}
	return `${folder}/${slug}`
}

export default buildUrl
