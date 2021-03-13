import React from 'react'
import { css } from '@emotion/react'

const SolidArrow = ({ color, iconCSS }) => {
	return (
		<svg
			viewBox="0 0 100 100"
			css={css`
				${iconCSS};
				fill: ${color};
			`}
		>
			<path
				d="M54.37,84.98c-1.61,2.42-4.88,3.07-7.29,1.46c-0.58-0.38-1.07-0.88-1.46-1.46L2.87,20.83
	c-1.6-2.42-0.94-5.68,1.48-7.29c0.86-0.57,1.86-0.87,2.89-0.87h85.51c2.9,0,5.26,2.35,5.26,5.26c0,1.04-0.31,2.05-0.88,2.92
	L54.37,84.98z"
			/>
		</svg>
	)
}

export default SolidArrow
