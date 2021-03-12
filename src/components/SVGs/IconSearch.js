import React from 'react'

import { css } from '@emotion/react'

import { styles } from '../../css/css'

const SearchIcon = ({
	theme,
	overrideLight,
	isHover,
	isMenuActive,
	iconCSS,
}) => {
	const mobileColor =
		theme.mobile === 'light' && !isHover && !isMenuActive
			? styles.colors.white
			: styles.colors.darkGray
	const desktopColor =
		theme.desktop === 'light' ? styles.colors.white : styles.colors.darkGray
	return (
		<svg
			aria-labelledby="searchMag"
			viewBox="0 0 100 100"
			css={css`
				${iconCSS};
				fill: ${overrideLight || isHover || isMenuActive
					? styles.colors.darkGray
					: mobileColor};
				@media (min-width: ${styles.screens.navigation}px) {
					fill: ${isHover || isMenuActive
						? styles.colors.darkGray
						: desktopColor};
				}
			`}
		>
			<title id="searchMag">Search magnifying glass</title>
			<g>
				<path
					d="M92.3,99c-1.2,0-2.3-0.5-3.2-1.4L65.3,73.2c-1.7-1.8-1.7-4.6,0.1-6.3c1.8-1.7,4.6-1.7,6.3,0.1l23.8,24.5
		c1.7,1.8,1.7,4.6-0.1,6.3C94.6,98.6,93.4,99,92.3,99z"
				/>
				<path
					d="M44,81.6c-22.5,0-40.7-18.1-40.7-40.3C3.2,19.1,21.5,1,44,1s40.7,18.1,40.7,40.3S66.4,81.6,44,81.6z M44,9.9
		C26.4,9.9,12.1,24,12.1,41.3S26.4,72.7,44,72.7c17.5,0,31.8-14.1,31.8-31.4S61.5,9.9,44,9.9z"
				/>
			</g>
		</svg>
	)
}

export default SearchIcon
