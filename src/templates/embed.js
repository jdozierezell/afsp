import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroSolid from '../components/Hero/HeroSolid'

import { styles } from '../css/css'

const Embed = ({ data: { embed } }) => {
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={embed.seoMetaTags} />
			<HeroSolid data={embed} />
		</Layout>
	)
}

export default Embed

export const query = graphql`
	query($slug: String) {
		embed: datoCmsEmbedPage(slug: { eq: $slug }) {
			title
			embed
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			seo {
				description
			}
		}
	}
`
