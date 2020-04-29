import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import ChannelContainer from '../components/Channel/ChannelContainer'
import ConvoContainer from '../components/Convo/ConvoContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import CarouselDetailContainer from '../components/Carousels/CarouselDetailContainer'
import CarouselResourceContainer from '../components/Carousels/CarouselResourceContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'
import Calendar from '../components/Calendar/Calendar'

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
	max-width: 920px;
`

const introCopyCSS = css`
	background-color: ${styles.colors.lightGray};
	margin: -${styles.scale.px36} 0 -${styles.scale.px24};
	div {
		padding: ${styles.scale.px24};
		font-family: ${styles.fonts.avenirRegular};
		@media (min-width: ${styles.screens.mobile}px) {
			max-width: calc(623px * 3);
			columns: 3;
			padding: ${styles.scale.px50};
		}
	}
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

const RealConvo = ({ data: { realConvo } }) => {
	let adjacent = 0
	return (
		<Layout
			theme={styles.logo.mobileDarkDesktopDark}
			seo={realConvo.seoMetaTags}
		>
			<h1 css={landingTitle}>{realConvo.title}</h1>
			{!realConvo.introCopy && (
				<p
					css={css`
						${landingBriefCSS};
						@media (min-width: ${styles.screens.tablet}px) {
							padding: 0 ${styles.scale.px50}
								${realConvo.channelList.length !== 0
									? 0
									: styles.scale.px50};
						}
					`}
					dangerouslySetInnerHTML={{ __html: realConvo.brief }}
				></p>
			)}
			{realConvo.channelList.length !== 0 && (
				<ChannelContainer
					slug={realConvo.slug}
					channelList={realConvo.channelList}
					addCSS={channelCSS}
				/>
			)}
			{realConvo.introCopy && (
				<div css={introCopyCSS}>
					<div
						dangerouslySetInnerHTML={{
							__html: realConvo.introCopy,
						}}
					></div>
				</div>
			)}
			<ConvoContainer convos={realConvo.convos} />
			{realConvo.ctaChapterResourceDetailList.map((item, index) => {
				const prevIndex = index > 0 ? index - 1 : null
				if (
					prevIndex !== null &&
					realConvo.ctaChapterResourceDetailList[index].__typename ===
						realConvo.ctaChapterResourceDetailList[prevIndex]
							.__typename
				) {
					adjacent++
				} else {
					adjacent = 0
				}
				if (item.__typename === 'DatoCmsCallToAction') {
					return (
						<CTAContainer
							key={index}
							number={index}
							cta={item.cta.callToAction[0]}
						/>
					)
				} else if (item.__typename === 'DatoCmsResourceList') {
					if (item.displayAsCarousel) {
						return (
							<CarouselResourceContainer
								key={index}
								listHeading={item.listHeading}
								resources={item.resource}
								addCSS={css`
									background-color: ${adjacent % 2 === 1
										? styles.colors.lightGray
										: styles.colors.white};
								`}
							/>
						)
					} else {
						return (
							<FeaturedResourcesContainer
								key={index}
								heading={item.listHeading}
								resources={item.resource}
								addCSS={css`
									background-color: ${adjacent % 2 === 1
										? styles.colors.lightGray
										: styles.colors.white};
								`}
							/>
						)
					}
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
			<Calendar events={realConvo.eventCalendar} />
			<CarouselChapterContainer
				carouselCSS={css`
					@media (min-width: ${styles.screens.mobile}px) {
						background-color: ${styles.colors.white};
					}
				`}
			/>
		</Layout>
	)
}

export default RealConvo

export const query = graphql`
	query {
		realConvo: datoCmsRealconvo {
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			title
			slug
			brief
			seo {
				description
			}
			eventCalendar {
				eventTitle
				eventDateAndTime
				url
				brief
			}
			convos {
				title
				vimeoExternalUrl
				video {
					url
					video {
						mp4Url(res: medium)
					}
				}
				posterImage {
					url
					fluid(
						maxWidth: 1080
						imgixParams: { auto: "format", w: "1080" }
					) {
						...GatsbyDatoCmsFluid_noBase64
					}
				}
				bodyCopy
				fullConvoFile {
					url
				}
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
						...GatsbyDatoCmsFluid_noBase64
					}
				}
				heading
				channelLink {
					...ChannelLink
				}
			}
			introCopy
			ctaChapterResourceDetailList {
				... on DatoCmsResourceList {
					__typename
					listHeading
					displayAsCarousel
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
											fit: "fill"
											fill: "blur"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
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
											fit: "fill"
											fill: "blur"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
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
											fit: "fill"
											fill: "blur"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
									}
								}
							}
						}
						... on DatoCmsStory {
							__typename
							title
							slug
							coverImage {
								url
								fluid(
									maxWidth: 600
									imgixParams: {
										auto: "format"
										fit: "fill"
										fill: "blur"
										w: "600"
										h: "370"
									}
								) {
									...GatsbyDatoCmsFluid_noBase64
								}
							}
							seo {
								description
							}
						}
						... on DatoCmsExternalResource {
							__typename
							title
							externalDescription
							coverImage {
								url
								fluid(
									maxWidth: 600
									imgixParams: {
										auto: "format"
										fit: "fill"
										fill: "blur"
										w: "600"
										h: "370"
									}
								) {
									...GatsbyDatoCmsFluid_noBase64
								}
							}
							resourceLink {
								... on DatoCmsExternalUrl {
									__typename
									id
									externalUrl
								}
								... on DatoCmsDownload {
									__typename
									id
									download {
										url
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
											fit: "fill"
											fill: "blur"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
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
						__typename
						... on DatoCmsDetail {
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
						... on DatoCmsDetailTagged {
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
				}
			}
		}
	}
`
