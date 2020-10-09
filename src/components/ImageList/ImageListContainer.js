import React from 'react'
import { css } from '@emotion/core'
import Img from 'gatsby-image'

import { styles } from '../../css/css'

const imageListCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px12};
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px56} ${styles.scale.px24};
	}
`

const imageWrapperCSS = css`
	width: calc(100% - ${styles.scale.px18} * 2);
	margin: ${styles.scale.px12};
	@media (min-width: ${styles.screens.tablet}px) {
		width: calc(100% / 3 - ${styles.scale.px18} * 2);
		margin: ${styles.scale.px18};
		padding: ${styles.scale.px24};
		border: 1px solid ${styles.colors.blue};
	}
`

const ImageListContainer = ({ images, crop }) => {
	return (
		<div css={imageListCSS}>
			{images.map((image, index) => {
				return (
					<div key={index} css={imageWrapperCSS}>
						<a href={image.originalImage.url}>
							<Img
								fluid={
									crop
										? image.croppedImage.fluid
										: image.originalImage.fluid
								}
								alt={
									crop
										? image.croppedImage.alt
										: image.originalImage.alt
								}
							/>
						</a>
					</div>
				)
			})}
		</div>
	)
}

export default ImageListContainer
