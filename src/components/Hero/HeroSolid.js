import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const solidHeroCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px50};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px180} ${styles.scale.px50}
			${styles.scale.px160};
	}
	li,
	h1,
	p {
		color: ${styles.colors.white};
	}
	ul {
		list-style: none;
		margin: 0;
	}
	li {
		display: inline;
		:not(:last-of-type) {
			:after {
				content: ' > ';
			}
		}
	}
	h1 {
		margin: ${styles.scale.px35} 0;
		font-size: ${styles.scale.px36};
		max-width: 700px;
		@media (min-width: ${styles.screens.mobile}) {
			margin: ${styles.scale.px40} 0;
		}
	}
	p {
		max-width: 700px;
	}
`

const HeroSolid = () => {
	return (
		<div css={solidHeroCSS}>
			<ul>
				<li>Find support</li>
				<li>I've lost someone</li>
				<li>Practical information for immediately after a loss</li>
			</ul>
			<h1>Practical information for immediately after a loss</h1>
			<p>
				You are not alone. Read real stories from others who have shared
				their personal experiences around struggling with suicide or
				coping with the loss of a loved one.
			</p>
		</div>
	)
}

export default HeroSolid
