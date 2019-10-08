import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import FeaturedResourcesContainer from '../components/FeaturedProgramsResources/FeaturedResourcesContainer'
import FeaturedProgramsContainer from '../components/FeaturedProgramsResources/FeaturedProgramsContainer'
import ChannelContainer from '../components/Channel/ChannelContainer'
import StoriesContainer from '../components/Stories/StoriesContainer'
import StoriesReference from '../components/Stories/StoriesReference'

function App() {
	return (
		<Layout>
			<SEO title="American Foundation for Suicide Prevention" />
			<ChannelContainer />
			<FeaturedResourcesContainer />
			<FeaturedProgramsContainer />
			<StoriesContainer header="Stories" more="stories" />
			<StoriesReference
				videoTitle="Campus Walks Video 60 Seconds"
				videoURL="https://player.vimeo.com/external/364075622.hd.mp4?s=e5b5dcd3cfed0fb6bfd2e70944c0d8abdf2ff10d&profile_id=175"
			/>
		</Layout>
	)
}

export default App
