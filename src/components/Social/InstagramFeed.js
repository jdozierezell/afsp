import React from 'react'
import Script from 'react-load-script'

const InstagramFeed = ({ instaClass }) => {
	return (
		<>
			<div className={instaClass} data-elfsight-app-lazy></div>
			<Script
				url="https://apps.elfsight.com/p/platform.js"
				attributes={{ id: 'elfsight' }}
			/>
		</>
	)
}

export default InstagramFeed
