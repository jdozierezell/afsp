import zipcodes from 'zipcodes'
import fetch from 'isomorphic-fetch'

const chapterSearchResults = (chapters, response) => {
	const chapterArray = []
	chapters.edges.forEach(chapter => {
		if (chapter.node.chapterInformation.zipCode) {
			let zips = JSON.parse(chapter.node.chapterInformation.zipCode)
			zips = zips.zips
			if (zips) {
				if (zips.includes(response.primaryZip)) {
					chapterArray.unshift([chapter.node, response.primaryZip])
				} else if (zips.some(zip => response.otherZips.includes(zip))) {
					chapter.node['location'] = response.primaryZip
					chapterArray.push([chapter.node, response.primaryZip])
				}
			}
		}
	})
	return chapterArray
}

// const fetchChapters = (chapters, useStateFunction) => {
// 	const endpoint =
// 		'https://pro.ip-api.com/json/?fields=zip&key=kk9BWBSYqm9ZTDj'
// 	fetch(endpoint)
// 		.then(res => res.json())
// 		.then(
// 			result => {
// 				useStateFunction(
// 					chapterSearchResults(chapters, {
// 						primaryZip: result.zip,
// 						otherZips: zipcodes.radius(result.zip, 100),
// 					})
// 				)
// 			},
// 			error => {
// 				console.log(error)
// 			}
// 		)
// }
export { chapterSearchResults }
