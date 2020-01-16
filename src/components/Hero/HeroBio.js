import React from 'react'
import { css } from '@emotion/core'

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
		max-width: 700px;
		font-family: ${styles.fonts.avenirRegular};
	}
	h1 {
		font-family: ${styles.fonts.paul};
		margin: ${styles.scale.px35} 0;
		font-size: ${styles.scale.px36};
		max-width: 700px;
		@media (min-width: ${styles.screens.mobile}) {
			margin: ${styles.scale.px40} 0;
		}
	}
	img {
		margin-top: ${styles.scale.px50};
		@media (min-width: ${styles.screens.tablet}px) {
			max-height: 360px;
			border-radius: 50%;
			margin-top: 0;
		}
	}
`

const HeroBio = ({ data }) => {
	const { name, title, photo } = data
	return (
		<div css={solidBioCSS}>
			<div>
				<h1>{name}</h1>
				<div>{title}</div>
			</div>
			<div>
				<img
					src={`${photo.url}?w=768&h=768&fit=crop&crop=faces`}
					alt={photo.alt}
				/>
			</div>
		</div>
	)
}

export default HeroBio
