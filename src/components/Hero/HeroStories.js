import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import IconArrow from '../SVGs/IconArrow'
import readTime from '../../utils/readTime'

import { useWindowDimensions } from '../../components/WindowDimensionsProvider'

import { styles } from '../../css/css'

const storyHeroCSS = css`
	margin: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px30};
	@media (min-width: ${styles.screens.tablet}px) {
		display: grid;
		grid-template-columns: 200px 1fr 200px;
		margin: 0;
		align-items: center;
		text-align: center;
		background-blend-mode: soft-light;
		background-size: cover;
		background-position: center;
	}
`

const storyMetaCSS = css`
	@media (min-width: ${styles.screens.tablet}px) {
		grid-area: 1 / 2 / 2 / 3;
		z-index: 100;
		margin: ${styles.scale.px180} 0 ${styles.scale.px80};
	}
	h1 {
		font-size: ${styles.scale.px36};
		margin-bottom: ${styles.scale.px35};
		@media (min-width: ${styles.screens.tablet}px) {
			color: ${styles.colors.white};
			font-size: ${styles.scale.px44};
		}
	}
	h3,
	li,
	a {
		font-size: ${styles.scale.px18};
		font-family: ${styles.fonts.avenirDemi};
		@media (min-width: ${styles.screens.tablet}px) {
			font-size: ${styles.scale.px18};
		}
	}
	h3 {
		margin-bottom: ${styles.scale.px50};
		@media (min-width: ${styles.screens.tablet}px) {
			color: ${styles.colors.white};
			margin-bottom: 0;
		}
	}
	ul {
		list-style: none;
		margin: 0;
		display: inline-block;
		margin-left: ${styles.scale.px5};
	}
	li {
		color: ${styles.colors.poppy};
		display: inline-block;
		margin-right: ${styles.scale.px5};
	}
`

const dateLineCSS = css`
	margin: 0 0;
	@media (min-width: ${styles.screens.tablet}px) {
		color: ${styles.colors.white};
		font-size: ${styles.scale.px18};
	}
`

const byLineCSS = css`
	text-transform: uppercase;
	margin: 0 0;
	margin-bottom: ${styles.scale.px35};
	@media (min-width: ${styles.screens.tablet}px) {
		color: ${styles.colors.white};
		font-size: ${styles.scale.px18};
	}
`

const previousStoryCSS = css`
	display: none;
	@media (min-width: ${styles.screens.tablet}px) {
		display: block;
		margin: 0 ${styles.scale.px24};
		p {
			color: ${styles.colors.white};
		}
	}
`

const followingStoryCSS = css`
	display: none;
	@media (min-width: ${styles.screens.tablet}px) {
		display: block;
		margin: 0 ${styles.scale.px24};
		p {
			color: ${styles.colors.white};
		}
	}
`

const mobileImageCSS = css`
	 {
		@media (min-width: ${styles.screens.tablet}px) {
			display: none;
		}
	}
`

const storyButtonCSS = css`
	display: inline-block;
	background: transparent;
	border: 0;
	width: ${styles.scale.px40};
	margin-bottom: ${styles.scale.px30};
	text-align: center;
`

const HeroStories = ({ data, prev, next }) => {
	const {
		title,
		publicationDate,
		author,
		tags,
		mobileCover,
		desktopCover,
	} = data

	let fullStory = ''
	data.article.forEach(story => {
		if (story.__typename === 'DatoCmsBody') {
			fullStory += story.copy
		}
		if (story.__typename === 'DatoCmsImage') {
			story.images.forEach(image => {
				fullStory += `<img src=${image.url} />`
			})
		}
	})

	const timeToRead = readTime(fullStory)

	return (
		<section
			css={css`
				${storyHeroCSS};
				@media (min-width: ${styles.screens.tablet}px) {
					background-image: linear-gradient(
							to right,
							${styles.colors.darkGray},
							${styles.colors.darkGray}
						),
						url(${desktopCover.fluid.src});
				}
			`}
		>
			<div css={storyMetaCSS}>
				<h1>{title}</h1>
				<p css={dateLineCSS}>
					{publicationDate} — {timeToRead.humanizedDuration} min read
				</p>
				<p css={byLineCSS}>
					BY{' '}
					{author.map((author, index) => {
						if (author.authorName !== 'AFSP') {
							return (
								<AniLink
									key={index}
									fade
									duration={styles.duration}
									to={`/author/${author.slug}`}
								>
									{`${author.authorName}${
										index + 1 < author.length ? ', ' : ''
									}`}
								</AniLink>
							)
						} else {
							return `${author.authorName}${
								index + 1 < author.length ? ', ' : ''
							}`
						}
					})}
				</p>
				<h3>
					Tagged{' '}
					<ul>
						{tags &&
							tags.map((tag, index) => {
								return (
									<li key={index}>
										<AniLink
											fade
											duration={styles.duration}
											to={`/tag/${tag.slug}`}
										>
											{tag.tag}
										</AniLink>
										{index + 1 < tags.length ? ',' : null}
									</li>
								)
							})}
					</ul>
				</h3>
				<img css={mobileImageCSS} src={mobileCover.fluid.src} alt="" />
			</div>
			{prev && (
				<div css={previousStoryCSS}>
					<AniLink
						fade
						duration={styles.duration}
						to={`/story/${prev.slug}`}
						css={storyButtonCSS}
					>
						<IconArrow
							color={styles.colors.white}
							direction="left"
						/>
					</AniLink>
					<p>{prev.title}</p>
				</div>
			)}
			{next && (
				<div css={followingStoryCSS}>
					<AniLink
						fade
						duration={styles.duration}
						to={`/story/${next.slug}`}
						css={storyButtonCSS}
					>
						<IconArrow
							color={styles.colors.white}
							direction="right"
						/>
					</AniLink>
					<p>{next.title}</p>
				</div>
			)}
		</section>
	)
}

export default HeroStories
