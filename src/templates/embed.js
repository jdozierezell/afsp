import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroSolid from '../components/Hero/HeroSolid'
import Embed from '../components/Embed/Embed'

import { styles } from '../css/css'

const EmbedPage = ({ data: { embed } }) => {
	embed.brief = embed.seo.description
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={embed.seoMetaTags} />
			<HeroSolid data={embed} />
			<Embed embed={embed.embed} />
		</Layout>
	)
}

export default EmbedPage

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
