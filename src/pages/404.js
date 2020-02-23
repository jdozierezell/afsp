import { useEffect } from 'react'
import { navigate } from 'gatsby'

const Redirect404 = () => {
	const pathArray = window.location.pathname.split('/')
	pathArray.shift()
	const pathString = pathArray.join('+')
	console.log(pathString)
	useEffect(() => {
		navigate(`/search-results/?query=${pathString}`)
	}, [])
	return null
}

export default Redirect404
