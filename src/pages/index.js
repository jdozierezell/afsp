import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'

function App() {
	return (
		<Layout>
			<SEO title="American Foundation for Suicide Prevention" />
			<FeaturedResourcesContainer />
		</Layout>
	)
}

export default App
