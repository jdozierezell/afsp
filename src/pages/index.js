import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroVideo from '../components/Hero/HeroVideo'
import CTASingle from '../components/CTAs/CTASingle'

function App() {
	return (
		<Layout>
			<SEO title="American Foundation for Suicide Prevention" />
			<HeroVideo src="https://player.vimeo.com/external/364075680.hd.mp4?s=9f70c5f518934c9aea34dc6b49045d7977fd7ac1&profile_id=175" />
			<CTASingle />
		</Layout>
	)
}

export default App
