const searchURL = search => {
	// https://gist.github.com/excalq/2961415#gistcomment-2221360
	// console.log(search.refinementList)
	let refinementList
	for (const refinement in search.refinementList) {
		search.refinementList[refinement].forEach(item => {
			refinementList += `&${refinement}=${item
				.split(' ')
				.map(encodeURIComponent)
				.join('+')}`
		})
	}
	let params = ''
	if (search.query) {
		params = `query=${search.query}`
	}

	if (search.refinementList) {
		for (const refinement in search.refinementList) {
			let count = 0
			search.refinementList[refinement].forEach(item => {
				params += `&refinementList[${refinement}][${count}]=${item}`
				count++
			})
		}
	}

	console.log(params)

	window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
}

export default searchURL
