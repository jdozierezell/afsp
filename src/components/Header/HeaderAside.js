import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const headerAsideCSS = css`
	background-color: ${styles.colors.yellow};
	padding: ${styles.scale.px5} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}) {
		padding: ${styles.scale.px14} ${styles.scale.px50};
	}
	p {
		font-family: ${styles.fonts.avenirRegular};
		text-align: center;
		line-height: ${styles.scale.px24};
		margin: 0;
	}
	a {
		color: ${styles.colors.darkGray};
	}
`

const HeaderAside = () => {
	return (
		<aside css={headerAsideCSS}>
			<p>
				<strong>Are you in a crisis?</strong> Call{' '}
				<a
					href="https://suicidepreventionlifeline.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					800-273-8255
				</a>{' '}
				or text{' '}
				<a
					href="https://crisistextline.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					TALK to 741741
				</a>
				.
			</p>
		</aside>
	)
}

export default HeaderAside
