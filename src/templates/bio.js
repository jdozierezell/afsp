import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import HeroBio from '../components/Hero/HeroBio'

import { styles } from '../css/css'

const biographyCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
	}
	@media (min-width: ${styles.screens.tablet}px) {
		margin: ${styles.scale.px80} auto;
		max-width: 623px;
	}
`

const Bio = ({ data: { bio, afspMedia } }) => {
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={bio.seoMetaTags}
		>
			<HeroBio
				name={bio.name}
				title={bio.title}
				responsiveImage={afspMedia.bio.photo.responsiveImage}
				staticImage={bio.photo.url}
			/>
			<main
				css={biographyCSS}
				dangerouslySetInnerHTML={{ __html: bio.biography }}
			></main>
		</Layout>
	)
}

export default Bio

export const query = graphql`
	query($slug: String) {
		bio: datoCmsBio(slug: { eq: $slug }) {
			name
			slug
			title
			photo {
				url
			}
			biography
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
		}
		afspMedia: afspMedia {
			bio(filter: { slug: { eq: $slug } }) {
				photo {
					responsiveImage(
						imgixParams: {
							auto: format
							fit: crop
							crop: faces
							h: "768"
							w: "768"
						}
					) {
						alt
						height
						sizes
						src
						srcSet
						title
						webpSrcSet
						width
					}
				}
			}
		}
	}
`
