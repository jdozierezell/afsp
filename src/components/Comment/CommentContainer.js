import React from 'react'
import { css } from '@emotion/core'

import Comment from './Comment'

import { styles } from '../../css/css'

const commentContainerCSS = css`
	padding: ${styles.scale.px50} ${styles.scale.px24};
	background-color: ${styles.colors.lightGray};
	> h2 {
		font-size: ${styles.scale.px24};
		font-family: ${styles.fonts.avenirBold};
		margin-bottom: ${styles.scale.px35};
		@media (min-width: ${styles.screens.tablet}px) {
			font-size: ${styles.scale.px40};
			max-width: 800px;
			margin: 0 auto ${styles.scale.px60};
		}
	}
	.secondary-button {
		line-height: ${styles.scale.px28};
		padding-top: ${styles.scale.px14};
		padding-bottom: ${styles.scale.px14};
		width: 280px;
		border-radius: ${styles.scale.px50};
		margin: 0 auto;
		display: block;
		margin-top: ${styles.scale.px40};
		@media (min-width: ${styles.screens.tablet}px) {
			margin-top: ${styles.scale.px60};
			width: auto;
		}
	}
`

const CommentContainer = () => {
	return (
		<aside css={commentContainerCSS}>
			<h2>Comments</h2>
			<div>
				<Comment />
				<Comment />
			</div>
			<button className="secondary-button">
				Join the conversation on Facebook
			</button>
		</aside>
	)
}

export default CommentContainer
