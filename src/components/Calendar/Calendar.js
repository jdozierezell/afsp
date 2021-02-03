import React from 'react'
import { css } from '@emotion/core'
import Script from 'react-load-script'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import addHours from 'date-fns/addHours'

import createAnchor from '../../utils/createAnchor'

import { styles } from '../../css/css'

const calendarCSS = css`
	padding: ${styles.scale.px50} ${styles.scale.px24};
	font-family: ${styles.fonts.avenirRegular};
	background-color: ${styles.colors.yellow};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50};
	}
	> ul {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: ${styles.gridGap.mobile};
		margin: 0;
		padding: 0;
		@media (min-width: ${styles.screens.tablet}px) {
			grid-template-columns: repeat(2, 1fr);
			grid-gap: ${styles.gridGap.desktop};
		}
		@media (min-width: ${styles.screens.navigation}px) {
			grid-template-columns: repeat(3, 1fr);
			grid-gap: ${styles.gridGap.desktop};
		}
		> li {
			display: inline-block;
			position: relative;
			width: 100%;
			background-color: ${styles.colors.lightGray};
			border: ${styles.scale.px5} solid ${styles.colors.white};
			border-radius: ${styles.scale.px5};
			padding: ${styles.scale.px12} ${styles.scale.px12}
				${styles.scale.px126};
		}
		> li:nth-of-type(2n + 1) {
			@media (min-width: ${styles.screens.tablet}px) {
				grid-column: 1 / 2;
			}
		}
		> li:nth-of-type(2n + 2) {
			@media (min-width: ${styles.screens.tablet}px) {
				grid-column: 2 / 3;
			}
		}
		> li:nth-of-type(3n + 1) {
			@media (min-width: ${styles.screens.navigation}px) {
				grid-column: 1 / 2;
			}
		}
		> li:nth-of-type(3n + 2) {
			@media (min-width: ${styles.screens.navigation}px) {
				grid-column: 2 / 3;
			}
		}
		> li:nth-of-type(3n + 3) {
			@media (min-width: ${styles.screens.navigation}px) {
				grid-column: 3 / 4;
			}
		}
	}
	.secondary-button {
		position: absolute;
		bottom: ${styles.scale.px12};
		left: ${styles.scale.px12};
	}
	.addeventatc {
		font-family: ${styles.fonts.avenirBold};
		font-size: ${styles.scale.px18};
		font-weight: inherit;
		line-height: inherit;
		color: ${styles.colors.poppy} !important;
		background-color: ${styles.colors.white};
		border-radius: ${styles.scale.px30};
		border: solid 2px ${styles.colors.poppy};
		padding: ${styles.scale.px10} ${styles.scale.px32};
		margin-bottom: ${styles.scale.px24};
		display: inline-block;
		text-decoration: none;
		cursor: pointer;
		:hover {
			background-color: ${styles.colors.white};
			color: ${styles.colors.poppy} !important;
			font-size: ${styles.scale.px18};
		}
		.addeventatc_icon {
			top: 14px;
		}
	}
`

const Calendar = ({ events }) => {
	let calendarTitle = ''
	let eventArray = []
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
	events.forEach(event => {
		if (event.__typename === 'DatoCmsCampaignName') {
			calendarTitle = event.campaignName
		} else if (event.__typename === 'DatoCmsEventsList') {
			event.events.forEach(e => eventArray.push(e))
		}
	})
	return (
		<div
			css={calendarCSS}
			id={`${createAnchor(calendarTitle.toLowerCase())}-events-calendar`}
		>
			<h2>{calendarTitle} events calendar</h2>
			<ul>
				{eventArray.map((event, index) => {
					let dateAndTime, start, end
					if (event.startDateAndTime) {
						if (event.startDateAndTime.includes('00:00:00')) {
							start = parseISO(event.startDateAndTime)
							start = addHours(start, 5) // accommodate for timezones when dealing with all day events
							start = `All Day, ${format(start, 'MMMM d')}`
						} else {
							if (event.startDateAndTime.indexOf('00:00') > 0) {
								start = parseISO(event.startDateAndTime)
								start = format(
									start,
									"MMMM d @ h aaaaa'm' zzz",
									{ timeZone: timeZone }
								)
							} else {
								start = parseISO(event.startDateAndTime)
								start = format(
									start,
									"MMMM d @ h:mm aaaaa'm' zzz",
									{ timeZone: timeZone }
								)
							}
						}
					}
					if (event.endDateAndTime) {
						if (event.endDateAndTime.includes('00:00:00')) {
							end = parseISO(event.endDateAndTime)
							console.log(end)
							end = addHours(end, 5) // accommodate for timezones when dealing with all day events
							console.log(end)
							end = `All Day, ${format(end, 'MMMM d')}`
						} else {
							if (event.endDateAndTime.indexOf('00:00') > 0) {
								end = parseISO(event.endDateAndTime)
								end = format(end, "MMMM d @ h aaaaa'm' zzz", {
									timeZone: timeZone,
								})
							} else {
								end = parseISO(event.endDateAndTime)
								end = format(
									end,
									"MMMM d @ h:mm aaaaa'm' zzz",
									{ timeZone: timeZone }
								)
							}
						}
					}
					dateAndTime = end ? `${start} – ${end}` : start
					dateAndTime = dateAndTime
						.replace(/ST/g, 'T')
						.replace(/DT/g, 'T')
					return (
						<li key={index}>
							<h3>{event.title}</h3>
							{event.startDateAndTime && <h4>{dateAndTime}</h4>}
							<div
								dangerouslySetInnerHTML={{
									__html: event.brief,
								}}
							></div>
							{event.url && !event.eventCode && (
								<a
									className="secondary-button"
									href={event.url}
								>
									{event.buttonText
										? event.buttonText
										: 'Add to calendar'}
								</a>
							)}
							{event.eventCode && (
								<a
									title="Add to Calendar"
									className="secondary-button addeventatc"
									data-id="Vz5063017"
									href="https://www.addevent.com/event/Vz5063017"
								>
									{event.buttonText
										? event.buttonText
										: 'Add to calendar'}
								</a>
							)}
						</li>
					)
				})}
			</ul>
			<Script
				attributes={{
					async: '',
					type: 'text/javascript',
				}}
				url="//addevent.com/libs/atc/1.6.1/atc.min.js"
			/>
		</div>
	)
}

export default Calendar
