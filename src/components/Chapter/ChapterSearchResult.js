import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { useWindowDimensions } from '../WindowDimensionsProvider'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import { styles } from '../../css/css'

import 'mapbox-gl/dist/mapbox-gl.css'

const searchResultCSS = css`
	display: grid;
	grid-column-gap: 0;
	grid-template-columns: 1fr 1fr;
	background-color: ${styles.colors.white};
	margin-bottom: ${styles.scale.px16};
	border-radius: ${styles.scale.px5};
	overflow: hidden;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: 1fr 1fr 1fr;
		margin-bottom: ${styles.scale.px20};
	}
	:last-of-type {
		margin-bottom: 0;
	}
`

const searchImageCSS = css`
	grid-area: 1 / 1 / 2 / 2;
	overflow: hidden;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-area: 1 / 2 / 2 / 3;
	}
`

const searchInfoCSS = css`
	grid-area: 2 / 1 / 3 / 3;
	margin-top: ${styles.scale.px40};
	padding: 0 ${styles.scale.px20};
	@media (min-width: ${styles.screens.tablet}px) {
		grid-area: 1 / 1 / 2 / 2;
	}
	h2 {
		margin: 0;
	}
	h3 {
		margin: ${styles.scale.px35} 0;
	}
	address {
		margin-bottom: ${styles.scale.px40};
		font-family: ${styles.fonts.avenirRegular};
		font-style: normal;
		a {
			color: ${styles.colors.darkGray};
			:hover {
				color: ${styles.colors.poppy};
			}
		}
	}
	.secondary-button {
		margin-bottom: ${styles.scale.px30};
		@media (min-width: ${styles.screens.tablet}px) {
			margin-bottom: ${styles.scale.px40};
		}
	}
`

const ChapterSearchResult = ({ chapter }) => {
	const { width } = useWindowDimensions()
	// set width to half minus margin if tablet or smaller, one third minus margin if larger
	const [mapWidth, setMapWidth] = useState(
		width <= styles.screens.tablet ? width / 2 - 24 : width / 3 - 33
	)

	const height = width <= styles.screens.tablet ? '200px' : '408px'

	// use useEffect to add an event listener that will reset map width whenever window size is changed
	useEffect(() => {
		const handleResize = () =>
			setMapWidth(
				width <= styles.screens.tablet ? width / 2 - 24 : width / 3 - 33
			)
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [width])
	return (
		<div css={searchResultCSS}>
			<div
				css={css`
					${searchImageCSS};
					width: ${mapWidth}px;
					height: ${height};
					background-image: url(${chapter.heroImage.fluid.src});
					background-position: center;
					background-size: cover;
				`}
			></div>
			{/* <ReactMapGL
				css={searchMapCSS}
				{...viewport}
				width={mapWidth}
				height={height}
				onViewportChange={viewport => setViewport(viewport)}
			/> */}
			<div css={searchInfoCSS}>
				<h2>AFSP {chapter.title}</h2>
				<h3>Community contact:</h3>
				<address>
					<strong>{chapter.staffName}</strong>
					<br />
					{chapter.staffTitle}
					<br />
					<a href={`mailto:${chapter.staffEmail}`}>
						{chapter.staffEmail}
					</a>
					<br />
					<a href={`tel:${chapter.staffPhone}`}>
						{chapter.staffPhone}
					</a>
				</address>
				<AniLink
					className="secondary-button"
					fade
					duration={styles.duration}
					to={`/chapter/${chapter.slug}`}
				>
					More info
				</AniLink>
			</div>
		</div>
	)
}

export default ChapterSearchResult
