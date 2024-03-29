import React from 'react'
import { css } from '@emotion/react'

const IconCaret = ({ color, iconCSS }) => {
	return (
		<svg
			viewBox="0 0 17.49 10"
			css={css`
				${iconCSS};
				fill: ${color};
			`}
		>
			<path
				data-name="Icon ionic-ios-arrow-down"
				d="M14.936,18.232l6.613-6.618a1.245,1.245,0,0,1,1.765,0,1.26,1.26,0,0,1,0,1.77l-7.493,7.5a1.248,1.248,0,0,1-1.724.036l-7.545-7.53a1.25,1.25,0,0,1,1.765-1.77Z"
				transform="translate(-6.188 -11.246)"
			/>
		</svg>
	)
}

export default IconCaret
