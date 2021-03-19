import React from 'react'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

const barCSS = css`
	background-color: ${styles.colors.poppy};
	padding: ${styles.scale.px5} ${styles.scale.px24};
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	@media (min-width: ${styles.screens.mobile}) {
		padding: ${styles.scale.px14} ${styles.scale.px50};
	}
	p {
		font-family: ${styles.fonts.avenirRegular};
		font-size: ${styles.scale.px24};
		line-height: ${styles.scale.px36};
		text-align: center;
		margin: 0;
		color: ${styles.colors.white};
		overflow: scroll none;
	}
	a {
		color: ${styles.colors.white};
	}
`

const BreakingNews = ({ news }) => {
	return <div css={barCSS} dangerouslySetInnerHTML={{ __html: news }}></div>
}

export default BreakingNews
