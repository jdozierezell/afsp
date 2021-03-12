import React from 'react'
import { css } from '@emotion/react'

const IconArrow = ({ color, direction, iconCSS }) => {
	const transform =
		direction === 'right'
			? 'translate(0 -4.674)'
			: 'translate(31.49 26.816) rotate(180)'
	return (
		<svg
			viewBox="0 0 31.49 22.142"
			css={css`
				${iconCSS};
				fill: ${color};
			`}
		>
			<path
				d="M21.2,5.007a1.117,1.117,0,0,0-1.587,1.571l8.047,8.047H1.111A1.106,1.106,0,0,0,0,15.737a1.118,1.118,0,0,0,1.111,1.127H27.665L19.618,24.9a1.139,1.139,0,0,0,0,1.587,1.112,1.112,0,0,0,1.587,0l9.952-9.952a1.093,1.093,0,0,0,0-1.571Z"
				transform={transform}
			/>
		</svg>
	)
}

export default IconArrow
