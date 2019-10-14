import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroStories from '../components/Hero/HeroStories'
import Table from '../components/Table/Table'

import { styles } from '../css/css'

function App() {
	return (
		<Layout logo={styles.logo.mobileDarkDesktopLight}>
			<SEO title="American Foundation for Suicide Prevention" />
			<HeroStories />
			<Table />
		</Layout>
	)
}

export default App
