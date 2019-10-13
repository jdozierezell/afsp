import React from 'react'
import { css } from '@emotion/core'

const NavArrow = ({ color, iconCSS }) => {
	return (
		<svg
			viewBox="0 0 100 100"
			css={css`
				${iconCSS};
				fill: ${color};
			`}
		>
			<path d="M59.55,97.72L97.72,2.28L2.28,40.46l46.08,11.18L59.55,97.72z M83.36,16.64L61.41,71.51L55,45l-26.51-6.42L83.36,16.64z" />
		</svg>
	)
}

export default NavArrow
