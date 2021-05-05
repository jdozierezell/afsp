import React from 'react'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { styles } from '../../css/css'

const convoCSS = css`
	text-align: center;
	@media (min-width: ${styles.screens.tablet}px) {
		text-align: left;
		:hover {
			> div {
				border: ${styles.scale.px2} solid ${styles.colors.poppy};
			}
			> span {
				text-decoration: underline;
			}
		}
	}
	span {
		color: ${styles.colors.darkGray};
		font-family: ${styles.fonts.avenirBold};
		font-size: ${styles.scale.px20};
		display: inline-block;
		margin: ${styles.scale.px30} 0 0;
	}
`

const convoImageCSS = css`
	min-width: 125px;
	max-width: 150px;
	margin: 0 auto;
	background-color: ${styles.colors.white};
	border: ${styles.scale.px2} solid ${styles.colors.white};
	border-radius: 50%;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0;
	}
`

const ConvoDownload = ({ convo }) => {
	return (
		<a css={convoCSS} href={convo.convoFile.url}>
			<GatsbyImage
				css={convoImageCSS}
				style={{
					display: 'block',
				}}
				image={convo.convoImage.gatsbyImageData}
				alt=""
			/>
			<span>{convo.convoTitle}</span>
		</a>
	)
}

export default ConvoDownload
