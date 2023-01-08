import React from 'react'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { styles } from '../../css/css'

const imageListCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px12};
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px56} ${styles.scale.px24};
	}
`

const imageWrapperCSS = css`
	width: calc(100% - ${styles.scale.px18} * 2);
	margin: ${styles.scale.px12};
	box-sizing: border-box;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: ${styles.scale.px18};
		padding: ${styles.scale.px24};
		border: 1px solid ${styles.colors.blue};
		width: calc(100% / 3 - ${styles.scale.px18} * 2);
		:hover {
			background-color: ${styles.colors.lightGray};
			border: 1px solid ${styles.colors.darkBlue};
		}
	}
`

const FactsListContainer = ({ stateFacts }) => {
	return (
		<div css={imageListCSS}>
			{stateFacts.map((fact, index) => {
				return (
					<div key={index} css={imageWrapperCSS}>
						<div>
							<a
								href={`https://afsp.org/facts/${fact.node.slug}`}
							>
								<GatsbyImage
									image={
										fact.node.stateFactSheetImage
											.gatsbyImageData
									}
									alt={fact.node.stateFactSheetImage.alt}
								/>
							</a>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default FactsListContainer
