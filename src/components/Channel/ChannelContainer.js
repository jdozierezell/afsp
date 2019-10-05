import React from 'react'
import { css } from '@emotion/core'

import Channel from './Channel'

import { styles } from '../../css/css'

const channelContainerCSS = css`
	margin: 0 ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0 ${styles.scale.px50};
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
`

const ChannelContainer = () => {
	return (
		<div css={channelContainerCSS}>
			<Channel />
			<Channel />
			<Channel />
		</div>
	)
}

export default ChannelContainer
