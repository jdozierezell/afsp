import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const recommendationsCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50} ${styles.scale.px80}
			${styles.scale.px24};
	}
	h2 {
		font-family: ${styles.fonts.avenirBold};
		font-size: ${styles.scale.px17};
		color: ${styles.colors.white};
	}
`

const storyCSS = css`
	margin-bottom: ${styles.scale.px60};
	:last-of-type {
		margin-bottom: 0;
	}
	h3 {
		margin: ${styles.scale.px45} 0 ${styles.scale.px35};
		color: ${styles.colors.white};
		font-size: ${styles.scale.px24};
		font-family: ${styles.fonts.avenirBold};
	}
	h4 {
		font-size: ${styles.scale.px17};
		font-family: ${styles.fonts.avenirRegular};
		text-transform: uppercase;
		margin: 0;
		color: ${styles.colors.white};
	}
`

const Recommendations = () => {
	return (
		<div css={recommendationsCSS}>
			<h2>Real stories of hope</h2>
			<div css={storyCSS}>
				<h3>Street art tousled occupy sriracha kale</h3>
				<h4>By Example</h4>
			</div>
			<div css={storyCSS}>
				<h3>Street art tousled occupy sriracha kale</h3>
				<h4>By Example</h4>
			</div>
			<div css={storyCSS}>
				<h3>Street art tousled occupy sriracha kale</h3>
				<h4>By Example</h4>
			</div>
		</div>
	)
}

export default Recommendations