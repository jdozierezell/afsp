import React from 'react'
import { css } from '@emotion/core'

const IconExternalLink = ({ color, iconCSS }) => {
	return (
		<svg
			viewBox="0 0 62.5 62.5"
			css={css`
				${iconCSS};
				fill: ${color};
			`}
		>
			<g>
				<path
					d="M46.9,34.4c0-1.7,1.4-3.1,3.1-3.1s3.1,1.4,3.1,3.1v18.8c0,5.2-4.2,9.4-9.4,9.4H9.4c-5.2,0-9.4-4.2-9.4-9.4
		V18.8c0-5.2,4.2-9.4,9.4-9.4h18.8c1.7,0,3.1,1.4,3.1,3.1c0,1.7-1.4,3.1-3.1,3.1H9.4c-1.7,0-3.1,1.4-3.1,3.1v34.4
		c0,1.7,1.4,3.1,3.1,3.1h34.4c1.7,0,3.1-1.4,3.1-3.1V34.4z"
				/>
				<path
					d="M56.2,6.2H40.6c-1.7,0-3.1-1.4-3.1-3.1S38.9,0,40.6,0h18.8c1.7,0,3.1,1.4,3.1,3.1v18.8c0,1.7-1.4,3.1-3.1,3.1
		s-3.1-1.4-3.1-3.1V6.2z"
				/>
				<path
					d="M27.2,39.7c-1.2,1.2-3.2,1.2-4.4,0c-1.2-1.2-1.2-3.2,0-4.4L57.2,0.9c1.2-1.2,3.2-1.2,4.4,0
		c1.2,1.2,1.2,3.2,0,4.4L27.2,39.7z"
				/>
			</g>
		</svg>
	)
}

export default IconExternalLink
