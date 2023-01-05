import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import Script from 'react-load-script'

import { styles } from '../../css/css'

const defaultEmbedCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
	}
`

const Embed = ({ embed, embedCSS }) => {
	const [scriptSrc, setScriptSrc] = useState(null)
	useEffect(() => {
		// super convoluted way to make script replacement tags work, but hey, it works
		const wrapper = document.createElement('div')
		wrapper.innerHTML = embed
		wrapper.childNodes.forEach(
			node => {
				if (node.localName === 'script' && scriptSrc !== node.src) {
					setScriptSrc(node.src)
				}
			},
			[scriptSrc]
		)
	})
	return (
		<div>
			<div
				css={css`
					${defaultEmbedCSS};
					${embedCSS};
				`}
				dangerouslySetInnerHTML={{ __html: embed }}
			></div>
			{scriptSrc && <Script url={scriptSrc} />}
		</div>
	)
}

export default Embed
