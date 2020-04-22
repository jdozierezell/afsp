import React, { useEffect } from 'react'
import Glide, {
	Anchors,
	Controls,
	Breakpoints,
} from '@glidejs/glide/dist/glide.modular.esm'
import { css } from '@emotion/core'
import Img from 'gatsby-image'

import IconArrowCircle from '../SVGs/IconArrowCircle'

import { styles } from '../../css/css'

import '@glidejs/glide/dist/css/glide.core.min.css'

const singleCSS = css`
	margin-bottom: ${styles.scale.px24};
`

const carouselButtonsCSS = css`
	position: absolute;
	width: ${styles.scale.px64};
	height: ${styles.scale.px64};
	top: 40%;
	margin-top: -${styles.scale.px126 / 2};
	cursor: pointer;
	@media (min-width: ${styles.screens.tablet}px) {
		width: ${styles.scale.px80};
		height: ${styles.scale.px80};
	}
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

const ContentImage = ({ image }) => {
	useEffect(() => {
		if (image.length > 1) {
			new Glide(`.glide-image`, {
				perView: 2,
				perTouch: 1,
			}).mount({
				Anchors,
				Controls,
				Breakpoints,
			})
		}
	}, [])
	console.log(image)
	return (
		<div className="storyContent">
			{image.length === 1 && (
				<Img
					css={singleCSS}
					fluid={image[0].fluid}
					alt={image[0].alt}
				/>
			)}
			{image.length > 1 && (
				<div
					className="glide-image"
					css={css`
						overflow: hidden;
						margin: ${styles.scale.px36} 0;
						position: relative;
					`}
				>
					<div data-glide-el="track">
						<div className="glide__slides">
							{image.map((image, index) => (
								<Img
									key={index}
									fluid={image.fluid}
									alt={image.alt}
								/>
							))}
						</div>
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

export default ContentImage
