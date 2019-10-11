import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroSolid from '../components/Hero/HeroSolid'
import CarouselChapter from '../components/Carousels/CarouselChapter'

function App() {
	return (
		<Layout>
			<SEO title="American Foundation for Suicide Prevention" />
			<HeroSolid />
			<CarouselChapter location="New York, NY" />
		</Layout>
	)
}

export default App
