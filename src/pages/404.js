import { useEffect } from 'react'
import { navigate } from 'gatsby'

const Redirect404 = () => {
	let pathString
	if (typeof window !== `undefined`) {
		const pathArray = window.location.pathname.split('/')
		pathArray.shift()
		pathString = pathArray.join('+')
	}
	useEffect(() => {
		navigate(`/search-results/?query=${pathString}`)
	}, [pathString])
	return null
}

export default Redirect404
