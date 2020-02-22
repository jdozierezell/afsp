import React from 'react'
import { css } from '@emotion/core'

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'

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
	div {
		color: ${styles.colors.white};
		max-width: 700px;
		font-family: ${styles.fonts.avenirRegular};
	}
	h1 {
		font-family: ${styles.fonts.paul};
		margin: ${styles.scale.px35} 0;
		font-size: ${styles.scale.px36};
		max-width: 700px;
		@media (min-width: ${styles.screens.mobile}) {
			margin: ${styles.scale.px40} 0;
		}
	}
`

const HeroSearch = ({ data: { title, handleHeroClick, visibility } }) => {
	return (
		<div css={solidHeroCSS}>
			<h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
			<div>
				Can't find what you're looking for?{' '}
				<button onClick={handleHeroClick}>
					Search again. {visibility}
				</button>
			</div>
		</div>
	)
}

export default HeroSearch
