import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroVideo from '../components/Hero/HeroVideo'
import ChannelContainer from '../components/Channel/ChannelContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import FeaturedResourcesContainer from '../components/FeaturedProgramsResources/FeaturedResourcesContainer'
import InstagramFeed from '../components/Social/InstagramFeed'

import { styles } from '../css/css'

const walkBar = css`
	background-color: ${styles.colors.blue};
	text-align: center;
	padding: ${styles.scale.px5} ${styles.scale.px50};
	span,
	a {
		color: ${styles.colors.white};
		font-family: ${styles.fonts.avenirDemi};
		font-size: ${styles.scale.px20};
		line-height: ${styles.scale.px30};
		display: block;
		@media (min-width: ${styles.screens.tablet}px) {
			display: inline;
			margin: 0 ${styles.scale.px14};
			line-height: initial;
		}
	}
`

const App = ({ data: { home } }) => {
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<SEO meta={home} />
			<HeroVideo
				videoUrl={home.heroVideoUrl}
				heading={home.heroHeading}
				brief={home.heroBrief}
				buttonCta={home.heroButtonCta}
				buttonUrl={home.heroButtonLink.slug}
			/>
			<div css={walkBar}>
				<span>Want to walk with us?</span>{' '}
				<a href="">Find a walk near you</a>
			</div>
			<ChannelContainer channelList={home.channelList} />
			{home.ctaChapterResourceList.map((item, index) => {
				if (item.__typename === 'DatoCmsCallToAction') {
					return (
						<CTAContainer
							key={index}
							cta={item.cta.callToAction[0]}
						/>
					)
				} else if (item.__typename === 'DatoCmsChapterConnection') {
					if (item.showChapterConnection === true) {
						return <CarouselChapterContainer key={index} />
					}
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
			<InstagramFeed instaClass={home.instagramClass} />
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
			heroBrief
			heroButtonCta
			heroButtonLink
			channelList {
				image {
					url
					# fluid(
					# 	maxWidth: 200
					# 	imgixParams: {
					# 		fm: "jpg"
					# 		fit: "crop"
					# 		crop: "faces"
					# 		w: "200"
					# 		h: "200"
					# 	}
					# ) {
					# 	...GatsbyDatoCmsFluid_tracedSVG
					# }
				}
				heading
				brief
				linkText
				link {
					... on DatoCmsLanding {
						__typename
						title
						slug
					}
					... on DatoCmsDetail {
						__typename
						title
						slug
					}
				}
			}
			ctaChapterResourceList {
				... on DatoCmsCallToAction {
					__typename
					...CTAs
				}
				... on DatoCmsChapterConnection {
					__typename
					showChapterConnection
				}
				... on DatoCmsResourceList {
					__typename
					resource {
						... on DatoCmsDetail {
							__typename
							title
							slug
							seo {
								description
								image {
									url
									# fluid(
									# 	maxWidth: 600
									# 	imgixParams: {
									# 		fm: "jpg"
									# 		fit: "crop"
									# 		crop: "faces"
									# 		w: "600"
									# 		h: "370"
									# 	}
									# ) {
									# 	...GatsbyDatoCmsFluid_tracedSVG
									# }
								}
							}
						}
						... on DatoCmsLanding {
							__typename
							title
							slug
							seo {
								description
								image {
									url
									# fluid(
									# 	maxWidth: 600
									# 	imgixParams: {
									# 		fm: "jpg"
									# 		fit: "crop"
									# 		crop: "faces"
									# 		w: "600"
									# 		h: "370"
									# 	}
									# ) {
									# 	...GatsbyDatoCmsFluid_tracedSVG
									# }
								}
							}
						}
					}
				}
			}
			instagramClass
		}
	}
`
