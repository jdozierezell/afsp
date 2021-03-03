import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const embedCSS = css`
	margin: ${styles.scale.px16} 0;
`

const ContentEmbed = ({ embedCode }) => {
	return (
		<div
			css={embedCSS}
			dangerouslySetInnerHTML={{ __html: embedCode }}
		></div>
	)
}

export default ContentEmbed
