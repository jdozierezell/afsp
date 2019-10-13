import React from 'react'

import { css } from '@emotion/core'

const IconFacebook = ({ color, iconCSS }) => {
	return (
		<svg
			viewBox="0 0 30 30"
			css={css`
				${iconCSS};
				fill: ${color};
			`}
		>
			<path
				id="Path_1"
				data-name="Path 1"
				d="M28.344,0H1.656A1.656,1.656,0,0,0,0,1.656V28.344A1.656,1.656,0,0,0,1.656,30h14.37V18.4h-3.9V13.857h3.9V10.516c0-3.875,2.366-5.985,5.823-5.985a32.076,32.076,0,0,1,3.493.178V8.759H22.958c-1.881,0-2.245.894-2.245,2.205v2.892h4.5L24.624,18.4H20.713V30h7.631A1.656,1.656,0,0,0,30,28.344V1.656A1.656,1.656,0,0,0,28.344,0Z"
			/>
		</svg>
	)
}

export default IconFacebook
