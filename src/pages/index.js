import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import BreakingNews from '../components/BreakingNews/BreakingNews'
import HeroVideo from '../components/Hero/HeroVideo'
import ChannelContainer from '../components/Channel/ChannelContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'
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
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={home.seoMetaTags}
		>
			{home.breakingNews && <BreakingNews news={home.breakingNews} />}
			<HeroVideo
				videoUrl={home.heroVideo.url}
				posterUrl={home.heroPoster.url}
				heading={home.heroHeading}
				brief={home.heroBrief}
				buttonCta={home.heroButtonCta}
				buttonExternal={home.heroButtonExternal}
				buttonUrl={
					home.heroButtonExternal
						? home.heroButtonExternalLink
						: home.heroButtonInternalLink.slug
				}
			/>
			<div css={walkBar}>
				<span>Want to walk with us?</span>{' '}
				<a href="https://afsp.donordrive.com/index.cfm?fuseaction=cms.page&id=1370">
					Find a walk near you
				</a>
			</div>
			{home.ctaChapterResourceList.map((item, index) => {
				if (item.__typename === 'DatoCmsChannelList') {
					return <ChannelContainer channelList={item.channels} />
				} else if (item.__typename === 'DatoCmsCallToAction') {
					return (
						<CTAContainer
							key={index}
							number={index}
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
							heading={item.listHeading}
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
				...GatsbyDatoCmsSeoMetaTags
			}
			heroVideo {
				url
			}
			heroPoster {
				url
			}
			heroHeading
			heroBrief
			heroButtonCta
			heroButtonExternal
			heroButtonExternalLink
			heroButtonInternalLink {
				... on DatoCmsRealStory {
					slug
				}
				... on DatoCmsLanding {
					slug
				}
				... on DatoCmsDetail {
					slug
				}
				... on DatoCmsDetailTagged {
					slug
				}
			}
			breakingNews
			channelList {
				image {
					url
					fluid(
						maxWidth: 200
						imgixParams: {
							auto: "format"
							fit: "crop"
							crop: "faces"
							w: "200"
							h: "200"
						}
					) {
						...GatsbyDatoCmsFluid
					}
				}
				heading
				brief
				channelLink {
					...ChannelLink
				}
			}
			ctaChapterResourceList {
				... on DatoCmsChannelList {
					__typename
					channels {
						image {
							url
							fluid(
								maxWidth: 200
								imgixParams: {
									auto: "format"
									fit: "crop"
									crop: "faces"
									w: "200"
									h: "200"
								}
							) {
								...GatsbyDatoCmsFluid
							}
						}
						heading
						brief
						channelLink {
							...ChannelLink
						}
					}
				}
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
					listHeading
					resource {
						... on DatoCmsDetail {
							__typename
							title
							slug
							seo {
								description
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fit: "crop"
											crop: "faces"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid
									}
								}
							}
						}
						... on DatoCmsDetailTagged {
							__typename
							title
							slug
							seo {
								description
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fit: "crop"
											crop: "faces"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid
									}
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
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fit: "crop"
											crop: "faces"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid
									}
								}
							}
						}
						... on DatoCmsQuilt {
							__typename
							title
							slug
							seo {
								description
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fit: "crop"
											crop: "faces"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid
									}
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
