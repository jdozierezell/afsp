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
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0;
	}
`

const FooterSocials = () => {
	return (
		<div css={socialCSS}>
			<a
				href="https://www.facebook.com/AFSPnational/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="AFSPNational Facebook"
			>
				<IconFacebook color={styles.colors.white} />
			</a>
			<a
				href="https://www.instagram.com/afspnational/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="AFSPNational Instagram"
			>
				<IconInstagram color={styles.colors.white} />
			</a>
			<a
				href="https://twitter.com/afspnational"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="AFSPNational Twitter"
			>
				<IconTwitter color={styles.colors.white} />
			</a>
			<a
				href="https://www.linkedin.com/company/afspnational"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="AFSPNational LinkedIn"
			>
				<IconLinkedIn color={styles.colors.white} />
			</a>
			<a
				href="https://www.youtube.com/user/afspnational"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="AFSPNational YouTube"
			>
				<IconYouTube color={styles.colors.white} />
			</a>
			<a
				href="https://themighty.com/partner/AmericanFoundationforSuicidePrevention/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="AFSP partner page on themighty.com"
			>
				<IconTheMighty color={styles.colors.white} />
			</a>
		</div>
	)
}

export default FooterSocials
