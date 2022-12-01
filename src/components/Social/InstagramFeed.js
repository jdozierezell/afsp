import React from 'react'
import { Script } from 'gatsby'

const InstagramFeed = ({ instaClass }) => {
	return (
		<>
			<div className={instaClass} data-elfsight-app-lazy></div>
			<Script
				src="https://apps.elfsight.com/p/platform.js"
				id="elfsight"
			/>
		</>
	)
}

export default InstagramFeed
