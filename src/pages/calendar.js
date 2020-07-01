import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import Layout from '../components/Layout'

import { styles } from '../css/css'

const calendarCSS = css`
	padding: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px50};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px180} ${styles.scale.px50} ${styles.scale.px80};
	}
`

const AFSPCalendar = ({ data }) => {
	const [events, setEvents] = useState([])

	useEffect(() => {
		if (events.length === 0 && events[0] !== 'no events') {
			fetch(`//aws-fetch.s3.amazonaws.com/events/merged-events.json`)
				.then(response => {
					if (response.status >= 400) {
						throw new Error('Bad response from server')
					}
					return response.json()
				})
				.then(response => {
					setEvents(response.events)
				})
		}
	})

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={data.calendar.seoMetaTags}
		>
			{console.log(events)}
			<section css={calendarCSS}>
				<FullCalendar
					plugins={[dayGridPlugin]}
					initialView="dayGridMonth"
					events={events}
				/>
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
