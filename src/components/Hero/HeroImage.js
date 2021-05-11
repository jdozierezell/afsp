import React from 'react'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { styles } from '../../css/css'

const storyHeroCSS = css`
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(3, auto);
	min-height: 300px;
	@media (min-width: ${styles.screens.tablet}px) {
		overflow: hidden;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 200px repeat(3, auto);
		margin: 0;
		background-blend-mode: soft-light;
		background-size: cover;
		background-position: center;
	}
`

const headerCSS = css`
	grid-area: 2 / 1 / 3 / 2;
	font-size: ${styles.scale.px46};
	color: ${styles.colors.white};
	margin: ${styles.scale.px50} ${styles.scale.px60} ${styles.scale.px24}
		${styles.scale.px24};
	color: ${styles.colors.darkGray};
	overflow: auto;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0 ${styles.scale.px60};
		color: ${styles.colors.white};
	}
`

const mobileImageCSS = css`
	grid-area: 1 / 1 / 2 / 2;
	@media (min-width: ${styles.screens.tablet}px) {
		display: none !important;
	}
`

const HeroImage = ({ title, heroImage }) => {
	const desktopHeroImg = `${heroImage.url}?auto=format&w=1920&h=1080&fit=crop&crop=faces&q=30`
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
						url(${desktopHeroImg});
				}
			`}
		>
			<h2 css={headerCSS}>{title}</h2>
			<GatsbyImage
				css={mobileImageCSS}
				image={heroImage.gatsbyImageData}
				alt={heroImage.alt}
			/>
		</section>
	)
}

export default HeroImage
