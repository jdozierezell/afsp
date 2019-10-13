import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroChapterSearch from '../components/Hero/HeroChapterSearch'
import CTASingle from '../components/CTAs/CTASingle'

function App() {
	return (
		<Layout>
			<SEO title="American Foundation for Suicide Prevention" />
			<HeroChapterSearch />
			<CTASingle />
		</Layout>
	)
}

export default App
