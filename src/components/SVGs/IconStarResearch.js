import React from 'react'

import { css } from '@emotion/react'

const IconStarResearch = ({ id, title, color, iconCSS }) => {
	return (
		<svg
			aria-labelledby={id}
			viewBox="0 0 144 144"
			css={css`
				${iconCSS};
				fill: ${color};
				position: absolute;
				bottom: 0;
				right: 0;
				width: 40%;
			`}
		>
			<linearGradient
				id="SVGID_1_"
				gradientUnits="userSpaceOnUse"
				x1="184.2827"
				y1="184.2827"
				x2="82.4593"
				y2="82.4593"
			>
				<stop
					offset="0.1769"
					css={css`
						stop-color: #eb1426;
					`}
				/>
				<stop
					offset="0.5816"
					css={css`
						stop-color: #eb1625;
					`}
				/>
				<stop
					offset="0.7274"
					css={css`
						stop-color: #eb1d24;
					`}
				/>
				<stop
					offset="0.8313"
					css={css`
						stop-color: #eb2820;
					`}
				/>
				<stop
					offset="0.9147"
					css={css`
						stop-color: #ea391c;
					`}
				/>
				<stop
					offset="0.9859"
					css={css`
						stop-color: #ea4f16;
					`}
				/>
				<stop
					offset="0.9944"
					css={css`
						stop-color: #ea5215;
					`}
				/>
			</linearGradient>
			<polyline
				css={css`
					fill: url(#SVGID_1_);
				`}
				points="144,0 144,144 0,144 "
			/>
			<path
				css={css`
					fill: #ffffff;
				`}
				d="M102.2,91.1l12.5,1.8c1,0.2,1.9,0.9,2.2,1.9c0.3,1,0.1,2.1-0.7,2.9l-9.1,9l2.2,12.7c0.2,1-0.3,2.1-1.1,2.7
		c-0.9,0.6-2,0.7-2.9,0.2l-11.2-6l-11.2,6c-0.9,0.5-2.1,0.4-2.9-0.2c-0.9-0.6-1.3-1.7-1.1-2.7l2.1-12.7l-9.1-9
		c-0.8-0.7-1-1.8-0.7-2.9c0.3-1,1.2-1.7,2.2-1.9l12.5-1.8l5.6-11.5c0.5-1,1.4-1.6,2.5-1.6c1.1,0,2,0.6,2.5,1.6L102.2,91.1z"
			/>
		</svg>
	)
}

export default IconStarResearch
