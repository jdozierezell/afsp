import React, { useState } from 'react'
import { css } from '@emotion/core'
import {
	Highlight,
	connectInfiniteHits,
	Configure,
} from 'react-instantsearch-dom'

import { styles } from '../../css/css'

const customHitsCSS = css`
	list-style: none;
	margin-left: 0;
	margin-bottom: ${styles.scale.px24};
`

const hitCSS = css`
	display: flex;
	flex-flow: row no-wrap;
	align-items: center;
	border: ${styles.colors.darkGray} solid ${styles.scale.px2};
	border-radius: ${styles.scale.px5};
	img {
		min-width: ${styles.scale.px126};
		display: inline-block;
		margin: 0;
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
	console.log(data)
	const [display, setDisplay] = useState(5)
	return (
		<>
			<Configure hitsPerPage={display} />
			<ul css={customHitsCSS}>
				{data.hits.map(hit => (
					<li key={hit.objectID}>
						<a href={hit.url} css={hitCSS}>
							<img src="https://placekitten.com/126" alt="" />
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
						setDisplay(display + 5)
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
