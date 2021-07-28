import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import Layout from '../components/Layout'

import { styles } from '../css/css'

import ChannelContainer from '../components/Channel/ChannelContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import CarouselResourceContainer from '../components/Carousels/CarouselResourceContainer'
import CarouselDetailContainer from '../components/Carousels/CarouselDetailContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'
import EmailSignupBar from '../components/EmailSignup/EmailSignupBar'

dayjs.extend(utc)
dayjs.extend(timezone)

const landingTitle = css`
	margin: 150px 24px 0;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 180px 50px 40px;
	}
	+ div {
		margin: ${styles.scale.px36} 0 -${styles.scale.px24};
	}
`

const landingBriefCSS = css`
	padding: 0 24px;
	margin: 0;
	max-width: 920px;
	dfn {
		color: ${styles.colors.poppy};
		text-decoration: underline;
		cursor: pointer;
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

const readMoreCSS = css`
	cursor: pointer;
	text-align: left;
	background-color: hsla(0, 0%, 100%, 1);
	border: none;
	display: inline-block;
	text-decoration: none;
	margin: 0;
	padding: 0;
	color: ${styles.colors.poppy};
`

const Landing = ({ data: { landing } }) => {
	let metaImage,
		metaDescription = ''
	landing.seoMetaTags.tags.forEach(tag => {
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
		'@content': 'https://schema.org',
		'@type': 'WebPage',
		about: 'suicide',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: landing.title,
		lastReviewed: landing.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${landing.slug}`,
	}
	const [readMore, setReadMore] = useState(false)
	let adjacent = 0
	let events = {
		title: '',
		details: [],
	}
	let hideEmailLayout
	landing.ctaChapterResourceDetailList.forEach(item => {
		if (item.__typename === 'DatoCmsEmailBar') {
			hideEmailLayout = true
		}
	})
	if (landing.eventCalendar.length > 0) {
		landing.eventCalendar.forEach(event => {
			if (event.__typename === 'DatoCmsCampaignName') {
				events.title = `${event.campaignName} Event Calendar`
			} else if (event.__typename === 'DatoCmsEventsList') {
				event.events.forEach(e => {
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
					} else if (e.startDateAndTime.indexOf(':00:00') === -1) {
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
						} else if (e.endDateAndTime.indexOf(':00:00') === -1) {
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
			}
		})
	}
	return (
		<Layout
			theme={styles.logo.mobileDarkDesktopDark}
			seo={landing.seoMetaTags}
			structuredData={structuredData}
			hideEmailLayout={hideEmailLayout}
		>
			<h1 css={landingTitle}>{landing.title}</h1>
			<div
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
				{landing.brief && (
					<div
						dangerouslySetInnerHTML={{
							__html: landing.brief,
						}}
					></div>
				)}
				{landing.readMore && (
					<>
						<p>
							<button
								onClick={() => setReadMore(true)}
								css={css`
									${readMoreCSS};
									display: ${readMore ? 'none' : 'block'};
								`}
							>
								Read more...
							</button>
						</p>
						<div
							css={css`
								display: ${readMore ? 'block' : 'none'};
							`}
							dangerouslySetInnerHTML={{
								__html: landing.readMore,
							}}
						></div>
					</>
				)}
			</div>
			{landing.channelList.length !== 0 && (
				<ChannelContainer
					slug={landing.slug}
					channelList={landing.channelList}
					addCSS={channelCSS}
				/>
			)}
			{events.details.length > 0 && (
				<CarouselDetailContainer
					content={events}
					eventTitleSize="1.4em"
					id="national-events"
				/>
			)}
			{landing.ctaChapterResourceDetailList.map((item, index) => {
				const itemsToCheck = ['DatoCmsResourceList', 'DatoCmsEmailBar']
				const prevIndex = index > 0 ? index - 1 : null
				if (
					prevIndex !== null &&
					itemsToCheck.includes(item.__typename)
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
				} else if (item.__typename === 'DatoCmsChapterConnection') {
					if (item.showChapterConnection === true) {
						return <CarouselChapterContainer key={index} />
					}
				} else if (item.__typename === 'DatoCmsEmailBar') {
					if (item.showEmail === true) {
						return (
							<EmailSignupBar
								addCSS={css`
									background-color: ${adjacent % 2 === 1
										? styles.colors.lightGray
										: styles.colors.white};
								`}
								key={index}
							></EmailSignupBar>
						)
					}
				} else if (item.__typename === 'DatoCmsResourceList') {
					if (item.displayAsCarousel) {
						return (
							<CarouselResourceContainer
								key={index}
								listHeading={item.listHeading}
								resources={item.resource}
								randomize={item.randomize}
								addCSS={css`
									background-color: ${adjacent % 2 === 1
										? styles.colors.lightGray
										: styles.colors.white};
									&:nth-of-type(2) {
										background-color: ${styles.colors
											.lightGray};
									}
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
		</Layout>
	)
}

export default Landing

export const query = graphql`
	query ($slug: String) {
		landing: datoCmsLanding(slug: { eq: $slug }) {
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			title
			slug
			seo {
				description
			}
			readMore
			meta {
				publishedAt
			}
			eventCalendar {
				... on DatoCmsCampaignName {
					__typename
					campaignName
				}
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
			}
			channelList {
				id
				image {
					url
					alt
					gatsbyImageData(
						width: 200
						placeholder: NONE
						imgixParams: {
							auto: "format"
							fit: "crop"
							crop: "faces"
							w: "200"
							h: "200"
						}
					)
				}
				heading
				channelLink {
					...ChannelLink
				}
			}
			brief
			ctaChapterResourceDetailList {
				... on DatoCmsEmailBar {
					__typename
					id
					showEmail
				}
				... on DatoCmsResourceList {
					__typename
					id
					listHeading
					displayAsCarousel
					randomize
					resource {
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
											auto: "format"
											fit: "fill"
											fill: "blur"
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
											auto: "format"
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
											auto: "format"
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
											auto: "format"
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
											auto: "format"
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									)
								}
							}
						}
						... on DatoCmsCampaignLanding {
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
											auto: "format"
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
											auto: "format"
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									)
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
											auto: "format"
											fill: "blur"
											fit: "fill"
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
											auto: "format"
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
										auto: "format"
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
											auto: "format"
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
				... on DatoCmsChapterConnection {
					__typename
					showChapterConnection
				}
			}
		}
	}
`
