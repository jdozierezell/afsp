const createAnchor = text => {
	// remove anything that's not letters or numbers with dashes
	const anchor = text.replace(/[^A-Za-z0-9]/g, '-')
	return anchor.toLowerCase()
}

export default createAnchor
