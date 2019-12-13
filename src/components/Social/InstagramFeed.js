import React, { useEffect } from 'react'
import Script from 'react-load-script'

const InstagramFeed = ({ instaClass }) => {
	return (
		<>
			<div className={instaClass}></div>
			<Script
				url="https://apps.elfsight.com/p/platform.js"
				attributes={{ id: 'elfsight' }}
				onCreate={() => console.log('created')}
				onError={() => console.log('error')}
				onLoad={() => console.log('loaded')}
			/>
		</>
	)
}

export default InstagramFeed
