import React from 'react'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

const videoComponentCSS = css`
	margin: 0 ${styles.gridGap.mobile} 0 0;
	flex-shrink: 0;
	h2 {
		margin: ${styles.scale.px30} 0 0;
		font-size: ${styles.scale.px20};
	}
`

const videoWrapperCSS = css`
	background-size: cover;
	background-position: center;
	border-radius: ${styles.scale.px7} / ${styles.scale.px5};
	padding: 56.25% 0 0 0;
	position: relative;
	iframe {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: 5px;
	}
`

const CarouselVideo = ({ vimeoId, title }) => {
	return (
		<div
			css={css`
				${videoComponentCSS};
			`}
			draggable
		>
			<div>
				<div css={videoWrapperCSS}>
					<iframe
						title={`video-${vimeoId}`}
						src={`https://player.vimeo.com/video/${vimeoId}`}
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
						}}
						frameBorder="0"
						allow="fullscreen"
						allowFullScreen
					></iframe>
				</div>
				<h2>{title}</h2>
			</div>
		</div>
	)
}

export default CarouselVideo
