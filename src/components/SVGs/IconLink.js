import React from 'react'

import { css } from '@emotion/react'

const IconLink = ({ color, iconCSS }) => {
	return (
		<svg
			viewBox="0 0 100 100"
			css={css`
				${iconCSS};
				fill: ${color};
			`}
		>
			<path
				d="M7.8,7.8c10.4-10.4,27.3-10.4,37.7,0l14.9,14.9c-1.2-0.1-2.4-0.2-3.6-0.2c-3.8,0-7.4,0.6-10.9,1.8l-8.4-8.4
		c-2.9-2.9-6.7-4.5-10.8-4.5c-4.1,0-7.9,1.6-10.8,4.5c-2.9,2.9-4.5,6.7-4.5,10.8c0,4.1,1.6,7.9,4.5,10.8L32.3,54
		c2.9,2.9,6.7,4.5,10.8,4.5c4.1,0,7.9-1.6,10.8-4.5c1.4-1.4,2.5-3,3.3-4.8c1.9,0.1,3.6,0.9,5,2.2l4.4,4.4C65.4,58,63.9,60.1,62,62
		c-10.4,10.4-27.3,10.4-37.7,0L7.8,45.5C-2.6,35.1-2.6,18.2,7.8,7.8z"
			/>
			<path
				d="M43,77.5c3.8,0,7.5-0.6,11-1.8l8.5,8.5c2.9,2.9,6.7,4.5,10.8,4.5c4.1,0,7.9-1.6,10.8-4.5c2.9-2.9,4.5-6.7,4.5-10.8
		c0-4.1-1.6-7.9-4.5-10.8L67.7,46c-2.9-2.9-6.7-4.5-10.8-4.5c-4.1,0-7.9,1.6-10.8,4.5c-1.4,1.4-2.5,3-3.3,4.8
		c-1.9-0.1-3.6-0.9-5-2.2l-4.4-4.4c1.2-2.2,2.7-4.3,4.6-6.2c10.4-10.4,27.3-10.4,37.7,0l16.5,16.5c10.4,10.4,10.4,27.3,0,37.7
		c-10.4,10.4-27.3,10.4-37.7,0L39.6,77.3C40.7,77.4,41.9,77.5,43,77.5L43,77.5L43,77.5z"
			/>
		</svg>
	)
}

export default IconLink
