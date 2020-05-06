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
	let convoColumns = 0
	let videoColumns = 0
	switch (convos.length) {
		case 2:
			convoColumns = 2
			break
		case 3:
			convoColumns = 3
			break
		default:
			// four or more items
			convoColumns = 4
			break
	}
	switch (videos.length) {
		case 2:
			videoColumns = 2
			break
		case 3:
			videoColumns = 3
			break
		default:
			// four or more items
			videoColumns = 4
			break
	}
	return (
		<section id="read-the-guides">
			{videos && (
				<div
					css={css`
						${convoContainersCSS};
						background-color: ${styles.colors.blue};
						@media (min-width: ${styles.screens.tablet}px) {
							grid-template-columns: repeat(${videoColumns}, 1fr);
						}
					`}
				>
					<p
						css={css`
							margin-bottom: -90px;
							color: ${styles.colors.white};
							@media (min-width: ${styles.screens.tablet}px) {
								grid-column: 1 / ${videoColumns + 1};
								margin-bottom: 30px;
							}
						`}
					>
						Watch the #RealConvo videos
					</p>
					{videos.map((video, index) => (
						<ConvoVideo key={index} video={video} />
					))}
				</div>
			)}
			{convos && (
				<div
					css={css`
						${convoContainersCSS};
						background-color: ${styles.colors.lightGray};
						@media (min-width: ${styles.screens.tablet}px) {
							grid-template-columns: repeat(${convoColumns}, 1fr);
						}
					`}
				>
					<p
						css={css`
							margin-bottom: -90px;
							@media (min-width: ${styles.screens.tablet}px) {
								grid-column: 1 / ${convoColumns + 1};
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
			)}
		</section>
	)
}

export default ConvoContainer
