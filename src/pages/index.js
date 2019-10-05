import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ChannelContainer from '../components/Channel/ChannelContainer'

function App() {
	return (
		<Layout>
			<SEO title="American Foundation for Suicide Prevention" />
			<ChannelContainer />
		</Layout>
	)
}

export default App
