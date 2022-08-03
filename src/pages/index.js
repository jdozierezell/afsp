import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import Script from 'react-load-script'
import fetch from 'isomorphic-fetch'

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
	const [addEvent, setAddEvent] = useState({
		title: 'AFSP national events',
		details: [],
	})
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
	let events = {
		title: 'AFSP national events',
		details: [],
	}

	useEffect(() => {
		fetch(
			'https://www.addevent.com/api/v1/oe/events/list/?token=api1597763535vAb4iZ7xahkIFj5zRDWY95036&calendar_id=1659478767486686&upcoming=now'
		)
			.then(response => response.json())
			.then(result => {
				const events = result.events
				console.log(events)
				return events.map(event => {
					const startDate = dayjs
						.unix(event.date_start_unix)
						.tz('Etc/Greenwich')
						.format(
							event.all_day_event === 'true' ||
								event.date_end > event.date_start
								? 'MMMM D'
								: 'MMMM D @ h:mm a ET'
						)
					const endDate =
						event.date_end > event.date_start
							? dayjs(event.date_end, 'MM/DD/YYYY').format(
									'MMMM D'
							  )
							: ''
					return {
						__typename: 'Event',
						buttonText: 'Add to calendar',
						date:
							endDate !== ''
								? `${startDate} – ${endDate}`
								: startDate,
						endDate,
						eventCode: event.uniquekey,
						startDate,
						title: event.title,
						url: '',
					}
				})
			})
			.then(results =>
				setAddEvent(prevState => ({ ...prevState, details: results }))
			)
			.catch(error => console.log('error', error))
	}, [])

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={home.seoMetaTags}
			structuredData={structuredData}
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
				} else if (item.__typename === 'DatoCmsEventsList') {
					// item.events.forEach(e => {
					// 	let start, end
					// 	let eventObject = {
					// 		__typename: 'Event',
					// 		title: e.title,
					// 		startDate: e.startDateAndTime
					// 			? dayjs(e.startDateAndTime)
					// 					.tz('America/New_York')
					// 					.format('MMMM D @ h:mm a ET')
					// 			: null,
					// 		endDate: e.endDateAndTime
					// 			? dayjs(e.endDateAndTime)
					// 					.tz('America/New_York')
					// 					.format('MMMM D @ h:mm a ET')
					// 			: null,
					// 		buttonText: e.buttonText,
					// 		url: e.url,
					// 		eventCode: e.eventCode,
					// 	}
					// 	// format start date and time
					// 	if (e.startDateAndTime.indexOf('00:00:00') !== -1) {
					// 		start = dayjs(e.startDateAndTime)
					// 			.tz('America/New_York')
					// 			.format('MMMM D')
					// 	} else if (
					// 		e.startDateAndTime.indexOf(':00:00') === -1
					// 	) {
					// 		start = dayjs(e.startDateAndTime)
					// 			.tz('America/New_York')
					// 			.format('MMMM D @ h:mm a ET')
					// 	} else {
					// 		start = dayjs(e.startDateAndTime)
					// 			.tz('America/New_York')
					// 			.format('MMMM D @ h a ET')
					// 	}
					// 	// format end date and time
					// 	if (e.endDateAndTime) {
					// 		if (e.endDateAndTime.indexOf('00:00:00') !== -1) {
					// 			end = dayjs(e.endDateAndTime)
					// 				.tz('America/New_York')
					// 				.format('MMMM D')
					// 		} else if (
					// 			e.endDateAndTime.indexOf(':00:00') === -1
					// 		) {
					// 			end = dayjs(e.endDateAndTime)
					// 				.tz('America/New_York')
					// 				.format('MMMM D @ h:mm a ET')
					// 		} else {
					// 			end = dayjs(e.endDateAndTime)
					// 				.tz('America/New_York')
					// 				.format('MMMM D @ h a ET')
					// 		}
					// 	}
					// 	eventObject.date = e.endDateAndTime
					// 		? `${start} – ${end}`
					// 		: start
					// 	events.details.push(eventObject)
					// })
					return (
						<CarouselDetailContainer
							key={index}
							content={addEvent}
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
											fit: "crop"
											crop: "faces"
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
											fit: "crop"
											crop: "faces"
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
											fit: "crop"
											crop: "faces"
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
											fit: "crop"
											crop: "faces"
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
