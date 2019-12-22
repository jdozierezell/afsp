import zipcodes from 'zipcodes'
import fetch from 'isomorphic-fetch'

const chapterSearchResults = (chapters, response) => {
	const chapterArray = []
	chapters.edges.forEach(chapter => {
		if (chapter.node.chapterInformation.zipCode) {
			if (
				chapter.node.chapterInformation.zipCode.zips.includes(
					response.primaryZip
				)
			) {
				chapterArray.unshift(chapter.node)
			} else if (
				chapter.node.chapterInformation.zipCode.zips.some(zip =>
					response.otherZips.includes(zip)
				)
			) {
				chapterArray.push(chapter.node)
			}
		}
	})
	return chapterArray
}

const fetchChapters = (chapters, useStateFunction) => {
	const endpoint =
		'https://pro.ip-api.com/json/?fields=zip&key=kk9BWBSYqm9ZTDj'
	fetch(endpoint)
		.then(res => res.json())
		.then(
			result => {
				console.log(result)
				useStateFunction(
					chapterSearchResults(chapters, {
						primaryZip: result.zip,
						otherZips: zipcodes.radius(result.zip, 100),
					})
				)
			},
			error => {
				console.log(error)
			}
		)
}
export { chapterSearchResults, fetchChapters }
