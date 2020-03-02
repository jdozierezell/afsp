import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroSolid from '../components/Hero/HeroSolid'

import { styles } from '../css/css'

const ImageList = ({ data }) => {
	const { detail } = data
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={detail.seoMetaTags} />
			<HeroSolid data={detail} />
		</Layout>
	)
}

export default ImageList

export const query = graphql`
	query($slug: String) {
		detail: datoCmsDetail(slug: { eq: $slug }) {
			title
		}
	}
`
