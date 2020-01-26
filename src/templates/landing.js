import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import ChannelContainer from '../components/Channel/ChannelContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import CarouselDetailContainer from '../components/Carousels/CarouselDetailContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'
import FeaturedResourcesContainer from '../components/FeaturedProgramsResources/FeaturedResourcesContainer'

import { styles } from '../css/css'

const landingTitle = css`
	margin: 150px 24px 35px;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 180px 50px 40px;
	}
`

const landingBriefCSS = css`
	padding: 0 24px;
	margin: 0;
`

const channelCSS = css`
	background-color: ${styles.colors.white};
	grid-template-columns: repeat(2, 1fr);
	@media (min-width: ${styles.screens.tablet}px) {
		div {
			text-align: center;
		}
	}
`

const resourcesCSS = css`
	background-color: ${styles.colors.lightGray};
	@media (min-width: ${styles.screens.tablet}px) {
		background-color: ${styles.colors.white};
	}
`

const Landing = ({ data: { landing } }) => {
	return (
		<Layout theme={styles.logo.mobileDarkDesktopDark}>
			<HelmetDatoCms seo={landing.seoMetaTags} />
			<h1 css={landingTitle}>{landing.title}</h1>
			<p
				css={css`
					${landingBriefCSS};
					@media (min-width: ${styles.screens.tablet}px) {
						padding: 0 ${styles.scale.px50}
							${landing.channelList.length !== 0
								? 0
								: styles.scale.px50};
					}
				`}
			>
				{landing.seo.description}
			</p>
			{landing.channelList.length !== 0 && (
				<ChannelContainer
					channelList={landing.channelList}
					addCSS={channelCSS}
				/>
			)}
			{landing.ctaChapterResourceDetailList.map((item, index) => {
				if (item.__typename === 'DatoCmsCallToAction') {
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
							resources={item.resource}
							addCSS={resourcesCSS}
						/>
					)
				} else if (item.__typename === 'DatoCmsDetailSquare') {
					return (
						<CarouselDetailContainer
							key={index}
							content={item.detail}
						/>
					)
				}
				return ''
			})}
			{landing.channelList.length !== 0 && (
				<ChannelContainer
					channelList={landing.channelList}
					addCSS={channelCSS}
				/>
			)}
		</Layout>
	)
}

export default Landing

export const query = graphql`
	query($slug: String) {
		landing: datoCmsLanding(slug: { eq: $slug }) {
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			title
			seo {
				description
			}
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
				link {
					... on DatoCmsDetail {
						__typename
						slug
					}
					... on DatoCmsLanding {
						__typename
						slug
					}
				}
			}
			ctaChapterResourceDetailList {
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
				... on DatoCmsCallToAction {
					... on DatoCmsCallToAction {
						__typename
						...CTAs
					}
				}
				... on DatoCmsDetailSquare {
					__typename
					detail {
						title
						slug
						details {
							... on DatoCmsContent {
								__typename
								id
								contentHeading
							}
						}
					}
				}
				... on DatoCmsChapterConnection {
					__typename
					showChapterConnection
				}
			}
		}
	}
`
