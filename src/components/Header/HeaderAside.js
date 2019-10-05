import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const headerAsideCSS = css`
	background-color: ${styles.colors.yellow};
	padding: ${styles.scale.px14} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}) {
		padding: ${styles.scale.px14} ${styles.scale.px50};
	}
	p {
		font-family: ${styles.fonts.avenirRegular};
		text-align: center;
		line-height: ${styles.scale.px24};
		margin: 0;
	}
`

const HeaderAside = () => {
	return (
		<aside css={headerAsideCSS}>
			<p>
				<strong>Are you in a crisis?</strong>
				<br />
				Call the{' '}
				<a
					href="https://suicidepreventionlifeline.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					National Suicide Prevention Lifeline
				</a>{' '}
				at <a href="tel:+18002738255">800-273-8255</a> or contact the{' '}
				<a
					href="https://crisistextline.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Crisis Text Line
				</a>{' '}
				by texting <a href="sms:741741&body=TALK">TALK to 741741</a>.
			</p>
		</aside>
	)
}

export default HeaderAside
