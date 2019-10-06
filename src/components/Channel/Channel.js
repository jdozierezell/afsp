import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const channelCSS = css`
	text-align: center;
	@media (min-width: ${styles.screens.tablet}px) {
		text-align: left;
	}
	img {
		border-radius: 50%;
		margin: 0;
		display: inline-block;
		width: 100px;
	}
	h2 {
		margin: ${styles.scale.px30} 0;
		font-family: ${styles.fonts.avenirBold};
		font-size: ${styles.scale.px20};
	}
`

const Channel = () => {
	return (
		<div css={channelCSS}>
			<img src="https://placekitten.com/200" alt="" />
			<h2>Foo</h2>
			<p>
				Blog gastropub next level actually vexillologist sriracha kale
				chips. Street art tousled occupy, godard pabst shoreditch trust
				fund locavore 8-bit hella crucifix mumblecore.{' '}
			</p>
			<a href="https://example.com">Find support</a>
		</div>
	)
}

export default Channel
