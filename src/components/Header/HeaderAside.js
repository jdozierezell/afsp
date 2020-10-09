import React from 'react'
import { css } from '@emotion/core'

import Recite from '../Recite/Recite'

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
		<aside css={headerAsideCSS} aria-label="crisis resources">
			<p>
				<strong>Are you in a crisis?</strong> Call{' '}
				<a
					href="https://suicidepreventionlifeline.org"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="lifeline website link"
				>
					800-273-8255
				</a>{' '}
				or text{' '}
				<a
					href="https://crisistextline.org"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="crisis text line website link"
				>
					TALK to 741741
				</a>
				.<br />
				<Recite />
			</p>
		</aside>
	)
}

export default HeaderAside
