import React from 'react'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import createAnchor from '../../utils/createAnchor'

import { styles } from '../../css/css'

const imageListCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px12};
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px56} ${styles.scale.px24};
	}
	@media (min-width: ${styles.screens.video}px) {
		width: calc(100% - ${styles.scale.px24} * 2 - 500px);
	}
`

const imageHeaderCSS = css`
	width: 100%;
	margin: ${styles.scale.px18};
	h2 {
		margin: 0;
	}
`

const imageWrapperCSS = css`
	margin: ${styles.scale.px12};
	@media (min-width: ${styles.screens.tablet}px) {
		margin: ${styles.scale.px18};
		padding: ${styles.scale.px24};
		border: 1px solid ${styles.colors.blue};
		width: calc(100% - ${styles.scale.px18} * 2);
	}
`

const ImageListContainer = ({ images, crop, navigation }) => {
	return (
		<div css={imageListCSS}>
			{images.map((image, index) => {
				return (
					<div
						key={index}
						css={css`
							${image.__typename === 'DatoCmsImageSectionHeader'
								? imageHeaderCSS
								: imageWrapperCSS};
							@media (min-width: ${styles.screens.tablet}px) {
								${image.__typename !==
									'DatoCmsImageSectionHeader' &&
								navigation &&
								`width: calc(100% / 2 - ${styles.scale.px18} * 2)`};
								${image.__typename !==
									'DatoCmsImageSectionHeader' &&
								!navigation &&
								`width: calc(100% / 3 - ${styles.scale.px18} * 2)`};
							}
							@media (min-width: 1500px) {
								${image.__typename !==
									'DatoCmsImageSectionHeader' &&
								`width: calc(100% / 3 - ${styles.scale.px18} * 2)`};
							}
						`}
					>
						{image.__typename === 'DatoCmsImageSectionHeader' && (
							<h2 id={createAnchor(image.header)}>
								{image.header}
							</h2>
						)}
						{image.__typename === 'DatoCmsListImage' && (
							<div>
								<a
									href={
										image.linkToOther && image.otherUrl
											? image.otherUrl
											: image.originalImage.url.replace(
													'?auto=format',
													''
											  )
									}
								>
									<GatsbyImage
										image={
											crop
												? image.croppedImage
														.gatsbyImageData
												: image.originalImage
														.gatsbyImageData
										}
										alt={
											crop
												? image.croppedImage.alt
												: image.originalImage.alt
										}
									/>
								</a>
							</div>
						)}
					</div>
				)
			})}
		</div>
	)
}

export default ImageListContainer
