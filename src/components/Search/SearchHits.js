import React, { useState } from 'react'
import { css } from '@emotion/react'
import { connectInfiniteHits, Configure } from 'react-instantsearch-dom'

import IconStarResearch from '../SVGs/IconStarResearch'

import { styles } from '../../css/css'

const hitCSS = css`
	display: grid;
	grid-template-columns: 0.6fr 1.4fr;
	grid-template-rows: 1fr;
	grid-gap: ${styles.gridGap.mobile};
	align-items: stretch;
	border: ${styles.colors.darkGray} solid ${styles.scale.px2};
	border-radius: ${styles.scale.px5};
	min-height: ${styles.scale.px46};
	img {
		display: inline-block;
		margin: 0;
		object-fit: cover;
	}
	p {
		padding: ${styles.scale.px16};
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

const videoWrapperCSS = css`
	background-size: cover;
	background-position: center;
	border-radius: ${styles.scale.px7} / ${styles.scale.px5};
	padding: 56.25% 0 0 0;
	position: relative;
	iframe {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: 5px;
		border: none;
	}
`

const hitImageWrapperCSS = css`
	position: relative;
	img {
		display: block;
	}
`

const CustomHits = data => {
	const [display, setDisplay] = useState(20)
	return (
		<>
			<Configure hitsPerPage={display} />
			{data.indexName === 'afsporg-grant' && (
				<ul css={data.customHitsCSS}>
					{data.hits.map(hit => (
						<li key={hit.objectID} data-type={hit.type}>
							<a href={hit.url} css={hitCSS}>
								<div css={hitImageWrapperCSS}>
									<img
										src={hit.image}
										alt="result thumbnail"
									/>
									{hit.featured && (
										<IconStarResearch
											color={styles.colors.blue}
										/>
									)}
								</div>
								<p
									dangerouslySetInnerHTML={{
										__html: hit.title,
									}}
								></p>
							</a>
						</li>
					))}
				</ul>
			)}
			{data.indexName === 'afsporg-research-videos' && (
				<ul css={data.customHitsCSS}>
					{data.hits.map((hit, index) => (
						<li key={hit.objectID} data-type={hit.type}>
							<div css={videoWrapperCSS}>
								<iframe
									title={`research-video-${index}`}
									src={`https://player.vimeo.com/video/${hit.vimeoId}`}
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										width: '100%',
										height: '100%',
									}}
								></iframe>
							</div>
							<h3
								dangerouslySetInnerHTML={{
									__html: hit.title,
								}}
								css={css`
									margin-top: ${styles.scale.px18};
								`}
							></h3>
						</li>
					))}
				</ul>
			)}
			{data.indexName !== 'afsporg-research-videos' &&
				data.indexName !== 'afsporg-grant' && (
					<ul css={data.customHitsCSS}>
						{data.hits.map(hit => (
							<li key={hit.objectID} data-type={hit.type}>
								<a href={hit.url} css={hitCSS}>
									<img
										src={hit.image}
										alt="result thumbnail"
									/>
									<p
										dangerouslySetInnerHTML={{
											__html: hit.title,
										}}
									></p>
								</a>
							</li>
						))}
					</ul>
				)}
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
