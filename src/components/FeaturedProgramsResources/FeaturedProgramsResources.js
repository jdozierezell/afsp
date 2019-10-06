import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const featuredCSS = css`
	img {
		margin: 0;
	}
	h2 {
		font-family: ${styles.fonts.avenirBold};
		font-size: ${styles.scale.px24};
		margin: ${styles.scale.px30} 0;
	}
	p {
		margin-bottom: ${styles.scale.px35};
	}
`

const FeaturedResources = () => {
	return (
		<div css={featuredCSS}>
			<img src="https://placekitten.com/409/250" alt="" />
			<h2>Street art tousled occupy</h2>
			<p>
				Blog gastropub next level actually vexillologist sriracha kale
				chips. Street art tousled occupy, godard pabst shoreditch trust
				fund locavore 8-bit hella crucifix mumblecore.{' '}
			</p>
			<a href="https://example.com">Learn more</a>
		</div>
	)
}

export default FeaturedResources
