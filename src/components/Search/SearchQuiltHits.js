import React, { useState } from 'react'
import { css } from '@emotion/core'
import { connectInfiniteHits, Configure } from 'react-instantsearch-dom'

import QuiltSquare from '../Quilt/QuiltSquare'

import { styles } from '../../css/css'

const quiltsCSS = css`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media (min-width: ${styles.screens.navigation}px) {
		grid-template-columns: repeat(6, 1fr);
	}
	/* below classes based on index of quilt square determine grid column location */
	.quilt-col-0 {
		grid-column: 1 / 2;
	}
	.quilt-col-1 {
		grid-column: 2 / 3;
	}
	.quilt-col-2 {
		grid-column: 1 / 2;
		@media (min-width: ${styles.screens.tablet}px) {
			grid-column: 3 / 4;
		}
	}
	.quilt-col-3 {
		grid-column: 2 / 3;
		@media (min-width: ${styles.screens.tablet}px) {
			grid-column: 1 / 2;
		}
		@media (min-width: ${styles.screens.navigation}px) {
			grid-column: 4 / 5;
		}
	}
	.quilt-col-4 {
		grid-column: 1 / 2;
		@media (min-width: ${styles.screens.tablet}px) {
			grid-column: 2 / 3;
		}
		@media (min-width: ${styles.screens.navigation}px) {
			grid-column: 5 / 6;
		}
	}
	.quilt-col-5 {
		grid-column: 2 / 3;
		@media (min-width: ${styles.screens.tablet}px) {
			grid-column: 3 / 4;
		}
		@media (min-width: ${styles.screens.navigation}px) {
			grid-column: 6 / 7;
		}
	}
`

const buttonCSS = css`
	display: block;
	margin: ${styles.scale.px24} auto;
`

const CustomHits = data => {
	console.log(data)
	const [display, setDisplay] = useState(24)
	return (
		<div>
			<div css={quiltsCSS}>
				<Configure hitsPerPage={display} />
				{data.hits.map((hit, index) => (
					<QuiltSquare
						key={hit.objectID}
						quilt={hit}
						selected={data.selected}
						handleClick={data.handleClick}
						index={index}
					/>
				))}
			</div>
			{data.hasMore && (
				<button
					className="secondary-button"
					css={buttonCSS}
					onClick={() => {
						setDisplay(display + 24)
					}}
				>
					Load more
				</button>
			)}
		</div>
	)
}

const SearchQuiltHits = connectInfiniteHits(CustomHits)

export default SearchQuiltHits
