import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import moment from 'moment'

import { Calendar, momentLocalizer } from 'react-big-calendar'

import Layout from '../components/Layout'
import CalendarFilter from '../components/Calendar/CalendarFilter'

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
	> p:first-of-type {
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
`
const deskCalendarCSS = css`
	display: none;
	position: relative;
	z-index: 0;
	@media (min-width: ${styles.screens.navigation}px) {
		display: block;
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

	const handleChapterSelectChange = chapter =>
		setChapterFilter(chapter ? chapter.value : null)
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
				console.log(chapterFilter)
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
					Lorem ipsum dolor sit, amet consectetur adipisicing elit.
					Sint velit nostrum voluptas esse unde laborum, sed iure in
					perferendis, ex vero consectetur officia cum at, itaque
					error omnis eligendi nesciunt.
				</p>
				<CalendarFilter
					zIndex="1"
					handleChapterSelectChange={handleChapterSelectChange}
					handleProgramSelectChange={handleProgramSelectChange}
					programs={programs}
					chapters={chapterList}
				/>
				<div css={mobileCalendarCSS}>
					<Calendar
						localizer={localizer}
						events={events}
						startAccessor="start"
						endAccessor="end"
						defaultView="agenda"
						views={['agenda']}
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
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
		}
	}
`
