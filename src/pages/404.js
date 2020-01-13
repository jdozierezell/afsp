import React from 'react'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import { styles } from '../css/css'

const NotFoundPage = () => {
	const meta = {
		seoMetaTags: {
			tags: [{ tagName: 'title', content: '404: Page not found' }],
		},
	}
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={meta.seoMetaTags} />
			<h1>404 NOT FOUND</h1>
			<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
		</Layout>
	)
}

export default NotFoundPage
