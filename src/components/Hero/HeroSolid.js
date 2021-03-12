import React from 'react'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { styles } from '../../css/css'

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
// import Loadable from '@loadable/component'

// const Breadcrumbs = Loadable(() => import('../Breadcrumbs/Breadcrumbs'))

const solidHeroCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px50};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px180} ${styles.scale.px50} ${styles.scale.px80};
	}
	li,
	h1,
	div {
		color: ${styles.colors.white};
		max-width: 623px;
		font-family: ${styles.fonts.avenirRegular};
	}
	p {
		color: ${styles.colors.white};
	}
	h1 {
		font-family: ${styles.fonts.paul};
		margin: ${styles.scale.px35} 0;
		font-size: ${styles.scale.px36};
		max-width: 700px;
		@media (min-width: ${styles.screens.mobile}px) {
			font-size: ${styles.scale.px44};
			margin: ${styles.scale.px40} 0;
		}
	}
	.gatsby-image-wrapper {
		margin: ${styles.scale.px35} 0;
		max-width: 623px;
		@media (min-width: ${styles.screens.mobile}px) {
			margin: ${styles.scale.px40} 0;
		}
	}
	a {
		color: ${styles.colors.yellow};
		:hover {
			color: ${styles.colors.white};
		}
	}
`

const logoCSS = css`
	margin: ${styles.scale.px40} 0;
`

const HeroSolid = ({ data, programLogo, addCSS }) => {
	const { title, brief, parentPage } = data
	return (
		<div
			css={css`
				${solidHeroCSS};
				${addCSS};
			`}
		>
			{parentPage && parentPage.parentPage && (
				<Breadcrumbs parentPage={parentPage} child={title} />
			)}
			{programLogo && (
				<GatsbyImage
					css={logoCSS}
					image={programLogo.gatsbyImageData}
				/>
			)}
			{!programLogo && (
				<h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
			)}
			<div
				dangerouslySetInnerHTML={{
					__html: brief,
				}}
			></div>
		</div>
	)
}

export default HeroSolid
