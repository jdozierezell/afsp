import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const carouselButtonsCSS = css`
	text-align: center;
	margin: ${styles.scale.px45} 0 0;
	padding: 0;
	line-height: 0;
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px35} 0 0;
	}
	button {
		background: ${styles.colors.lightGray};
		border: none;
		margin: 0 5px;
		padding: 0;
		font-size: ${styles.scale.px28};
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	.glide__bullet--active {
		background: ${styles.colors.darkGray};
	}
`

const ContentImage = ({ image }) => {
	return (
		<div className="storyContent">
			{image.length === 1 && (
				<img
					src={`${image[0].url}?w=769&h=475&fit=crop&crop=faces`}
					alt={image[0].alt}
				/>
			)}
			{image.length > 1 && (
				<div
					className="glide-image"
					css={css`
						overflow: hidden;
						margin: ${styles.scale.px36} 0;
					`}
				>
					<div data-glide-el="track">
						<div className="glide__slides">
							{image.map((image, index) => (
								<img
									key={index}
									src={`${image.url}?w=769&h=475&fit=crop&crop=faces`}
									alt={image.alt}
									css={css`
										max-height: 500px;
										width: auto !important;
									`}
								/>
							))}
						</div>
					</div>
					<div data-glide-el="controls[nav]" css={carouselButtonsCSS}>
						{image.map((__, index) => {
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

export default ContentImage
