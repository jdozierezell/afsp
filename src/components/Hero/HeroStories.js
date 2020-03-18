import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Img from 'gatsby-image'

import IconArrow from '../SVGs/IconArrow'
import readTime from '../../utils/readTime'

import { styles } from '../../css/css'

const storyHeroCSS = css`
	margin: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px30};
	@media (min-width: ${styles.screens.tablet}px) {
		display: grid;
		grid-template-columns: 200px 1fr 200px;
		margin: 0;
		align-items: center;
		text-align: center;
		background-size: cover;
		background-position: center;
		background-color: ${styles.colors.darkGray};
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
		color: ${styles.colors.white};
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
		display: inline;
		margin-left: ${styles.scale.px5};
	}
	li {
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
	@media (min-width: ${styles.screens.tablet}px) {
		display: none;
	}
`

const storyButtonCSS = css`
	display: inline-block;
	background: transparent;
	border: 0;
	margin-bottom: ${styles.scale.px30};
	text-align: center;
	text-decoration: none;
	svg {
		width: ${styles.scale.px40};
	}
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
		// todo: convert background image to gatsby image
		<section
			css={css`
				${storyHeroCSS};
				@media (min-width: ${styles.screens.tablet}px) {
					background-image: url(${`${desktopCover.fluid.src}?auto=format&w=1920&h=1080&fit=crop&crop=faces&q=30`});
				}
			`}
		>
			<div css={storyMetaCSS}>
				<h1>{title}</h1>
				<p css={dateLineCSS}>
					{publicationDate} — {timeToRead.humanizedDuration} min read
				</p>
				{author && (
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
											index + 1 < author.length
												? ', '
												: ''
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
				)}
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
				<Img css={mobileImageCSS} fluid={mobileCover.fluid} alt="" />
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
						<p>{prev.title}</p>
					</AniLink>
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
						<p>{next.title}</p>
					</AniLink>
				</div>
			)}
		</section>
	)
}

export default HeroStories
