import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const IconArrowCircle = ({ color, direction, iconCSS }) => {
	const transform =
		direction === 'right' ? 'rotate(180) translate(-100 -100)' : ''
	return (
		<svg
			viewBox="0 0 100 100"
			css={css`
				${iconCSS};
				fill: ${color};
				stroke: ${styles.colors.lightGray};
			`}
		>
			<path
				d="M50,97.5c26.2,0,47.5-21.3,47.5-47.5S76.2,2.5,50,2.5S2.5,23.8,2.5,50S23.8,97.5,50,97.5z M33.6,46.8L52,28.5
			c0.9-0.9,2-1.3,3.2-1.3s2.3,0.4,3.2,1.3c1.7,1.7,1.7,4.6,0,6.3L43.1,50l15.2,15.2c1.7,1.7,1.7,4.6,0,6.3c-1.7,1.7-4.6,1.7-6.3,0
            L33.6,53.2c-0.8-0.8-1.3-2-1.3-3.2S32.8,47.7,33.6,46.8z"
				transform={transform}
			/>
		</svg>
	)
}

export default IconArrowCircle
