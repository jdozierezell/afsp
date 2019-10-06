import React from 'react'
import { css } from '@emotion/core'

import Channel from './Channel'

import { styles } from '../../css/css'

const containerCSS = css`
	padding: ${styles.scale.px50} ${styles.scale.px24};
	background-color: ${styles.colors.lightGray};
	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: ${styles.scale.px80};
	grid-column-gap: ${styles.scale.px20};
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50};
		background-color: ${styles.colors.white};
		grid-template-columns: repeat(3, 1fr);
	}
`

const ChannelContainer = () => {
	return (
		<section css={containerCSS}>
			<Channel />
			<Channel />
			<Channel />
		</section>
	)
}

export default ChannelContainer