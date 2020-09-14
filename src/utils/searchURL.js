const searchURL = search => {
	// https://gist.github.com/excalq/2961415#gistcomment-2221360

	const addRefinements = (refinement, count) => {
		if (search.refinementList[refinement] === null) {
			delete search.refinementList[refinement]
		} else if (search.refinementList[refinement] !== null) {
			search.refinementList[refinement].forEach(item => {
				searchParams += `&refinementList[${refinement}][${count}]=${item}`
				count++
			})
		}
	}

	let searchParams = ''
	if (search.query) {
		searchParams = `query=${search.query}`
	}

	if (search.refinementList) {
		for (const refinement in search.refinementList) {
			let count = 0
			addRefinements(refinement, count)
		}
	}

	window.history.replaceState(
		{},
		'',
		`${window.location.pathname}?${searchParams}`
	)
}

export default searchURL
