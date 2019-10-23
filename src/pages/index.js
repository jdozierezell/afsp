import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroVideo from '../components/Hero/HeroVideo'
import ChannelContainer from '../components/Channel/ChannelContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'
import CTAVideo from '../components/CTAs/CTAVideo'
import CTAWithDescription from '../components/CTAs/CTAWithDescription'
import CTANoDescription from '../components/CTAs/CTANoDescription'
import FeaturedResourcesContainer from '../components/FeaturedProgramsResources/FeaturedResourcesContainer'

import { styles } from '../css/css'

function App({ data: { home } }) {
	return (
		<Layout logo={styles.logo.mobileLightDesktopLight}>
			<SEO meta={home.seoMetaTags} />
			<HeroVideo
				videoUrl={home.heroVideoUrl}
				heading={home.heroHeading}
				brief={home.heroBriefNode.internal.content}
				buttonCta={home.heroButtonCta}
				buttonUrl={home.heroButtonLink.slug}
			/>
			<ChannelContainer channelList={home.channelList} />
			<CarouselChapterContainer />
			{home.ctaResourceList.map((item, index) => {
				if (item.__typename === 'DatoCmsCallToAction') {
					const typeName = item.cta.callToAction[0].__typename
					if (typeName === 'DatoCmsCtaVideo') {
						return (
							<CTAVideo
								key={index}
								cta={item.cta.callToAction[0]}
							/>
						)
					} else if (typeName === 'DatoCmsCtaWithDescription') {
						return (
							<CTAWithDescription
								key={index}
								cta={item.cta.callToAction[0]}
							/>
						)
					} else if (typeName === 'DatoCmsCtaNoDescription') {
						return (
							<CTANoDescription
								key={index}
								cta={item.cta.callToAction[0]}
							/>
						)
					}
					return ''
				} else if (item.__typename === 'DatoCmsResourceList') {
					return (
						<FeaturedResourcesContainer
							key={index}
							resources={item.resource}
						/>
					)
				}
				return ''
			})}
		</Layout>
	)
}

export default App

export const query = graphql`
	query {
		home: datoCmsHome {
			seoMetaTags {
				tags
			}
			heroVideoUrl
			heroHeading
			heroBriefNode {
				internal {
					content
				}
			}
			heroButtonCta
			heroButtonLink {
				... on DatoCmsPage {
					slug
				}
			}
			channelList {
				image {
					fluid(
						maxWidth: 200
						imgixParams: {
							fm: "jpg"
							fit: "crop"
							crop: "faces"
							w: "200"
							h: "200"
						}
					) {
						...GatsbyDatoCmsFluid_tracedSVG
					}
				}
				heading
				briefNode {
					internal {
						content
					}
				}
				linkText
				link {
					slug
				}
			}
			ctaResourceList {
				... on DatoCmsCallToAction {
					cta {
						callToAction {
							... on DatoCmsCtaVideo {
								videoUrl
								heading
								briefNode {
									internal {
										content
									}
								}
								linkText
								linkUrl
							}
							... on DatoCmsCtaWithDescription {
								heading
								descriptionNode {
									internal {
										content
									}
								}
								linkText
								linkUrl
							}
							... on DatoCmsCtaNoDescription {
								heading
								linkText
								linkUrl
							}
						}
					}
				}
				... on DatoCmsResourceList {
					resource {
						title
						slug
					}
				}
			}
		}
	}
`
