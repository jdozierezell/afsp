import React, { useEffect } from 'react'

const InstagramFeed = () => {
	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://apps.elfsight.com/p/platform.js'
		script.async = true

		document.body.appendChild(script)
	})
	return (
		<div className="elfsight-app-2b2e6777-b0d8-45f4-8ada-824338045eb7"></div>
	)
}

export default InstagramFeed
