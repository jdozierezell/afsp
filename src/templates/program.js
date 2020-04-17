import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import fetch from 'isomorphic-fetch'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroSolid from '../components/Hero/HeroSolid'
import NavigationSide from '../components/Navigation/NavigationSide'
import ContentGeneric from '../components/Content/ContentGeneric'
import Events from '../components/Events/Events'

import { styles } from '../css/css'

const Program = ({ data: { program } }) => {
	const [programEvents, setProgramEvents] = useState([])
	const programEventName = program.programEventName.replace(' ', '-')
	const header = `${program.programEventName} Events`
	useEffect(() => {
		fetch(
			`//aws-fetch.s3.amazonaws.com/events/merged-events-${programEventName}.json`
		)
			.then(response => {
				if (response.status >= 400) {
					throw new Error('Bad response from server')
				}
				return response.json()
			})
			.then(response => setProgramEvents(response))
	}, [programEventName])
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={program.seoMetaTags}
		>
			<HeroSolid data={program} />
			<NavigationSide data={program} afterAnchors={[header]} />
			<ContentGeneric data={program} />
			<Events header={header} events={programEvents} />
		</Layout>
	)
}

export default Program

export const query = graphql`
	query($slug: String) {
		program: datoCmsProgram(slug: { eq: $slug }) {
			title
			slug
			brief
			programEventName
			details {
				... on DatoCmsContent {
					__typename
					contentHeading
					contentBody
				}
				... on DatoCmsRecommendation {
					...Recommendation
				}
				... on DatoCmsCardContainer {
					__typename
					cardContainerHeading
					cardContainerList {
						cardCategory
						cardHeading
						cardBodyNode {
							internal {
								content
							}
						}
						cardButtonCta
						cardButtonUrl
					}
				}
				... on DatoCmsActionButton {
					__typename
					buttonText
					buttonLink
				}
				... on DatoCmsImage {
					__typename
					images {
						url
						alt
					}
				}
				... on DatoCmsVideo {
					__typename
					video {
						url
						video {
							mp4Url(res: medium)
						}
					}
					poster {
						url
					}
				}
				... on DatoCmsAudio {
					__typename
					audio {
						url
						title
					}
				}
				... on DatoCmsHeading {
					__typename
					headingLevel
					heading
				}
			}
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
		}
	}
`
