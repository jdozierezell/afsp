import React from 'react'
import { css } from '@emotion/core'

import IconFacebook from '../SVGs/IconFacebook'
import IconTwitter from '../SVGs/IconTwitter'
import IconLink from '../SVGs/IconLink'
import { useWindowDimensions } from '../WindowDimensionsProvider'

import { styles } from '../../css/css'

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

const ContentStory = ({ article }) => {
	console.log(article)
	const { width } = useWindowDimensions()
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
				{article.article.map(copy => {
					if (copy.__typename === 'DatoCmsBody') {
						return (
							<div
								key={copy.id}
								dangerouslySetInnerHTML={{ __html: copy.copy }}
							></div>
						)
					} else if (copy.__typename === 'DatoCmsImage') {
						return (
							<div key="copy.id">
								{copy.images.map(image => {
									if (copy.images.length === 1) {
										return (
											<img
												key={image.id}
												src={image.url}
												alt={image.alt}
											/>
										)
									} else if (copy.images.length > 1) {
										return (
											<img
												key={image.id}
												src={image.url}
												alt={image.alt}
											/>
										)
									}
								})}
							</div>
						)
					}
				})}
			</div>
		</section>
	)
}

export default ContentStory
