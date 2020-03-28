import React from 'react'
import { css } from '@emotion/core'

import Channel from './Channel'

import { styles } from '../../css/css'

const containerCSS = css`
	padding: ${styles.scale.px50} ${styles.scale.px24};
	background-color: ${styles.colors.lightGray};
	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: ${styles.scale.px90};
	grid-column-gap: ${styles.scale.px44};
	max-width: 1680px;
	margin: 0 auto;
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50};
		background-color: ${styles.colors.white};
	}
`

const ChannelContainer = ({ slug, channelList, addCSS }) => {
	let columns = 0
	switch (channelList.length) {
		case 2:
			columns = 2
			break
		case 3:
			columns = 3
			break
		default:
			// four or more items
			columns = 4
			break
	}
	return (
		<section
			css={css`
				${containerCSS};
				@media (min-width: ${styles.screens.tablet}px) {
					grid-template-columns: repeat(${columns}, 1fr);
				}
				${addCSS};
			`}
		>
			{channelList.map((channel, index) => (
				<Channel key={index} slug={slug} channel={channel} />
			))}
		</section>
	)
}

export default ChannelContainer
