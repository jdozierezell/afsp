import React from 'react'
import { css, keyframes } from '@emotion/react'

import { styles } from '../../css/css'

const ticker = keyframes`
0% {
    transform: translate3d(0, 0, 0);
    visibility: visible;
}
100% {
    transform: translate3d(-100%, 0, 0);
}
`

const tickerWrap = css`
	position: fixed;
	bottom: 0;
	width: 100%;
	height: ${styles.scale.px64};
	background-color: ${styles.colors.blue};
	padding-left: 100%;
	box-sizing: content-box;
	z-index: 2000;
	border-top: 2px solid ${styles.colors.white};
`

const tickerContainer = css`
	display: inline-block;
	height: ${styles.scale.px46};
	line-height: ${styles.scale.px46};
	white-space: nowrap;
	padding-top: 9px;
	padding-bottom: 9px;
	padding-right: 100%;
	box-sizing: content-box;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	animation-name: ${ticker};
	:hover {
		animation-play-state: paused;
	}
`

const tickerItem = css`
	display: inline-block;
	padding: 0 2rem;
	color: white;
	font-family: ${styles.fonts.avenirDemi};
	font-size: ${styles.scale.px24};
	:not(:last-of-type):not(:first-of-type) {
		border-right: 1px solid ${styles.colors.white};
	}
	a {
		color: white;
		:hover {
			text-decoration: none;
		}
	}
`

const Ticker = ({ ticker }) => {
	return (
		<div css={tickerWrap}>
			<div
				css={css`
					${tickerContainer};
					animation-duration: ${ticker.length * 20}s;
				`}
			>
				<div css={tickerItem}>Happening now: </div>
				{ticker.map((item, index) => (
					<div
						key={index}
						css={tickerItem}
						dangerouslySetInnerHTML={{ __html: item.tickerItem }}
					></div>
				))}
			</div>
		</div>
	)
}

export default Ticker
