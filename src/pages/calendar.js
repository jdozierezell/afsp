import React, { useState, useEffect } from 'react'
import qs from 'qs'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'

import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'

import { SEO } from '../components/SEO/SEO'
import Layout from '../components/Layout'
import CalendarFilter from '../components/Calendar/CalendarFilter'
import CalendarProgramDescriptions from '../components/Calendar/CalendarProgramDescriptions'
import CalendarEventModal from '../components/Calendar/CalendarEventModal'

import { styles } from '../css/css'

import chapterList from '../utils/chapterList'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
	'en-US': require('date-fns/locale/en-US'),
}
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
})

const eventMonthDisplay = ({ event }) => {
	return (
		<a
			href={event.url}
			target="_blank"
			rel="noopener noreferrer"
			css={css`
				color: ${styles.colors.white};
				text-decoration: none;
			`}
		>
			{event.title}
		</a>
	)
}

const eventListDisplay = ({ event }) => {
	return (
		<a
			href={event.url}
			target="_blank"
			rel="noopener noreferrer"
			css={css`
				color: ${styles.colors.blue};
				font-family: ${styles.fonts.avenirDemi};
			`}
		>
			{event.title}
		</a>
	)
}

const calendarCSS = css`
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

const mobileCalendarCSS = css`
	display: block;
	position: relative;
	z-index: 0;
	@media (min-width: ${styles.screens.navigation}px) {
		display: none;
	}
	td {
		width: 33vw;
		border-left: 1px solid #ddd;
		white-space: normal;
	}
`
const deskCalendarCSS = css`
	display: none;
	position: relative;
	z-index: 0;
	@media (min-width: ${styles.screens.navigation}px) {
		display: block;
	}
	td {
		border-left: 1px solid #ddd;
	}
	.rbc-today {
		background-color: ${styles.colors.lightGray};
	}
	.rbc-event {
		background-color: ${styles.colors.blue};
		margin: 3px 10px;
		width: calc(100% - (10px * 2));
	}
	.rbc-show-more {
		margin-left: 10px;
	}
	.rbc-overlay {
		display: none !important;
	}
`

const AFSPCalendar = ({ data }) => {
	const [allEvents, setAllEvents] = useState([])
	const [events, setEvents] = useState([])
	const [programs, setPrograms] = useState([])
	const [chapterFilter, setChapterFilter] = useState(null)
	const [programFilter, setProgramFilter] = useState(null)
	const [modalIsOpen, setIsOpen] = useState(false)
	const [focusedEvents, setFocusedEvents] = useState([])
	const [selectedDate, setSelectedDate] = useState('')

	let metaImage,
		metaDescription = ''
	data.calendar.seoMetaTags.tags.forEach(tag => {
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

	const openModal = () => {
		setIsOpen(true)
	}
	const closeModal = () => {
		setIsOpen(false)
	}
	const findFocusedEvents = async e => {
		setSelectedDate(dayjs(e).format('dddd, MMMM D'))
		let eventsToModal = []
		eventsToModal = events.filter(
			event =>
				dayjs(event.start).format('MMMM D') ===
				dayjs(e).format('MMMM D')
		)
		eventsToModal.sort((a, b) => {
			if (a.title < b.title) {
				return -1
			}
			if (a.title > b.title) {
				return 1
			}
			return 0
		})
		setFocusedEvents(eventsToModal)
		openModal()
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
		if (
			query.program !== programFilter &&
			typeof query.program === 'string'
		) {
			setProgramFilter(query.program)
		}
	}

	const [searchState, setSearchState] = useState(query)

	const handleChapterSelectChange = chapter => {
		let queryPath
		chapter = chapter.value
		setSearchState({ ...searchState, chapter })
		setChapterFilter(chapter ? chapter.value : null)
		if (chapter && programFilter) {
			queryPath = `?chapter=${chapter}&program=${programFilter}`
		} else if (chapter) {
			queryPath = `?chapter=${chapter}`
		} else if (programFilter) {
			queryPath = `?program=${programFilter}`
		}
		window.history.replaceState(
			{},
			'',
			`${window.location.pathname}${queryPath ? queryPath : ''}`
		)
	}
	const handleProgramSelectChange = program => {
		let queryPath
		program = program.value
		setSearchState({ ...searchState, program })
		setProgramFilter(program ? program.value : null)
		if (chapterFilter && program) {
			queryPath = `?chapter=${chapterFilter}&program=${program}`
		} else if (chapterFilter) {
			queryPath = `?chapter=${chapterFilter}`
		} else if (program) {
			queryPath = `?program=${program}`
		}
		window.history.replaceState(
			{},
			'',
			`${window.location.pathname}${queryPath ? queryPath : ''}`
		)
	}

	useEffect(() => {
		if (allEvents.length === 0 && allEvents[0] !== 'no events') {
			fetch(
				`//aws-fetch.s3.amazonaws.com/events-cache-bust/merged-programs.json`
			)
				.then(response => {
					if (response.status >= 400) {
						throw new Error('Bad response from server')
					}
					return response.json()
				})
				.then(response => {
					let filteredEvents = response.programEvents
					let programList = [],
						tempProgramList = []
					filteredEvents.forEach(event => {
						if (!tempProgramList.includes(event.programcode)) {
							tempProgramList.push(event.programcode)
						}
					})
					tempProgramList.sort((a, b) => {
						const tempA = a.toUpperCase()
						const tempB = b.toUpperCase()
						if (tempA < tempB) {
							return -1
						}
						if (tempA > tempB) {
							return 1
						}
						return 0
					})
					tempProgramList.forEach(program => {
						programList.push({ value: program, label: program })
					})
					setPrograms(programList)
					if (chapterFilter) {
						filteredEvents = filteredEvents.filter(
							event => event.chapterCode === chapterFilter
						)
					}
					if (programFilter) {
						filteredEvents = filteredEvents.filter(
							event => event.programcode === programFilter
						)
					}
					setAllEvents(response.programEvents)
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
			if (programFilter) {
				filteredEvents = filteredEvents.filter(
					event => event.programcode === programFilter
				)
			}
			setEvents(filteredEvents)
		}
	}, [chapterFilter, programFilter, allEvents, focusedEvents])

	return (
		<Layout theme={styles.logo.mobileDarkDesktopDark}>
			<section css={calendarCSS}>
				<p>
					The program calendar provides information about programs
					&amp; events offered by our{' '}
					<a href="https://afsp.org/chapters">
						national network of chapters
					</a>
					. Filter the calendar by selecting a program to find events
					across the country, or choose your local chapter for events
					in your area.
				</p>
				<p>
					Due to COVID-19, most of our programs are offered virtually
					only. In-person events will be scheduled as safety allows
					and our communities return to normal operations.
				</p>
				<CalendarFilter
					zIndex="1"
					chapterFilter={chapterFilter}
					programFilter={programFilter}
					handleChapterSelectChange={handleChapterSelectChange}
					handleProgramSelectChange={handleProgramSelectChange}
					chapters={chapterList}
					programs={programs}
				/>
				<CalendarProgramDescriptions
					program={programFilter}
					programDescriptions={data.calendar.programDescriptions}
				/>
				<div css={mobileCalendarCSS}>
					<Calendar
						localizer={localizer}
						events={events}
						startAccessor="start"
						endAccessor="end"
						defaultView="agenda"
						views={['agenda']}
						components={{
							agenda: {
								event: eventListDisplay,
							},
						}}
					/>
				</div>
				<div css={deskCalendarCSS}>
					<Calendar
						localizer={localizer}
						events={events}
						startAccessor="start"
						endAccessor="end"
						defaultView="month"
						views={['month', 'agenda']}
						messages={{
							month: 'Month',
							agenda: 'List',
						}}
						style={{ height: 1100 }}
						onDrillDown={e => findFocusedEvents(e)}
						popup={false}
						components={{
							month: {
								event: eventMonthDisplay,
							},
							agenda: {
								event: eventListDisplay,
							},
						}}
					/>
				</div>
			</section>
			<CalendarEventModal
				modalIsOpen={modalIsOpen}
				closeModal={closeModal}
				focusedEvents={focusedEvents}
				selectedDate={selectedDate}
			></CalendarEventModal>
		</Layout>
	)
}

export default AFSPCalendar

export const Head = ({ data: { calendar } }) => {
	let metaImage,
		metaDescription = ''

	calendar.seoMetaTags.tags.forEach(tag => {
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
		about: 'suicide events',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: calendar.title,
		lastReviewed: calendar.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${calendar.slug}`,
	}

	return <SEO structuredData={structuredData} meta={calendar.seoMetaTags} />
}

export const query = graphql`
	query {
		# gatsby-source-datocms
		calendar: datoCmsCalendar {
			title
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
			}
			programDescriptions {
				programName
				programDescription
			}
		}
	}
`
