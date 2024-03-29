import React from 'react'
import { css } from '@emotion/react'

import FeaturedResources from './FeaturedResources'

import { styles } from '../../css/css'

const containerCSS = css`
	padding: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px50};
	}
	> div {
		display: grid;
		grid-template-columns: 1fr;
		grid-row-gap: ${styles.scale.px50};
		grid-column-gap: ${styles.scale.px40};
		@media (min-width: ${styles.screens.tablet}px) {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
		}
		img {
			width: 100%;
		}
	}
	> h2 {
		margin-bottom: ${styles.scale.px30};
		font-size: ${styles.scale.px17};
		font-family: ${styles.fonts.avenirRegular};
		@media (min-width: ${styles.screens.tablet}px) {
			margin-bottom: ${styles.scale.px60};
			font-size: ${styles.scale.px44};
			font-family: ${styles.fonts.paul};
		}
	}
`

const FeaturedProgramsContainer = ({ resources, addCSS }) => {
	return (
		<section
			css={css`
				${containerCSS};
				${addCSS};
			`}
		>
			<h2>Featured programs</h2>
			<div>
				{resources.map((resource, index) => (
					<FeaturedResources key={index} data={resource} />
				))}
			</div>
		</section>
	)
}

export default FeaturedProgramsContainer
