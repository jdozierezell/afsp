import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Glide from '@glidejs/glide'
import { css } from '@emotion/core'

import CarouselChapter from './CarouselChapter'

import { fetchChapters } from '../../utils/chapterSearchResults'

import { styles } from '../../css/css'

import '@glidejs/glide/dist/css/glide.core.min.css'

const defaultCarouselCSS = css`
	padding: ${styles.scale.px25} ${styles.scale.px24};
	overflow: hidden;
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50} ${styles.scale.px35};
		background-color: ${styles.colors.lightGray};
	}
	h2 {
		font-size: ${styles.scale.px36};
		line-height: ${styles.scale.px42};
		margin-bottom: ${styles.scale.px45};
	}
	p {
		margin-bottom: ${styles.scale.px30};
		@media (min-width: ${styles.screens.mobile}px) {
			margin: 0 0 ${styles.scale.px30};
		}
	}
	.glide__slides {
		margin: 0;
	}
	.secondary-button {
		margin-bottom: ${styles.scale.px56};
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

const carouselButtonsCSS = css`
	text-align: center;
	margin: ${styles.scale.px45} 0 0;
	padding: 0;
	line-height: 0;
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px35} 0 0;
	}
	button {
		background: hsla(0, 0%, 14.9%, 0.5);
		border: none;
		margin: 0 5px;
		padding: 0;
		font-size: ${styles.scale.px28};
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	.glide__bullet--active {
		background: hsla(0, 0%, 14.9%, 1);
	}
`

const CarouselChapterContainer = ({ location, carouselCSS }) => {
	const data = useStaticQuery(graphql`
		query {
			chapters: allDatoCmsChapterHomePage {
				...ChapterSearch
			}
		}
	`)
	const { chapters } = data

	const [displayChapters, setDisplayChapters] = useState([])

	useEffect(() => {
		// ipapi.co and ipregistry.co are also nice options if pro.ip-api.com fails
		if (displayChapters.length === 0) {
			fetchChapters(chapters, setDisplayChapters)
		} else if (displayChapters.length >= 1) {
			new Glide('.glide-chapter', {
				perView: 3,
				peek: { before: 0, after: styles.scale.px24 },
				breakpoints: {
					1080: {
						perView: 2,
						peek: {
							before: 0,
							after: styles.scale.px35,
						},
					},
					768: {
						perView: 1,
						peek: {
							before: 0,
							after: styles.scale.px35,
						},
					},
				},
			}).mount()
		}
	}, [chapters, displayChapters])

	return (
		<div
			css={css`
				${defaultCarouselCSS}
				${carouselCSS}
			`}
		>
			<div css={carouselHeaderWrapperCSS}>
				<h2>Connection makes a difference</h2>
				<a href="https://example.com" className="secondary-button">
					Find a chapter
				</a>
			</div>
			<p>
				Local chapters near <strong>{location}</strong>
			</p>
			{displayChapters.length >= 1 && (
				<div className="glide-chapter">
					<div data-glide-el="track">
						<ul className="glide__slides">
							{displayChapters.map((chapter, index) => {
								return (
									<CarouselChapter
										key={index}
										title={chapter.title}
										titleHref={chapter.slug}
										src={chapter.heroPoster.url}
									/>
								)
							})}
						</ul>
					</div>
					<div data-glide-el="controls[nav]" css={carouselButtonsCSS}>
						{displayChapters.map((__, index) => {
							return (
								<button
									key={index}
									data-glide-dir={`=${index}`}
								></button>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}

export default CarouselChapterContainer
