import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const featuredCSS = css`
	img {
		margin: 0;
	}
	h2 {
		margin: ${styles.scale.px30} 0;
		a {
			font-size: ${styles.scale.px20};
			line-height: ${styles.scale.px28};
		}
		@media (min-width: ${styles.screens.tablet}px) {
			margin: ${styles.scale.px30} 0 ${styles.scale.px35};
		}
	}
	p {
		margin-bottom: ${styles.scale.px35};
		@media (min-width: ${styles.screens.tablet}px) {
			margin-bottom: ${styles.scale.px60};
		}
	}
	h3 {
		margin-bottom: 0;
		a {
			font-size: ${styles.scale.px17};
			text-transform: uppercase;
		}
	}
	a {
		font-family: ${styles.fonts.avenirBold};
		color: ${styles.colors.darkGray};
		text-decoration: none;
		:hover {
			color: ${styles.colors.poppy};
			text-decoration: underline;
		}
	}
`

const Stories = () => {
	return (
		<div css={featuredCSS}>
			<img src="https://placekitten.com/409/250" alt="" />
			<h2>
				<a href="https://example.com">
					Street art tousled occupy sriracha kale
				</a>
			</h2>
			<p>
				Blog gastropub next level actually vexillologist sriracha kale
				chips. Street art tousled occupy, godard pabst shoreditch trust
				fund locavore 8-bit hella crucifix mumblecore.
			</p>
			<h3>
				<a href="https://example.com">By Example</a>
			</h3>
		</div>
	)
}

export default Stories
