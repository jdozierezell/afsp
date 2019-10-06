import React from 'react'
import { css } from '@emotion/core'

import FeaturedResources from './FeaturedResources'

import { styles } from '../../css/css'

const containerCSS = css`
	margin: 0 ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0 ${styles.scale.px50};
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
`

const FeaturedResourcesContainer = () => {
	return (
		<div>
			<FeaturedResources />
			<FeaturedResources />
			<FeaturedResources />
		</div>
	)
}

export default FeaturedResourcesContainer
