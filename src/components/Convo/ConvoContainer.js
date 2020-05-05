import React from 'react'
import { css } from '@emotion/core'

import ConvoDownload from './ConvoDownload'
import ConvoVideo from './ConvoVideo'

import { styles } from '../../css/css'

const convoContainersCSS = css`
	padding: ${styles.scale.px50} ${styles.scale.px24};
	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: ${styles.scale.px90};
	grid-column-gap: ${styles.scale.px44};
	max-width: 1680px;
	margin: 0 auto;
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50};
		grid-row-gap: 0;
	}
`

const ConvoContainer = ({ convos, videos }) => {
	let columns = 0
	switch (convos.length) {
		case 2:
			columns = 2
			break
		case 3:
			columns = 3
			break
		default:
			// four or more items
			columns = 4
			break
	}
	return (
		<section id="read-the-guides">
			<div
				css={css`
					${convoContainersCSS};
					background-color: ${styles.colors.blue};
				`}
			>
				<p
					css={css`
						margin-bottom: -90px;
						@media (min-width: ${styles.screens.tablet}px) {
							grid-column: 1 / ${columns + 1};
							margin-bottom: 30px;
						}
					`}
				>
					Watch the #RealConvo videos
				</p>
				{/* {videos.map((video, index) => (
					<ConvoVideo key={index} video={video} />
				))} */}
			</div>
			<div
				css={css`
					${convoContainersCSS};
					background-color: ${styles.colors.lightGray};
					@media (min-width: ${styles.screens.tablet}px) {
						grid-template-columns: repeat(${columns}, 1fr);
					}
				`}
			>
				<p
					css={css`
						margin-bottom: -90px;
						@media (min-width: ${styles.screens.tablet}px) {
							grid-column: 1 / ${columns + 1};
							margin-bottom: 30px;
						}
					`}
				>
					Download the #RealConvo guides
				</p>
				{convos.map((convo, index) => (
					<ConvoDownload key={index} convo={convo} />
				))}
			</div>
		</section>
	)
}

export default ConvoContainer
