import React from 'react'
import { css } from '@emotion/react'

const IconCircleX = ({ color, iconCSS }) => {
	return (
		<svg
			viewBox="0 0 847 847"
			fill-rule="evenodd"
			css={css`
				${iconCSS};
				fill: ${color};
			`}
		>
			<path d="M423 20c223,0 404,180 404,403 0,223 -181,404 -404,404 -223,0 -403,-181 -403,-404 0,-223 180,-403 403,-403zm0 355l109 -109c32,-32 81,16 49,48l-109 109 109 109c32,32 -17,81 -49,49l-109 -109 -109 109c-32,32 -80,-17 -48,-49l109 -109 -109 -109c-32,-32 16,-80 48,-48l109 109z"></path>
		</svg>
	)
}

export default IconCircleX
