import React from 'react'
import { css } from '@emotion/core'

import FeaturedResources from './FeaturedProgramsResources'

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
		grid-column-gap: ${styles.scale.px20};
		@media (min-width: ${styles.screens.tablet}px) {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
		}
		img {
			width: 100%;
		}
	}
	> p {
		margin-bottom: ${styles.scale.px30};
	}
`

const FeaturedResourcesContainer = () => {
	return (
		<section css={containerCSS}>
			<p>Featured resources</p>
			<div>
				<FeaturedResources />
				<FeaturedResources />
				<FeaturedResources />
			</div>
		</section>
	)
}

export default FeaturedResourcesContainer
