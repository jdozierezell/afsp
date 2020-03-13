import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const resetCSS = css`
	display: inline;
	border: none;
	background: none;
	color: ${styles.colors.poppy};
	text-decoration: underline;
	cursor: pointer;
	:hover {
		color: ${styles.colors.poppyHover};
	}
`

const FormError = ({ formType, resetFunction }) => {
	return (
		<div id="error">
			<p>
				<strong>
					We're sorry, your {formType} submission experienced an
					unknown error.{' '}
					<button css={resetCSS} onClick={resetFunction}>
						Please try again
					</button>
				</strong>
			</p>
		</div>
	)
}

export default FormError
