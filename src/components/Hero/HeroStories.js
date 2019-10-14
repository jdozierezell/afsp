import React from 'react'
import { css } from '@emotion/core'

import IconArrow from '../SVGs/IconArrow'

import { styles } from '../../css/css'

const storyHeroCSS = css`
	margin: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px30};
	@media (min-width: ${styles.screens.tablet}px) {
		display: grid;
		grid-template-columns: 200px 1fr 200px;
		margin: 0;
		align-items: center;
		text-align: center;
		background-image: linear-gradient(
				to right,
				${styles.colors.darkGray},
				${styles.colors.darkGray}
			),
			url('https://placekitten.com/1080/1920');
		background-blend-mode: soft-light;
		background-size: cover;
		background-position: center;
	}
`

const storyMetaCSS = css`
	@media (min-width: ${styles.screens.tablet}px) {
		grid-area: 1 / 2 / 2 / 3;
		z-index: 1000;
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
	span,
	a {
		font-size: ${styles.scale.px17};
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
	span {
		color: ${styles.colors.poppy};
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

const headerImageCSS = css`
	object-fit: cover;
	height: 305px;
	width: 100%;
	display: block;
	margin: 0;
	@media (min-width: ${styles.screens.tablet}px) {
		display: none;
	}
`

const previousStoryCSS = css`
	display: none;
	@media (min-width: ${styles.screens.tablet}px) {
		display: block;
		p {
			color: ${styles.colors.white};
		}
	}
`

const followingStoryCSS = css`
	display: none;
	@media (min-width: ${styles.screens.tablet}px) {
		display: block;
		p {
			color: ${styles.colors.white};
		}
	}
`

const storyButtonCSS = css`
	background: transparent;
	border: 0;
	width: ${styles.scale.px40};
	margin-bottom: ${styles.scale.px30};
`

const HeroStories = () => {
	return (
		<section css={storyHeroCSS}>
			<div css={storyMetaCSS}>
				<h1>
					Tattooed paleo cloud bread yuccie, tilde swag actually deep
				</h1>
				<p css={dateLineCSS}>18 Jul 2018 — 15min read</p>
				<p css={byLineCSS}>BY DESIREE WOODLAND</p>
				<h3>
					Tagged{' '}
					<span>
						<a href="#">#StopSuicide</a>,{' '}
						<a href="#">Loss and Healing</a>,{' '}
						<a href="#">Loss Survivors</a>,{' '}
						<a href="#">Personal Stories</a>
					</span>
				</h3>
			</div>
			<img
				src="https://placekitten.com/1080/1920"
				alt=""
				css={headerImageCSS}
			/>
			<div css={previousStoryCSS}>
				<button css={storyButtonCSS}>
					<IconArrow color={styles.colors.white} direction="left" />
				</button>
				<p>Lorem ipsum</p>
			</div>
			<div css={followingStoryCSS}>
				<button css={storyButtonCSS}>
					<IconArrow color={styles.colors.white} direction="right" />
				</button>
				<p>Lorem ipsum</p>
			</div>
		</section>
	)
}

export default HeroStories
