import React from 'react'
import { css } from '@emotion/core'

const IconX = ({ color, iconCSS }) => {
	return (
		<svg
			viewBox="0 0 15.755 15.75"
			css={css`
				${iconCSS};
				fill: ${color};
			`}
		>
			<path
				id="Icon_ionic-ios-close"
				data-name="Icon ionic-ios-close"
				d="M21.029,19.164l5.627-5.627a1.318,1.318,0,1,0-1.865-1.865L19.164,17.3l-5.627-5.627a1.318,1.318,0,1,0-1.865,1.865L17.3,19.164l-5.627,5.627a1.318,1.318,0,1,0,1.865,1.865l5.627-5.627,5.627,5.627a1.318,1.318,0,0,0,1.865-1.865Z"
				transform="translate(-11.285 -11.289)"
			/>
		</svg>
	)
}

export default IconX
