import React from 'react'

import { css } from '@emotion/core'

const IconYouTube = ({ color, iconCSS }) => {
	return (
		<svg
			aria-labelledby="youTubeLogo"
			viewBox="0 0 35 24.5"
			css={css`
				${iconCSS};
				fill: ${color};
			`}
		>
			<title id="youTubeLogo">AFSPNational YouTube</title>
			<g transform="translate(0 0)">
				<path
					d="M122.451,438.2a4.384,4.384,0,0,0-3.094-3.095c-2.729-.731-13.674-.731-13.674-.731s-10.945,0-13.674.731a4.384,4.384,0,0,0-3.094,3.095,48.893,48.893,0,0,0,0,16.848,4.385,4.385,0,0,0,3.094,3.094c2.729.731,13.674.731,13.674.731s10.945,0,13.674-.731a4.384,4.384,0,0,0,3.094-3.094,48.874,48.874,0,0,0,0-16.848Zm-20.269,13.674v-10.5l9.093,5.25Z"
					transform="translate(-88.182 -434.373)"
				/>
			</g>
		</svg>
	)
}

export default IconYouTube
