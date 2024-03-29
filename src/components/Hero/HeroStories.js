import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import readTime from '../../utils/readTime'

import { styles } from '../../css/css'

import IconArrow from '../SVGs/IconArrow'

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
	aside.tags,
	li,
	a {
		font-size: ${styles.scale.px18};
		font-family: ${styles.fonts.avenirDemi};
		@media (min-width: ${styles.screens.tablet}px) {
			font-size: ${styles.scale.px18};
			color: ${styles.colors.white};
		}
	}
	aside.tags {
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
	line-height: 1.5;
	@media (min-width: ${styles.screens.tablet}px) {
		color: ${styles.colors.white};
		font-size: ${styles.scale.px18};
	}
`

const byLineCSS = css`
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
		grid-area: 1 / 1 / 2 / 2;
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
		grid-area: 1 / 3 / 2 / 4;
		display: block;
		margin: 0 ${styles.scale.px24};
		p {
			color: ${styles.colors.white};
		}
	}
`

const mobileImageCSS = css`
	@media (min-width: ${styles.screens.tablet}px) {
		display: none !important;
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
	const { title, publicationDate, hidePublicationDate, author, tags } = data

	let fullStory = ''
	data.article.forEach(article => {
		if (article.__typename === 'DatoCmsBody') {
			fullStory += article.copy
		}
	})
	const backgroundImage = `${data.coverImage.url}?auto=format&crop=faces&fill=blur&fit=fill&h=540&w=1920&blend-mode=hardlight&blend=262626&blend-alpha=50`
	const timeToRead = readTime(fullStory)
	return (
		<header
			css={css`
				${storyHeroCSS};
				@media (min-width: ${styles.screens.tablet}px) {
					background-image: url(${backgroundImage});
				}
			`}
		>
			<div css={storyMetaCSS}>
				<h1
					dangerouslySetInnerHTML={{
						__html: title,
					}}
				></h1>
				<p css={dateLineCSS}>
					{publicationDate && !hidePublicationDate
						? `${publicationDate} — `
						: ''}
					{timeToRead.humanizedDuration} min read
				</p>
				{author && (
					<p css={byLineCSS}>
						By{' '}
						{author.map((a, index) => {
							if (a.authorName !== 'AFSP') {
								return (
									<span key={index}>
										<Link
											key={index}
											to={`/author/${a.slug}`}
										>
											{a.authorName}
										</Link>
										{index + 1 < author.length ? ', ' : ''}
									</span>
								)
							} else {
								return `${a.authorName}${
									index + 1 < author.length ? ', ' : ''
								}`
							}
						})}
					</p>
				)}
				<aside className="tags">
					Tagged{' '}
					<ul>
						{tags &&
							tags.map((tag, index) => {
								return (
									<li key={index}>
										<Link to={`/tag/${tag.slug}`}>
											{tag.tag}
										</Link>
										{index + 1 < tags.length ? ',' : null}
									</li>
								)
							})}
					</ul>
				</aside>
				<GatsbyImage
					css={mobileImageCSS}
					image={data.coverImage.gatsbyImageData}
					alt={data.coverImage.alt}
				/>
			</div>
			{prev && (
				<div css={previousStoryCSS}>
					<Link to={`/story/${prev.slug}`} css={storyButtonCSS}>
						<IconArrow
							color={styles.colors.white}
							direction="left"
						/>
						<p
							dangerouslySetInnerHTML={{
								__html: prev.title,
							}}
						></p>
					</Link>
				</div>
			)}
			{next && (
				<div css={followingStoryCSS}>
					<Link to={`/story/${next.slug}`} css={storyButtonCSS}>
						<IconArrow
							color={styles.colors.white}
							direction="right"
						/>
						<p
							dangerouslySetInnerHTML={{
								__html: next.title,
							}}
						></p>
					</Link>
				</div>
			)}
		</header>
	)
}

export default HeroStories
