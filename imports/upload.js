const { SiteClient } = require('datocms-client')
const client = new SiteClient('c59da171a82e4feb314339a6e4cc24')
// upload file using URL:
const upload = async () => {
	const path = await client.createUploadPath(
		// 'https://player.vimeo.com/external/180640978.hd.mp4?s=a596eb084ebc97f6b1169e56f64e6306f76c8db9&profile_id=119'
		'https://placekitten.com/400'
	)
	// you can then use the returned path to create a new upload:
	const newImage = await client.uploads.create({
		path,
	})
}
upload()
