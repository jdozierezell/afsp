import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroSolid from '../components/Hero/HeroSolid'
import CardContainer from '../components/Cards/CardContainer'

function App() {
	return (
		<Layout>
			<SEO title="American Foundation for Suicide Prevention" />
			<HeroSolid />
			<CardContainer title="Grant types" />
		</Layout>
	)
}

export default App
