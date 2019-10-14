import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroSolid from '../components/Hero/HeroSolid'
import NavigationSide from '../components/Navigation/NavigationSide'
import Table from '../components/Table/Table'
import CardContainer from '../components/Cards/CardContainer'
import ContentGeneric from '../components/Content/ContentGeneric'

import { styles } from '../css/css'

function App() {
	return (
		<Layout logo={styles.logo.mobileLightDesktopLight}>
			<SEO title="American Foundation for Suicide Prevention" />
			<HeroSolid />
			<NavigationSide />
			<Table />
			<CardContainer />
			<ContentGeneric />
		</Layout>
	)
}

export default App
