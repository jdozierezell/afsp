import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const commentCSS = css`
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-column-gap: ${styles.gridGap.mobile};
	margin-bottom: ${styles.scale.px25};
	:last-of-type {
		margin-bottom: 0;
	}
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: 1.25fr 6.75fr;
		grid-column-gap: ${styles.scale.px44};
		max-width: 800px;
		margin: 0 auto ${styles.scale.px60};
	}
	img {
		border-radius: 50%;
	}
`

const commentTextCSS = css`
	background-color: ${styles.colors.white};
	padding: ${styles.scale.px24};
	border-radius: ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		/* grid-column: 3 / 4; */
	}
	p:last-of-type {
		margin-bottom: 0;
	}
`

const Comment = () => {
	return (
		<div css={commentCSS}>
			<img src="http://placekitten.com/400" alt="" />
			<div css={commentTextCSS}>
				<p>
					Mustache whatever chartreuse health goth locavore. Tumeric
					bitters fanny pack YOLO selfies schlitz ramps swag cray
					artisan. Photo booth man bun lo-fi, 3 wolf moon freegan
					umami subway tile drinking vinegar authentic. Crucifix
					taiyaki la croix, forage you probably haven't heard of them
					cliche affogato echo park salvia. Viral fixie wolf, next
					level ethical chia prism kitsch coloring book adaptogen
					seitan raclette franzen hashtag farm-to-table.
				</p>
			</div>
		</div>
	)
}

export default Comment
