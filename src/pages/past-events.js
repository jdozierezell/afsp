import React, { useState, useEffect } from 'react'
// import { graphql } from 'gatsby'
import qs from 'qs'
import { css } from '@emotion/react'
import Select from 'react-select'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import Layout from '../components/Layout'

import { styles } from '../css/css'

import chapterList from '../utils/chapterList'

dayjs.extend(utc)

const pastEventsCSS = css`
	font-family: ${styles.fonts.avenirRegular};
	padding: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px50};
	position: relative;
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px180} ${styles.scale.px50} ${styles.scale.px80};
	}
	> p {
		max-width: 623px;
	}
`

const selectCSS = css`
	margin-bottom: ${styles.scale.px36};
	.react-select__control {
		border: 2px solid ${styles.colors.darkGray};
		border-radius: 5px;
	}
	.react-select__input {
		max-height: ${styles.scale.px42};
	}
	.react-select__placeholder {
		color: ${styles.colors.darkGray};
	}
`

const PastEvents = () => {
	const [allEvents, setAllEvents] = useState([])
	const [events, setEvents] = useState([])
	const [chapterFilter, setChapterFilter] = useState(null)

	const structuredData = {
		'@content': 'https://schema.org',
		'@type': 'WebPage',
		about: 'suicide events',
		description: 'List of Past AFSP Events',
		image: 'https://www.datocms-assets.com/12810/1565360975-stackedlogocolor.jpg',
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: 'Past Events',
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/past-events`,
	}

	let query =
		typeof window !== `undefined`
			? qs.parse(window.location.search.slice(1))
			: { query: '' }

	if (query !== '') {
		if (
			query.chapter !== chapterFilter &&
			typeof query.chapter === 'string'
		) {
			setChapterFilter(query.chapter)
		}
	}

	const [searchState, setSearchState] = useState(query)

	if (chapterList[0].label !== 'All Chapters') {
		chapterList.unshift({ value: '', label: 'All Chapters' })
	}

	let chapterSelectValue
	chapterList.forEach(chapter => {
		if (chapter.value === chapterFilter) {
			chapterSelectValue = { value: chapter.value, label: chapter.label }
		}
	})

	const handleChapterSelectChange = chapter => {
		let queryPath
		chapter = chapter.value
		setSearchState({ ...searchState, chapter })
		setChapterFilter(chapter ? chapter.value : null)
		queryPath = `?chapter=${chapter}`

		window.history.replaceState(
			{},
			'',
			`${window.location.pathname}${queryPath}`
		)
	}

	useEffect(() => {
		if (allEvents.length === 0 && allEvents[0] !== 'no events') {
			fetch(
				`//aws-fetch.s3.amazonaws.com/events-cache-bust/merged-events.json`
			)
				.then(response => {
					if (response.status >= 400) {
						throw new Error('Bad response from server')
					}
					return response.json()
				})
				.then(response => {
					response.events.sort((a, b) => {
						const aDate = new Date(a.date)
						const bDate = new Date(b.date)
						if (aDate > bDate) {
							return -1
						}
						if (aDate < bDate) {
							return 1
						}
						return 0 // if dates are equal
					})

					let filteredEvents = response.events

					if (chapterFilter) {
						filteredEvents = filteredEvents.filter(
							event => event.chapterCode === chapterFilter
						)
					}
					setAllEvents(response.events)
					setEvents(
						filteredEvents ? filteredEvents : response.programEvents
					)
				})
		} else {
			let filteredEvents = allEvents
			if (chapterFilter) {
				filteredEvents = filteredEvents.filter(event =>
					event.chapterCode
						? event.chapterCode.includes(chapterFilter)
						: false
				)
			}
			setEvents(filteredEvents)
		}
	}, [chapterFilter, allEvents])

	return (
		<Layout
			theme={styles.logo.mobileDarkDesktopDark}
			// seo={data.calendar.seoMetaTags}
			structuredData={structuredData}
		>
			<section css={pastEventsCSS}>
				<div>
					<p>
						AFSP's past fundraising events are listed below. Use the
						dropdown to filter the list by your local chapter.
					</p>
					<div>
						<Select
							name="chapter"
							id="chapter"
							title="chapter"
							css={selectCSS}
							className="react-select"
							classNamePrefix="react-select"
							value={chapterSelectValue}
							options={chapterList}
							onChange={handleChapterSelectChange}
						/>
					</div>
				</div>
				<div>
					{events.map((event, index) => {
						return (
							<div key={index}>
								<hr />
								<p>
									<a
										href={event.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										{event.title} -{' '}
										{dayjs
											.utc(event.date)
											.format('MMMM D, YYYY')}
									</a>
								</p>
								{index === events.length - 1 && <hr />}
							</div>
						)
					})}
				</div>
			</section>
		</Layout>
	)
}

export default PastEvents
