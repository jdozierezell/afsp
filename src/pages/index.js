import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroStories from '../components/Hero/HeroStories'
import CTASingle from '../components/CTAs/CTASingle'

import { styles } from '../css/css'

function App() {
	return (
		<Layout logo={styles.logo.mobileDarkDesktopLight}>
			<SEO title="American Foundation for Suicide Prevention" />
			<HeroStories />
			<CTASingle />
		</Layout>
	)
}

export default App
