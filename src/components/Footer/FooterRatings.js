import React from 'react'
import { css } from '@emotion/core'

import IconCharityNavigator from '../SVGs/IconCharityNavigator'
import IconCharityWatch from '../SVGs/IconCharityWatch'

import { styles } from '../../css/css'

const ratingsCSS = css`
	grid-gap: 0 ${styles.gridGap.desktop};
	margin-top: ${styles.scale.px64};
	p {
		color: ${styles.colors.white};
		grid-column: 1 / 6;
	}
	@media (min-width: ${styles.screens.footer}px) {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		align-items: center;
		margin-top: 0;
		p {
			display: none;
		}
	}
`

const navigatorCSS = css`
	display: inline-block;
	width: 60%;
	margin-right: 10%;
	@media (min-width: ${styles.screens.footer}px) {
		grid-column: 1 / 9;
		width: auto;
		margin-right: 0;
	}
`

const watchCSS = css`
	display: inline-block;
	width: 30%;
	@media (min-width: ${styles.screens.footer}px) {
		grid-column: 9 / 13;
		width: auto;
	}
`

const FooterRatings = () => {
	return (
		<div css={ratingsCSS}>
			<p>Charity Ratings</p>
			<div css={navigatorCSS}>
				<IconCharityNavigator />
			</div>
			<div css={watchCSS}>
				<IconCharityWatch />
			</div>
		</div>
	)
}

export default FooterRatings
