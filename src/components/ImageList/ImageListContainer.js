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

const ImageListContainer = ({ images }) => {
	return (
		<div css={imageListCSS}>
			{images.map(image => {
				return (
					<div css={imageWrapperCSS}>
						<a
							href={
								image.linkToOther
									? image.otherUrl
									: image.image.url
							}
						>
							<Img
								fluid={
									image.cropImage
										? image.image.crop
										: image.image.original
								}
								imgStyle={{
									border: `0.5px solid ${styles.colors.darkGray}`,
								}}
							/>
						</a>
					</div>
				)
			})}
		</div>
	)
}

export default ImageListContainer