import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const footerAsideCSS = css`
	margin-bottom: ${styles.scale.px90};
	p {
		font-family: ${styles.fonts.avenirRegular};
		text-align: left;
		padding: 0;
		line-height: ${styles.scale.px24};
		margin: ${styles.scale.px30} 0;
		color: ${styles.colors.white};
	}
	a {
		color: ${styles.colors.white};
	}
`

const FooterAside = () => {
	return (
		<aside css={footerAsideCSS} aria-label="footer crisis resources">
			<p>
				<strong>Are you in a crisis?</strong>
			</p>
			<p>
				Please call the{' '}
				<a
					href="https://suicidepreventionlifeline.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					National Suicide Prevention Lifeline
				</a>{' '}
				at{' '}
				<a aria-label="lifeline phone number" href="tel:+18002738255">
					800-273-8255
				</a>
				.
			</p>
			<p>
				Or contact the{' '}
				<a
					href="https://crisistextline.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Crisis Text Line
				</a>{' '}
				by texting{' '}
				<a
					aria-label="crisis text line text number"
					href="sms:741741&body=TALK"
				>
					TALK to 741741
				</a>
				.
			</p>
		</aside>
	)
}

export default FooterAside
