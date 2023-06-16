import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { SEO } from '../components/SEO/SEO'
import Layout from '../components/Layout'
import ChannelContainer from '../components/Channel/ChannelContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import CarouselResourceContainer from '../components/Carousels/CarouselResourceContainer'
import CarouselDetailContainer from '../components/Carousels/CarouselDetailContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'
import EmailSignupBar from '../components/EmailSignup/EmailSignupBar'

import { styles } from '../css/css'

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
	const [readMore, setReadMore] = useState(false)
	let adjacent = 0
	let events = {
		title: '',
		details: [],
	}
	let hideEmailLayout
	let eventCalendarNumber = 0
	if (landing.ctaChapterResourceDetailList.length > 0) {
		landing.ctaChapterResourceDetailList.forEach(resource => {
			if (
				resource.__typename === 'DatoCmsCampaignEventCalendar' &&
				eventCalendarNumber === 0
			) {
				events.title = `${resource.campaignName} Event Calendar`
				resource.eventList.forEach(e => {
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
				eventCalendarNumber++
			}
		})
	}
	return (
		<Layout
			theme={styles.logo.mobileDarkDesktopDark}
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
			{landing.ctaChapterResourceDetailList.map((item, index) => {
				const itemsToCheck = ['DatoCmsResourceList']
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
				} else if (item.__typename === 'DatoCmsCampaignEventCalendar') {
					return (
						<CarouselDetailContainer
							content={events}
							key={index}
							eventTitleSize="1.4em"
							id="national-events"
							addContainerCSS={css`
								border-top: ${styles.scale.px7} solid
									${styles.colors.white};
								border-bottom: ${styles.scale.px7} solid
									${styles.colors.white};
							`}
						/>
					)
				} else if (item.__typename === 'DatoCmsResourceList') {
					if (item.displayAsCarousel) {
						const backgroundColor =
							adjacent % 2 !== 1 || adjacent === 0
								? styles.colors.lightGray
								: styles.colors.white
						return (
							<CarouselResourceContainer
								key={index}
								listHeading={item.listHeading}
								resources={item.resource}
								randomize={item.randomize}
								addCSS={css`
									background-color: ${backgroundColor};
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

export const Head = ({ data: { landing } }) => {
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

	return <SEO structuredData={structuredData} meta={landing.seoMetaTags} />
}

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
			channelList {
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
			brief
			ctaChapterResourceDetailList {
				... on DatoCmsCampaignEventCalendar {
					__typename
					id
					campaignName
					eventList {
						brief
						buttonText
						endDateAndTime
						eventCode
						id
						startDateAndTime
						title
						url
					}
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
