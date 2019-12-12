import React, { useEffect } from 'react'
import Script from 'react-load-script'

const InstagramFeed = () => {
	return (
		<>
			<div className="elfsight-app-2b2e6777-b0d8-45f4-8ada-824338045eb7"></div>
			<Script
				url="https://apps.elfsight.com/p/platform.js"
				attributes={{ id: 'klaviyo' }}
				onCreate={() => console.log('created')}
				onError={() => console.log('error')}
				onLoad={() => console.log('loaded')}
			/>
		</>
	)
}

export default InstagramFeed
