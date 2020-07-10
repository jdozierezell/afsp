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
		case 'DatoCmsGrantsPage':
		case 'DatoCmsRealStory':
		case 'DatoCmsLanding':
		case 'DatoCmsDetail':
		case 'DatoCmsDetailTagged':
		case 'DatoCmsHomePage':
		case 'DatoCmsSearchPage':
		case 'DatoCmsQuilt':
		case 'DatoCmsStatistic':
		case 'DatoCmsPartnerPage':
		case 'DatoCmsActionCenter':
		case 'DatoCmsImageList':
		case 'DatoCmsCampaignLanding':
			folder = ''
			break
		default:
			folder = typename
			break
	}
	return `${folder}/${slug}`
}

export default buildUrl
