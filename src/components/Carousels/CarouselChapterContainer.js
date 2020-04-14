import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Glide, {
	Anchors,
	Controls,
	Breakpoints,
} from '@glidejs/glide/dist/glide.modular.esm'
import { css } from '@emotion/core'

import CarouselChapter from './CarouselChapter'
import IconArrowCircle from '../SVGs/IconArrowCircle'

import { fetchChapters } from '../../utils/chapterSearchResults'

import { styles } from '../../css/css'

import '@glidejs/glide/dist/css/glide.core.min.css'

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
	p {
		margin-bottom: ${styles.scale.px30};
		@media (min-width: ${styles.screens.mobile}px) {
			margin: 0 0 ${styles.scale.px30};
		}
	}
	.glide__slides {
		margin: 0;
		white-space: initial;
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
	position: absolute;
	width: ${styles.scale.px126};
	height: ${styles.scale.px126};
	top: 55%;
	margin-top: -${styles.scale.px126 / 2};
	cursor: pointer;
	:first-of-type {
		left: ${styles.scale.px24};
	}
	:last-of-type {
		right: ${styles.scale.px24};
	}
	.glide__bullet--active {
		background: hsla(0, 0%, 14.9%, 1);
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

	useEffect(() => {
		// ipapi.co and ipregistry.co are also nice options if pro.ip-api.com fails
		if (displayChapters.length === 0) {
			fetchChapters(chapters, setDisplayChapters)
		} else if (displayChapters.length >= 1) {
			new Glide('.glide-chapter', {
				perView: 2,
				perTouch: 1,
				breakpoints: {
					1920: {
						perView: 4,
						peek: { before: 0, after: styles.scale.px35 },
					},
					1400: {
						perView: 3,
						peek: { before: 0, after: styles.scale.px35 },
					},
					1080: {
						perView: 2,
						peek: { before: 0, after: styles.scale.px35 },
					},
					768: {
						perView: 1,
						peek: { before: 0, after: styles.scale.px35 },
					},
				},
			}).mount({
				Anchors,
				Controls,
				Breakpoints,
			})
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
				<div className="glide-chapter">
					<div data-glide-el="track">
						<ul className="glide__slides">
							{displayChapters.map((chapter, index) => {
								return (
									<CarouselChapter
										key={index}
										title={chapter[0].title}
										titleHref={chapter[0].slug}
										image={chapter[0].heroPoster.fluid}
									/>
								)
							})}
						</ul>
					</div>
					<div data-glide-el="controls">
						<div css={carouselButtonsCSS} data-glide-dir="<">
							<IconArrowCircle
								color="hsla(0, 0%, 14.9%, 0.2)"
								direction="left"
							/>
						</div>
						<div css={carouselButtonsCSS} data-glide-dir=">">
							<IconArrowCircle
								color="hsla(0, 0%, 14.9%, 0.2)"
								direction="right"
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default CarouselChapterContainer
