import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

import IconFacebook from '../SVGs/IconFacebook'
import IconTwitter from '../SVGs/IconTwitter'
import IconInstagram from '../SVGs/IconInstagram'
// import Loadable from '@loadable/component'

// const IconFacebook = Loadable(() => import('../SVGs/IconFacebook'))
// const IconTwitter = Loadable(() => import('../SVGs/IconTwitter'))
// const IconInstagram = Loadable(() => import('../SVGs/IconInstagram'))

const chapterSocialsCSS = css`
	background-color: ${styles.colors.darkBlue};
	div {
		width: 400px;
		padding: ${styles.scale.px24};
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
	}
	a {
		line-height: 0;
	}
`

const iconCSS = css`
	width: ${styles.scale.px36};
`

const ChapterSocials = ({ socialAccounts }) => {
	return (
		<div css={chapterSocialsCSS}>
			<div>
				{socialAccounts.map((account, index) => {
					if (account.socialPlatform === 'Facebook') {
						return (
							<a
								key={index}
								href={`https://facebook.com/${account.accountHandle}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<IconFacebook
									color={styles.colors.white}
									iconCSS={iconCSS}
								/>
							</a>
						)
					} else if (account.socialPlatform === 'Twitter') {
						return (
							<a
								key={index}
								href={`https://twitter.com/${account.accountHandle}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<IconTwitter
									color={styles.colors.white}
									iconCSS={iconCSS}
								/>
							</a>
						)
					} else if (account.socialPlatform === 'Instagram') {
						return (
							<a
								key={index}
								href={`https://instagram.com/${account.accountHandle}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<IconInstagram
									color={styles.colors.white}
									iconCSS={iconCSS}
								/>
							</a>
						)
					} else {
						return null
					}
				})}
			</div>
		</div>
	)
}

export default ChapterSocials
