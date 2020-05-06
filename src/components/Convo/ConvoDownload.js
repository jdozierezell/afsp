import React from 'react'
import { css } from '@emotion/core'
import { Image } from 'react-datocms'

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
	console.log(convo.convoImage)
	return (
		<a css={convoCSS} href={convo.convoFile.url}>
			{convo.convoImage && (
				<Image
					css={convoImageCSS}
					style={{
						display: 'block',
					}}
					data={convo.convoImage.responsiveImage}
				/>
			)}
			{!convo.convoImage && (
				<img
					css={convoImageCSS}
					style={{
						display: 'block',
					}}
					src={convo.draftConvoImage.url}
				/>
			)}
			<span>{convo.convoTitle}</span>
		</a>
	)
}

export default ConvoDownload
