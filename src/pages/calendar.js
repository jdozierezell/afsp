import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import moment from 'moment'

import { Calendar, momentLocalizer } from 'react-big-calendar'

import Layout from '../components/Layout'
import CalendarFilter from '../components/Calendar/CalendarFilter'
import CalendarProgramDescriptions from '../components/Calendar/CalendarProgramDescriptions'

import { styles } from '../css/css'

import chapterList from '../utils/chapterList'

import 'react-big-calendar/lib/css/react-big-calendar.css'

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
`

const AFSPCalendar = ({ data }) => {
	const [allEvents, setAllEvents] = useState([])
	const [events, setEvents] = useState([])
	const [programs, setPrograms] = useState([])
	const [chapterFilter, setChapterFilter] = useState(null)
	const [programFilter, setProgramFilter] = useState(null)

	const localizer = momentLocalizer(moment)

	const handleChapterSelectChange = chapter => {
		setChapterFilter(chapter ? chapter.value : null)
	}
	const handleProgramSelectChange = program =>
		setProgramFilter(program ? program.value : null)

	useEffect(() => {
		if (allEvents.length === 0 && allEvents[0] !== 'no events') {
			fetch(`//aws-fetch.s3.amazonaws.com/events/merged-programs.json`)
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
				filteredEvents = filteredEvents.filter(
					event => event.chapterCode === chapterFilter
				)
			}
			if (programFilter) {
				filteredEvents = filteredEvents.filter(
					event => event.programcode === programFilter
				)
			}
			setEvents(filteredEvents)
		}
	}, [chapterFilter, programFilter, allEvents])
	return (
		<Layout
			theme={styles.logo.mobileDarkDesktopDark}
			seo={data.calendar.seoMetaTags}
		>
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
					handleChapterSelectChange={handleChapterSelectChange}
					handleProgramSelectChange={handleProgramSelectChange}
					programs={programs}
					chapters={chapterList}
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
						onDrillDown={e => console.log(e)}
						popup={true}
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
		</Layout>
	)
}

export default AFSPCalendar

export const query = graphql`
	query {
		# gatsby-source-datocms
		calendar: datoCmsCalendar {
			title
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			programDescriptions {
				programName
				programDescription
			}
		}
	}
`
