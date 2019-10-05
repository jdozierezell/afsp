import React from 'react'
import { css } from '@emotion/core'

import IconFacebook from '../SVGs/IconFacebook'
import IconInstagram from '../SVGs/IconInstagram'
import IconTwitter from '../SVGs/IconTwitter'
import IconLinkedIn from '../SVGs/IconLinkedIn'
import IconYouTube from '../SVGs/IconYouTube'
import IconTheMighty from '../SVGs/IconTheMighty'

import { styles } from '../../css/css'

const socialCSS = css`
	display: flex;
	justify-content: space-between;
	margin: ${styles.scale.px75} 0;
	svg {
		height: ${styles.scale.px30};
	}
`

const FooterSocials = () => {
	return (
		<div css={socialCSS}>
			<IconFacebook color={styles.colors.white} />
			<IconInstagram color={styles.colors.white} />
			<IconTwitter color={styles.colors.white} />
			<IconLinkedIn color={styles.colors.white} />
			<IconYouTube color={styles.colors.white} />
			<IconTheMighty color={styles.colors.white} />
		</div>
	)
}

export default FooterSocials
