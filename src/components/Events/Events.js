import React from 'react'
import { css } from '@emotion/core'

import createAnchor from '../../utils/createAnchor'

import { styles } from '../../css/css'

const containerCSS = css`
	padding: ${styles.scale.px50} ${styles.scale.px24};
	position: relative;
	max-width: 623px;
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50};
	}
	> h2 {
		margin-bottom: ${styles.scale.px35};
		font-size: ${styles.scale.px36};
		font-family: ${styles.fonts.paul};
		@media (min-width: ${styles.screens.tablet}px) {
			margin-bottom: ${styles.scale.px60};
			font-size: ${styles.scale.px44};
		}
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	li {
		margin-bottom: ${styles.scale.px24};
	}
	a {
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
	h3,
	p {
		color: ${styles.colors.poppy};
	}
	h3 {
		margin-bottom: ${styles.scale.px7};
	}
`

const Events = ({ header, events }) => {
	return (
		<div css={containerCSS}>
			<h2 id={createAnchor(header)}>{header}</h2>
			<ul>
				{events.map((event, index) => (
					<li key={index}>
						{console.log(event)}
						<a
							href={event.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<h3>{event.title}</h3>
							<p>
								{event.date} •{' '}
								{event.city ? `${event.city}, ` : ''}
								{event.state}
							</p>
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Events
