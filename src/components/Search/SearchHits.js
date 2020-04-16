import React, { useState } from 'react'
import { css } from '@emotion/core'
import { connectInfiniteHits, Configure } from 'react-instantsearch-dom'

import { styles } from '../../css/css'

const customHitsCSS = css`
	list-style: none;
	margin-left: 0;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: ${styles.gridGap.desktop};
	align-items: stretch;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: repeat(2, 1fr);
	}
	li {
		width: 100%;
	}
`

const hitCSS = css`
	display: grid;
	grid-template-columns: 0.66fr 1.34fr;
	grid-template-rows: 1fr;
	grid-gap: ${styles.gridGap.mobile};
	border: ${styles.colors.darkGray} solid ${styles.scale.px2};
	border-radius: ${styles.scale.px5};
	min-height: ${styles.scale.px46};
	img {
		display: inline-block;
		margin: 0;
		object-fit: cover;
	}
	p {
		padding: ${styles.scale.px24};
		color: ${styles.colors.poppy};
	}
	@media (min-width: ${styles.screens.tablet}px) and (max-width: ${styles
			.screens.video}px) {
		grid-template-columns: 1fr;
		grid-template-rows: 1.5fr 0.5fr;
	}
`

const buttonCSS = css`
	margin: 0;
`

const CustomHits = data => {
	const [display, setDisplay] = useState(20)
	return (
		<>
			<Configure hitsPerPage={display} />
			<ul css={customHitsCSS}>
				{data.hits.map(hit => (
					<li key={hit.objectID} data-type={hit.type}>
						<a href={hit.url} css={hitCSS}>
							<img src={hit.image} alt="result thumbnail" />
							<p
								dangerouslySetInnerHTML={{ __html: hit.title }}
							></p>
						</a>
					</li>
				))}
			</ul>
			{data.hasMore && (
				<button
					className="secondary-button"
					css={buttonCSS}
					onClick={() => {
						setDisplay(display + 10)
					}}
				>
					Load more
				</button>
			)}
		</>
	)
}

const SearchHits = connectInfiniteHits(CustomHits)

export default SearchHits
