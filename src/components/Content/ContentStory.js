import React, { useEffect } from 'react'
import Glide from '@glidejs/glide'
import { css } from '@emotion/core'

import IconFacebook from '../SVGs/IconFacebook'
import IconTwitter from '../SVGs/IconTwitter'
import IconLink from '../SVGs/IconLink'
import { useWindowDimensions } from '../WindowDimensionsProvider'

import { styles } from '../../css/css'

import '@glidejs/glide/dist/css/glide.core.min.css'

const storyContentCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
	}
	@media (min-width: ${styles.screens.tablet}px) {
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
		grid-column-gap: ${styles.gridGap.desktop};
	}
	> aside {
		@media (min-width: ${styles.screens.tablet}px) {
			grid-column: 1 / 2;
		}
		div {
			max-width: ${styles.scale.px30};
			svg {
				margin-bottom: ${styles.scale.px16};
			}
		}
		h3 {
			font-size: ${styles.scale.px18};
		}
	}
	> div {
		@media (min-width: ${styles.screens.tablet}px) {
		}
		grid-column: 2 / 3;
		max-width: 623px;
		margin: 0 auto;
	}
`

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

const ContentStory = ({ article }) => {
	const { width } = useWindowDimensions()
	useEffect(() => {
		const hasImages = document.getElementsByClassName('glide-image')
		if (hasImages.length > 0) {
			const glide = new Glide('.glide-image', { perView: 1.2, gap: 20 })
			glide.mount()
		}
	}, [])
	return (
		<section css={storyContentCSS}>
			{width > styles.screens.tablet && (
				<aside>
					<h3>Share this Story</h3>
					<div>
						<IconFacebook color={styles.colors.darkGray} />
						<IconTwitter color={styles.colors.darkGray} />
						<IconLink color={styles.colors.darkGray} />
					</div>
				</aside>
			)}
			<div>
				{article.article.map((copy, index) => {
					if (copy.__typename === 'DatoCmsBody') {
						return (
							<div
								key={index}
								dangerouslySetInnerHTML={{ __html: copy.copy }}
							></div>
						)
					} else if (copy.__typename === 'DatoCmsImage') {
						return (
							<div key={index}>
								{copy.images.length === 1 && (
									<img
										key={copy.images[0].id}
										src={copy.images[0].url}
										alt={copy.images[0].alt}
									/>
								)}
								{copy.images.length > 1 && (
									<div
										className="glide-image"
										css={css`
											overflow: hidden;
											margin: ${styles.scale.px36} 0;
										`}
									>
										<div data-glide-el="track">
											<div className="glide__slides">
												{copy.images.map(
													(image, index) => (
														<img
															key={index}
															src={image.url}
															css={css`
																max-height: 500px;
																width: auto !important;
															`}
														/>
													)
												)}
											</div>
										</div>
										<div
											data-glide-el="controls[nav]"
											css={carouselButtonsCSS}
										>
											{copy.images.map((__, index) => {
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
				})}
			</div>
		</section>
	)
}

export default ContentStory
