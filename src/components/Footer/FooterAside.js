import React from 'react'
import { css } from '@emotion/react'

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
		line-height: 1.5;
	}
	a {
		color: ${styles.colors.white};
	}
`

const FooterAside = ({ aria }) => {
	return (
		<aside css={footerAsideCSS} aria-label={aria}>
			<p>
				<strong>Are you in a crisis?</strong>
			</p>
			<p>
				Please call the{' '}
				<a
					href="https://988lifeline.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Suicide and Crisis Lifeline
				</a>{' '}
				at{' '}
				<a
					aria-label="Suicide and Crisis Lifeline website link and phone number: 988"
					href="tel:988"
				>
					988
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
					aria-label="crisis text line website link and text information: TALK to 741741"
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
