import React from 'react'
import { css } from '@emotion/core'

import FeaturedResources from './FeaturedResources'

import createAnchor from '../../utils/createAnchor'

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
		align-items: stretch;
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

const FeaturedResourcesContainer = ({ heading, resources, addCSS, id }) => {
	console.log(resources)
	return (
		<section
			id={id}
			css={css`
				${containerCSS};
				${addCSS}
			`}
		>
			{heading && <p id={createAnchor(heading)}>{heading}</p>}
			<div>
				{resources.map((resource, index) => (
					<FeaturedResources key={index} data={resource} />
				))}
			</div>
		</section>
	)
}

export default FeaturedResourcesContainer
