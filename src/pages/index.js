import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroSolid from '../components/Hero/HeroSolid'
import CTAVideo from '../components/CTAs/CTAVideo'

function App() {
	return (
		<Layout>
			<SEO title="American Foundation for Suicide Prevention" />
			<HeroSolid />
			<CTAVideo />
		</Layout>
	)
}

export default App
