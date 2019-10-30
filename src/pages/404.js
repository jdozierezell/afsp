import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { styles } from '../css/css'

const NotFoundPage = () => (
  const meta = {
    tags: [{tagName: 'title', content: '404: Page not found'}]
  }
	<Layout logo={styles.logo.mobileLightDesktopLight}>
		<SEO meta={meta} />
		<h1>404 NOT FOUND</h1>
		<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
	</Layout>
)

export default NotFoundPage
