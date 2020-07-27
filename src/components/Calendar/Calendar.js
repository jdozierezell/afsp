import React from 'react'
import { css } from '@emotion/core'
import moment from 'moment'

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
				${styles.scale.px90};
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
`

const Calendar = ({ events }) => {
	let calendarTitle = ''
	let eventArray = []
	events.forEach(event => {
		if (event.__typename === 'DatoCmsCampaignName') {
			calendarTitle = event.campaignName
		} else if (event.__typename === 'DatoCmsEvent') {
			eventArray.push(event)
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
					let dateAndTime = ''
					if (event.eventStartDateAndTime) {
						if (event.eventStartDateAndTime.includes('00:00:00')) {
							dateAndTime = `All Day, ${moment(
								event.eventStartDateAndTime
							)
								.utcOffset(-4)
								.format('MMMM D')}`
						} else {
							console.log(
								event.eventStartDateAndTime.indexOf('00:00')
							)
							if (
								event.eventStartDateAndTime.indexOf('00:00') > 0
							) {
								dateAndTime = `${moment(
									event.eventStartDateAndTime
								)
									.utcOffset(-4)
									.format('MMMM D @ h a')} ET`
							} else {
								dateAndTime = `${moment(
									event.eventStartDateAndTime
								)
									.utcOffset(-4)
									.format('MMMM D @ h:mm a')}	ET`
							}
						}
					}
					if (event.eventEndDateAndTime) {
						if (event.eventEndDateAndTime.includes('00:00:00')) {
							dateAndTime += ` - All Day, ${moment(
								event.eventEndDateAndTime
							)
								.utcOffset(-4)
								.format('MMMM D')}`
						} else {
							console.log(
								event.eventEndDateAndTime.indexOf('00:00')
							)
							if (
								event.eventEndDateAndTime.indexOf('00:00') > 0
							) {
								dateAndTime += ` - ${moment(
									event.eventEndDateAndTime
								)
									.utcOffset(-4)
									.format('MMMM D @ h a')} ET`
							} else {
								dateAndTime += ` - ${moment(
									event.eventEndDateAndTime
								)
									.utcOffset(-4)
									.format('MMMM D @ h:mm a')}	ET`
							}
						}
					}
					return (
						<li key={index}>
							<h3>{event.eventTitle}</h3>
							{event.eventStartDateAndTime && (
								<h4>{dateAndTime}</h4>
							)}
							{console.log(event.brief)}
							<div
								dangerouslySetInnerHTML={{
									__html: event.brief,
								}}
							></div>
							{event.url && (
								<a
									className="secondary-button"
									href={event.url}
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
		</div>
	)
}

export default Calendar
