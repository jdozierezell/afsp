import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroImage from '../components/Hero/HeroImage'
import QuiltDisclaimer from '../components/Quilt/QuiltDisclaimer'
import QuiltForm from '../components/Quilt/QuiltForm'

import { styles } from '../css/css'

const mainCSS = css`
	padding: ${styles.scale.px50} ${styles.scale.px24};
	max-width: 960px;
	margin: 0 auto;
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50};
	}
`

const NewQuilt = ({ data: { quiltQuery } }) => {
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={quiltQuery.seoMetaTags} />
			<HeroImage data={quiltQuery} />
			<main css={mainCSS}>
				<QuiltDisclaimer disclaimer={quiltQuery.disclaimer} />
				<QuiltForm />
			</main>
		</Layout>
	)
}

export default NewQuilt

export const query = graphql`
	query {
		quiltQuery: datoCmsQuilt(slug: { eq: "new-quilt" }) {
			title
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			mobileCover: heroImage {
				url
				# fluid(
				# 	maxWidth: 769
				# 	imgixParams: {
				# 		fm: "jpg"
				# 		fit: "crop"
				# 		crop: "faces"
				# 		w: "769"
				# 		h: "475"
				# 	}
				# ) {
				# 	...GatsbyDatoCmsFluid_tracedSVG
				# }
			}
			desktopCover: heroImage {
				url
				# fluid(
				# 	maxWidth: 1920
				# 	imgixParams: {
				# 		fm: "jpg"
				# 		fit: "crop"
				# 		crop: "faces"
				# 		ar: 2.5
				# 		w: "1920"
				# 		blendMode: "hardlight"
				# 		blend: "555"
				# 	}
				# ) {
				# 	...GatsbyDatoCmsFluid_tracedSVG
				# }
			}
			brief
			disclaimer
		}
	}
`
