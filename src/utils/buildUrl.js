const buildUrl = (typename = '', slug = '') => {
	let folder = ''
	switch (typename) {
		case 'DatoCmsTag':
			folder = '/tag'
			break
		case 'DatoCmsStory':
			folder = '/story'
			break
		case 'DatoCmsAuthor':
			folder = '/author'
			break
		case 'DatoCmsChapterHomePage':
		case 'DatoCmsChapterStoryUpdate':
			folder = '/chapter'
			break
		case 'DatoCmsRealStory':
		case 'DatoCmsLanding':
		case 'DatoCmsDetail':
		case 'DatoCmsHomePage':
		case 'DatoCmsChapterSearch':
			folder = ''
			break
		default:
			folder = typename
			break
	}
	return `${folder}/${slug}`
}

export default buildUrl
