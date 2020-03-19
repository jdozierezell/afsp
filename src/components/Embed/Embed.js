import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const embedCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
	}
`

const Embed = ({ embed }) => {
	return (
		<div css={embedCSS} dangerouslySetInnerHTML={{ __html: embed }}></div>
	)
}

export default Embed
