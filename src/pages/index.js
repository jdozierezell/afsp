import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import FeaturedResourcesContainer from '../components/FeaturedProgramsResources/FeaturedResourcesContainer'
import FeaturedProgramsContainer from '../components/FeaturedProgramsResources/FeaturedProgramsContainer'
import ChannelContainer from '../components/Channel/ChannelContainer'
import StoriesContainer from '../components/Stories/StoriesContainer'

function App() {
	return (
		<Layout>
			<SEO title="American Foundation for Suicide Prevention" />
			<ChannelContainer />
			<FeaturedResourcesContainer />
			<FeaturedProgramsContainer />
			<StoriesContainer header="Stories" more="stories" />
		</Layout>
	)
}

export default App
