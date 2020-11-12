import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'

import Layout from '../components/Layout'
import CalendarFilter from '../components/Calendar/CalendarFilter'

import { styles } from '../css/css'

import chapterList from '../utils/chapterList'

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
	.fc-col-header-cell-cushion {
		padding: ${styles.scale.px12};
		color: ${styles.colors.darkGray};
	}
	.fc-col-header {
		margin-bottom: 0;
	}
	.fc-daygrid-day-frame {
		padding: 1rem 0 1rem 1rem;
	}
	.fc-list-table tbody tr {
		position: relative;
	}
	.fc-list-day {
		background-color: ${styles.colors.lightGray};
		z-index: 100;
	}
	.fc-daygrid-event {
		display: grid;
		grid-template-columns: 1fr 4fr 10fr;
	}
	.fc-daygrid-event-dot {
		grid-column: 1 / 2;
		margin-top: ${styles.scale.px7};
	}
	.fc-event-time {
		grid-column: 2 / 3;
	}
	.fc-event-title {
		padding: 0 1px;
		white-space: normal;
		grid-column: 3 / 4;
	}
	.fc-event-main {
		grid-column: 1 / 4;
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
`

const AFSPCalendar = ({ data }) => {
	const [allEvents, setAllEvents] = useState([])
	const [events, setEvents] = useState([])
	const [programs, setPrograms] = useState([])
	const [chapterFilter, setChapterFilter] = useState(null)
	const [programFilter, setProgramFilter] = useState(null)

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
					<FullCalendar
						plugins={[listPlugin, dayGridPlugin]}
						initialView="list"
						events={events}
					/>
				</div>
				{console.log(events)}
				<div css={deskCalendarCSS}>
					<FullCalendar
						plugins={[dayGridPlugin, listPlugin]}
						initialView="dayGridMonth"
						events={events}
						buttonText={{
							dayGridMonth: 'Month',
							listWeek: 'List',
							today: 'Today',
						}}
						headerToolbar={{
							start: 'title', // will normally be on the left. if RTL, will be on the right
							center: 'dayGridMonth,listWeek',
							end: 'today prev,next', // will normally be on the right. if RTL, will be on the left
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
