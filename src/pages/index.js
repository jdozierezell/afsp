import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroVideo from '../components/Hero/HeroVideo'
import ChannelContainer from '../components/Channel/ChannelContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
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
					return (
						<CTAContainer
							key={index}
							cta={item.cta.callToAction[0]}
						/>
					)
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
			heroButtonLink
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
					... on DatoCmsLanding {
						title
						slug
					}
					... on DatoCmsDetail {
						title
						slug
					}
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
								briefNode {
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
						... on DatoCmsDetail {
							title
							slug
							seo {
								description
								image {
									fluid(
										maxWidth: 600
										imgixParams: {
											fm: "jpg"
											fit: "crop"
											crop: "faces"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_tracedSVG
									}
								}
							}
						}
						... on DatoCmsLanding {
							title
							slug
							seo {
								description
								image {
									fluid(
										maxWidth: 600
										imgixParams: {
											fm: "jpg"
											fit: "crop"
											crop: "faces"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_tracedSVG
									}
								}
							}
						}
					}
				}
			}
		}
	}
`
