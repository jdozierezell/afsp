import { useEffect } from 'react'
import { navigate } from 'gatsby'

const Redirect404 = () => {
	useEffect(() => {
		let pathString
		const pathArray = window.location.pathname.split('/')
		pathArray.shift()
		pathString = pathArray.join('+')
		pathString = pathString.replace(/-/g, '+') // the regex replacement string matches all occurrences

		navigate(
			`/searchresults/?query=${pathString}&source=${window.location}`
		)
	}, [])
	return null
}

export default Redirect404
