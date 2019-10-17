import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroSolid from '../components/Hero/HeroSolid'
import StatisticsContainer from '../components/Statistics/StatisticsContainer'

import { styles } from '../css/css'

function App() {
	return (
		<Layout logo={styles.logo.mobileLightDesktopLight}>
			<SEO title="American Foundation for Suicide Prevention" />
			<HeroSolid />
			<StatisticsContainer />
		</Layout>
	)
}

export default App
