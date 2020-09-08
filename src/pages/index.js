import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import moment from 'moment-timezone'
import Script from 'react-load-script'

import Layout from '../components/Layout'
import BreakingNews from '../components/BreakingNews/BreakingNews'
import HeroVideo from '../components/Hero/HeroVideo'
import ChannelContainer from '../components/Channel/ChannelContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'
import CarouselDetailContainer from '../components/Carousels/CarouselDetailContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'
import InstagramFeed from '../components/Social/InstagramFeed'
import Ticker from '../components/Ticker/Ticker'

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
	let events = {
		title: 'AFSP national events',
		details: [],
	}
	if (home.eventsList.length > 0) {
		const timeZone = moment.tz.guess()
		home.eventsList.forEach(event => {
			if (event.__typename === 'DatoCmsEventsList') {
				event.events.forEach(e => {
					let eventObject = {
						__typename: 'Event',
						title: e.title,
						startDate: e.startDateAndTime
							? moment
									.tz(e.startDateAndTime, timeZone)
									.format('MMMM D @ h:mm a z')
							: null,
						endDate: e.endDateAndTime
							? moment
									.tz(e.endDateAndTime, timeZone)
									.format('MMMM D @ h:mm a z')
							: null,
						buttonText: e.buttonText,
						url: e.url,
						eventCode: e.eventCode,
					}
					eventObject.date =
						e.startDateAndTime.indexOf('00:00:00') === -1
							? moment
									.tz(e.startDateAndTime, timeZone)
									.format('MMMM D @ h:mm a z')
							: moment(e.startDateAndTime).format('MMMM D')
					if (e.endDateAndTime) {
						eventObject.date += ` — 
					${
						e.endDateAndTime.indexOf('00:00:00') === -1
							? moment
									.tz(e.endDateAndTime, timeZone)
									.format('MMMM D @ h:mm a z')
							: moment(e.endDateAndTime).format('MMMM D')
					}`
					}
					events.details.push(eventObject)
				})
			}
		})
	}

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={home.seoMetaTags}
		>
			{home.breakingNews && <BreakingNews news={home.breakingNews} />}
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
				if (index <= 4) {
					if (item.__typename === 'DatoCmsChannelList') {
						return (
							<ChannelContainer
								key={index}
								channelList={item.channels}
								// channelListMedia={afspMedia.home.channelList}
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
					}
					return ''
				}
				return ''
			})}
			{events && (
				<CarouselDetailContainer
					content={events}
					eventTitleSize="1.4em"
				/>
			)}
			{home.ctaChapterResourceList.map((item, index) => {
				if (index > 4) {
					if (item.__typename === 'DatoCmsChannelList') {
						return (
							<ChannelContainer
								key={index}
								channelList={item.channels}
								// channelListMedia={afspMedia.home.channelList}
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
					}
					return ''
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
			eventsList {
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
				... on DatoCmsEvent {
					eventTitle
					eventStartDateAndTime
					eventEndDateAndTime
					buttonText
					url
					eventCode
					brief
				}
			}
			ctaChapterResourceList {
				... on DatoCmsChannelList {
					__typename
					channels {
						id
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
							id
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
							id
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
							id
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
							id
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
