import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Carousel from 'react-multi-carousel'
import { css } from '@emotion/core'
import fetch from 'isomorphic-fetch'
import zipcodes from 'zipcodes'

import { chapterSearchResults } from '../../utils/chapterSearchResults'

import { styles } from '../../css/css'

import 'react-multi-carousel/lib/styles.css'

import CarouselChapter from './CarouselChapter'
// import Loadable from '@loadable/component'

// const CarouselChapter = Loadable(() => import('./CarouselChapter'))

const defaultCarouselCSS = css`
	padding: ${styles.scale.px25} ${styles.scale.px24};
	overflow: hidden;
	position: relative;
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50} ${styles.scale.px35};
		background-color: ${styles.colors.lightGray};
	}
	h2 {
		font-size: ${styles.scale.px36};
		line-height: ${styles.scale.px42};
		margin-bottom: ${styles.scale.px45};
	}
	> p {
		margin-bottom: ${styles.scale.px30};
		@media (min-width: ${styles.screens.mobile}px) {
			margin: 0 0 ${styles.scale.px30};
		}
	}
	.secondary-button {
		margin-bottom: ${styles.scale.px56};
	}
	@media (max-width: ${styles.screens.tablet}px) {
		.react-multiple-carousel__arrow--left {
			left: ${styles.gridGap.mobile};
		}
		.react-multiple-carousel__arrow--right {
			right: ${styles.gridGap.mobile};
		}
	}
`

const carouselHeaderWrapperCSS = css`
	@media (min-width: ${styles.screens.tablet}px) {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}
`

const CarouselChapterContainer = ({ carouselCSS }) => {
	const data = useStaticQuery(graphql`
		query {
			chapters: allDatoCmsChapterHomePage {
				...ChapterSearch
			}
		}
	`)
	const { chapters } = data
	const [displayChapters, setDisplayChapters] = useState([])

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		largeDesktop: {
			breakpoint: { max: 4000, min: 1200 },
			items: 4,
		},
		desktop: {
			breakpoint: { max: 1200, min: 1024 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	}

	useEffect(() => {
		// ipapi.co and ipregistry.co are also nice options if pro.ip-api.com fails
		if (displayChapters.length === 0) {
			const endpoint =
				'https://pro.ip-api.com/json/?fields=zip&key=kk9BWBSYqm9ZTDj'
			fetch(endpoint)
				.then(res => res.json())
				.then(
					result => {
						setDisplayChapters(
							chapterSearchResults(chapters, {
								primaryZip: result.zip,
								otherZips: zipcodes.radius(result.zip, 100),
							})
						)
					},
					error => {
						console.log(error)
					}
				)
		}
	}, [chapters, displayChapters])

	return (
		<div
			css={css`
				${defaultCarouselCSS};
				${carouselCSS};
			`}
		>
			<div css={carouselHeaderWrapperCSS}>
				<h2>Connection makes a difference</h2>
				<a href="/find-a-local-chapter" className="secondary-button">
					Find a chapter
				</a>
			</div>
			{displayChapters.length >= 1 && (
				<p>
					Local chapters near {displayChapters[0][1]}
					<strong>{displayChapters.primaryZip}</strong>
				</p>
			)}
			{displayChapters.length >= 1 && (
				<Carousel responsive={responsive}>
					{displayChapters.map((chapter, index) => {
						return (
							<CarouselChapter
								key={index}
								title={chapter[0].title}
								titleHref={chapter[0].slug}
								image={chapter[0].heroPoster.fluid}
								alt={chapter[0].heroPoster.alt}
							/>
						)
					})}
				</Carousel>
			)}
		</div>
	)
}

export default CarouselChapterContainer
