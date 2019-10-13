import React from 'react'
import { css } from '@emotion/core'

const IconHamburger = ({ color, iconCSS }) => {
	return (
		<svg
			viewBox="0 0 100 100"
			css={css`
				${iconCSS};
				fill: ${color};
			`}
		>
			<g>
				<path d="M6.8,25.3h86.3c3.4,0,6.2-2.8,6.2-6.2S96.6,13,93.2,13H6.8c-3.4,0-6.2,2.8-6.2,6.2S3.4,25.3,6.8,25.3z" />
				<path d="M93.2,43.8H6.8c-3.4,0-6.2,2.8-6.2,6.2s2.8,6.2,6.2,6.2h86.3c3.4,0,6.2-2.8,6.2-6.2S96.6,43.8,93.2,43.8z" />
				<path d="M93.2,74.7H6.8c-3.4,0-6.2,2.8-6.2,6.2S3.4,87,6.8,87h86.3c3.4,0,6.2-2.8,6.2-6.2S96.6,74.7,93.2,74.7z" />
			</g>
		</svg>
	)
}

export default IconHamburger
