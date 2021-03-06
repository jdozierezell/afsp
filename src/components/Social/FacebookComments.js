import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { FacebookProvider, Comments } from 'react-facebook'

import { styles } from '../../css/css'

const commentCSS = css`
	grid-column: 1 / 4;
	background: ${styles.colors.lightGray};
	padding: ${styles.scale.px50} 0;
	@media (min-width: ${styles.screens.tablet}px) {
		padding: 0;
	}
	h2 {
		margin: 0 ${styles.scale.px24} ${styles.scale.px35};
		@media (min-width: ${styles.screens.tablet}px) {
			max-width: 960px;
			margin: ${styles.scale.px80} auto ${styles.scale.px60};
		}
	}
	.fb-comments {
		margin: ${styles.scale.px50} ${styles.scale.px24} 0;
		width: calc(100% - 48px);
		display: block;
		@media (min-width: ${styles.screens.tablet}px) {
			width: 100%;
			max-width: 960px;
			margin: ${styles.scale.px60} auto ${styles.scale.px80};
		}
		span,
		iframe {
			width: 100% !important;
		}
	}
`
const FacebookComments = ({ pageUrl }) => {
	const [fbDefined, setFbDefined] = useState(false)
	useEffect(() => {
		if (typeof FB !== `undefined`) {
			setFbDefined(true)
			// eslint-disable-next-line no-undef
			FB.XFBML.parse() // this is part of the SDK that needs to run upon each refresh, so it's pulled out here and dropped into useEffect
		} else {
			if (typeof window !== `undefined`) {
				window.onload = () => {
					setFbDefined(true)
					// eslint-disable-next-line no-undef
					FB.XFBML.parse() // this is part of the SDK that needs to run upon each refresh, so it's pulled out here and dropped into useEffect
				}
			}
		}
	}, [fbDefined])
	return (
		<>
			{fbDefined && (
				<aside css={commentCSS}>
					<h2>Comments</h2>
					<FacebookProvider appId="925475567867156">
						<Comments href={pageUrl} width="100%" />
					</FacebookProvider>
				</aside>
			)}
		</>
	)
}

export default FacebookComments
