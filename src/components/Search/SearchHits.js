import React, { useState } from 'react'
import { css } from '@emotion/core'
import { connectInfiniteHits, Configure } from 'react-instantsearch-dom'

import { styles } from '../../css/css'

const customHitsCSS = css`
	list-style: none;
	margin-left: 0;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	margin-bottom: ${styles.scale.px24};
	li {
		width: 100%;
		@media (min-width: ${styles.screens.tablet}px) {
			width: calc(50% - ${styles.scale.px24});
		}
	}
`

const hitCSS = css`
	display: flex;
	flex-flow: row no-wrap;
	align-items: stretch;
	border: ${styles.colors.darkGray} solid ${styles.scale.px2};
	border-radius: ${styles.scale.px5};
	img {
		min-width: ${styles.scale.px126};
		max-width: ${styles.scale.px126};
		display: inline-block;
		margin: 0;
		object-fit: cover;
	}
	p {
		padding: ${styles.scale.px24};
		color: ${styles.colors.poppy};
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
							<img src={hit.image} alt="result primary" />
							<p>{hit.title}</p>
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
