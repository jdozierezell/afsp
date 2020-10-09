import React from 'react'
import { css } from '@emotion/core'

import Recite from '../Recite/Recite'

import { styles } from '../../css/css'

const headerAsideCSS = css`
	background-color: ${styles.colors.yellow};
	padding: ${styles.scale.px24} ${styles.scale.px24};
	position: relative;
	> div {
		font-family: ${styles.fonts.avenirRegular};
		line-height: ${styles.scale.px24};
		margin: 0;
		text-align: center;
		&:last-of-type {
			padding-top: ${styles.scale.px12};
		}
	}
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px14} ${styles.scale.px50};
		min-height: ${styles.scale.px46};
		> div {
			font-family: ${styles.fonts.avenirRegular};
			line-height: ${styles.scale.px24};
			margin: 0;
			position: absolute;
			top: ${styles.scale.px12};
			&:first-of-type {
				text-align: left;
				left: ${styles.scale.px24};
			}
			&:last-of-type {
				text-align: right;
				right: ${styles.scale.px24};
				padding-top: 0;
			}
		}
	}
	a {
		color: ${styles.colors.darkGray};
	}
`

const HeaderAside = () => {
	return (
		<aside css={headerAsideCSS} aria-label="crisis resources">
			<div>
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
				.
			</div>
			<div>
				<Recite />
			</div>
		</aside>
	)
}

export default HeaderAside
