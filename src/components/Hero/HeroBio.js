import React from 'react'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { styles } from '../../css/css'

const solidBioCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px50};
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: center;
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px180} ${styles.scale.px50} ${styles.scale.px80};
	}
	h1,
	div {
		color: ${styles.colors.white};
		min-width: 300px;
		max-width: 400px;
		font-family: ${styles.fonts.avenirRegular};
		flex: 1;
	}
	h1 {
		font-family: ${styles.fonts.paul};
		margin: ${styles.scale.px35} 0;
		font-size: ${styles.scale.px36};
		max-width: 700px;
		@media (min-width: ${styles.screens.mobile}px) {
			margin: ${styles.scale.px40} 0;
			font-size: ${styles.scale.px44};
		}
	}
	img {
		margin-top: ${styles.scale.px50};
		@media (min-width: ${styles.screens.tablet}px) {
			/* max-height: 360px; */
			border-radius: 50%;
			margin-top: 0;
		}
	}
`

const HeroBio = ({ name, title, image }) => {
	return (
		<div css={solidBioCSS}>
			<div>
				<h1>{name}</h1>
				<div>{title}</div>
			</div>
			<div>
				<GatsbyImage
					image={image.gatsbyImageData}
					alt={`${name}, ${title}`}
				/>
			</div>
		</div>
	)
}

export default HeroBio
