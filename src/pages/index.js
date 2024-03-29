import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import Script from 'react-load-script'

import { SEO } from '../components/SEO/SEO'
import Layout from '../components/Layout'
import HeroVideo from '../components/Hero/HeroVideo'
import InstagramFeed from '../components/Social/InstagramFeed'

import { styles } from '../css/css'

import ChannelContainer from '../components/Channel/ChannelContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'
import CarouselDetailContainer from '../components/Carousels/CarouselDetailContainer'
import Ticker from '../components/Ticker/Ticker'

dayjs.extend(utc)
dayjs.extend(timezone)

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
	let events = {
		title: 'AFSP national events',
		details: [],
	}

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			customPadding={`${styles.scale.px50} ${styles.scale.px50} ${styles.scale.px90}`}
		>
			<HeroVideo
				videoUrl={
					home.heroVideo.video
						? home.heroVideo.video.mp4Url
						: home.heroVideo.url
				}
				videoAlt={home.heroVideo.alt}
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
					return (
						<ChannelContainer
							key={index}
							channelList={item.channels}
						/>
					)
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
				} else if (
					item.__typename === 'DatoCmsEventsList' &&
					item.events.length > 0
				) {
					item.events.forEach(e => {
						let start, end
						let eventObject = {
							__typename: 'Event',
							title: e.title,
							startDate: e.startDateAndTime
								? dayjs(e.startDateAndTime)
										.tz('America/New_York')
										.format('MMMM D @ h:mm a ET')
								: null,
							endDate: e.endDateAndTime
								? dayjs(e.endDateAndTime)
										.tz('America/New_York')
										.format('MMMM D @ h:mm a ET')
								: null,
							buttonText: e.buttonText,
							url: e.url,
							eventCode: e.eventCode,
						}
						// format start date and time
						if (e.startDateAndTime.indexOf('00:00:00') !== -1) {
							start = dayjs(e.startDateAndTime)
								.tz('America/New_York')
								.format('MMMM D')
						} else if (
							e.startDateAndTime.indexOf(':00:00') === -1
						) {
							start = dayjs(e.startDateAndTime)
								.tz('America/New_York')
								.format('MMMM D @ h:mm a ET')
						} else {
							start = dayjs(e.startDateAndTime)
								.tz('America/New_York')
								.format('MMMM D @ h a ET')
						}
						// format end date and time
						if (e.endDateAndTime) {
							if (e.endDateAndTime.indexOf('00:00:00') !== -1) {
								end = dayjs(e.endDateAndTime)
									.tz('America/New_York')
									.format('MMMM D')
							} else if (
								e.endDateAndTime.indexOf(':00:00') === -1
							) {
								end = dayjs(e.endDateAndTime)
									.tz('America/New_York')
									.format('MMMM D @ h:mm a ET')
							} else {
								end = dayjs(e.endDateAndTime)
									.tz('America/New_York')
									.format('MMMM D @ h a ET')
							}
						}
						eventObject.date = e.endDateAndTime
							? `${start} – ${end}`
							: start
						events.details.push(eventObject)
					})
					return (
						<CarouselDetailContainer
							key={index}
							content={events}
							eventTitleSize="1.4em"
							id="national-events"
						/>
					)
				}
				return ''
			})}
			<InstagramFeed instaClass={home.instagramClass} />
			{home.ticker && home.ticker.length > 0 && (
				<Ticker ticker={home.ticker} />
			)}
			<Script
				attributes={{
					async: '',
					type: 'text/javascript',
				}}
				url="//addevent.com/libs/atc/1.6.1/atc.min.js"
			/>
		</Layout>
	)
}

export default App

export const Head = ({ data: { home } }) => {
	let metaImage,
		metaDescription = ''

	home.seoMetaTags.tags.forEach(tag => {
		if (tag.attributes) {
			if (
				tag.attributes.property &&
				tag.attributes.property === 'og:image'
			) {
				metaImage = tag.attributes.content
			}
			if (
				tag.attributes.property &&
				tag.attributes.property === 'og:description'
			) {
				metaDescription = tag.attributes.content
			}
		}
	})

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'NGO',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'New York',
			addressRegion: 'NY',
			postalCode: '10038',
			streetAddress: '199 Water St., 11th Floor',
		},
		contactPoint: [
			{
				'@type': 'ContactPoint',
				telephone: '(212) 363-3500',
				email: 'info@afsp.org',
				contactType: 'office manager',
			},
		],
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		legalName: 'American Foundation for Suicide Prevention',
		alternateName: 'AFSP',
	}

	return <SEO structuredData={structuredData} meta={home.seoMetaTags} />
}

export const query = graphql`
	query {
		home: datoCmsHome {
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			heroVideo {
				alt
				url
				video {
					mp4Url(res: medium)
				}
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
			ticker {
				tickerItem
			}
			ctaChapterResourceList {
				... on DatoCmsEventsList {
					__typename
					events {
						title
						startDateAndTime
						endDateAndTime
						brief
						buttonText
						url
						eventCode
					}
				}
				... on DatoCmsChannelList {
					__typename
					channels {
						id
						image {
							url
							alt
							gatsbyImageData(
								width: 200
								placeholder: NONE
								imgixParams: {
									fit: "crop"
									crop: "faces"
									w: "200"
									h: "200"
								}
							)
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
					id
					listHeading
					displayAsCarousel
					randomize
					resource {
						... on DatoCmsBio {
							__typename
							id
							name
							slug
							title
							seo {
								description
								image {
									url
									gatsbyImageData(
										width: 600
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									)
								}
							}
						}
						... on DatoCmsCustomShareable {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									gatsbyImageData(
										width: 600
										placeholder: NONE
										imgixParams: {
											fit: "fill"
											fill: "blur"
											w: "600"
											h: "370"
										}
									)
								}
							}
						}
						... on DatoCmsDetail {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									gatsbyImageData(
										width: 600
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									)
								}
							}
						}
						... on DatoCmsDetailTagged {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									gatsbyImageData(
										width: 600
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									)
								}
							}
						}
						... on DatoCmsExternalResource {
							__typename
							id
							title
							externalDescription
							coverImage {
								url
								alt
								gatsbyImageData(
									width: 600
									placeholder: NONE
									imgixParams: {
										fill: "blur"
										fit: "fill"
										w: "600"
										h: "370"
									}
								)
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
						... on DatoCmsImageList {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									gatsbyImageData(
										width: 600
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									)
								}
							}
						}
						... on DatoCmsLanding {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									gatsbyImageData(
										width: 600
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									)
								}
							}
						}
						... on DatoCmsRealStory {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									gatsbyImageData(
										width: 600
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									)
								}
							}
						}
						... on DatoCmsSearchPage {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									gatsbyImageData(
										width: 600
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									)
								}
							}
						}
						... on DatoCmsStateFactsPage {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									gatsbyImageData(
										width: 600
										placeholder: NONE
										imgixParams: {
											fit: "fill"
											fill: "blur"
											w: "600"
											h: "370"
										}
									)
								}
							}
						}
						... on DatoCmsStatistic {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									gatsbyImageData(
										width: 600
										placeholder: NONE
										imgixParams: {
											fit: "fill"
											fill: "blur"
											w: "600"
											h: "370"
										}
									)
								}
							}
						}
						... on DatoCmsStory {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									gatsbyImageData(
										width: 600
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									)
								}
							}
						}
						... on DatoCmsQuilt {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									gatsbyImageData(
										width: 600
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									)
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
