import React from 'react'
import { css } from '@emotion/react'

import IconFacebook from '../SVGs/IconFacebook'
import IconInstagram from '../SVGs/IconInstagram'
import IconLinkedIn from '../SVGs/IconLinkedIn'
import IconTheMighty from '../SVGs/IconTheMighty'
import IconTikTok from '../SVGs/IconTikTok'
import IconTwitter from '../SVGs/IconTwitter'
import IconYouTube from '../SVGs/IconYouTube'

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
				<IconFacebook
					id="facebook-footer-social"
					title="AFSPNational"
					color={styles.colors.white}
				/>
			</a>
			<a
				href="https://www.instagram.com/afspnational/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="AFSPNational Instagram"
			>
				<IconInstagram
					id="instagram-footer-social"
					title="AFSPNational"
					color={styles.colors.white}
				/>
			</a>
			<a
				href="https://twitter.com/afspnational"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="AFSPNational Twitter"
			>
				<IconTwitter
					id="twitter-footer-social"
					title="AFSPNational"
					color={styles.colors.white}
				/>
			</a>
			<a
				href="https://www.tiktok.com/@afspnational"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="AFSPNational TikTok"
			>
				<IconTikTok
					id="tiktok-footer-social"
					title="AFSPNational"
					color={styles.colors.white}
				/>
			</a>
			<a
				href="https://www.linkedin.com/company/afspnational"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="AFSPNational LinkedIn"
			>
				<IconLinkedIn
					id="linkedin-footer-social"
					title="AFSPNational"
					color={styles.colors.white}
				/>
			</a>
			<a
				href="https://www.youtube.com/user/afspnational"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="AFSPNational YouTube"
			>
				<IconYouTube
					id="youtube-footer-social"
					title="AFSPNational"
					color={styles.colors.white}
				/>
			</a>
			<a
				href="https://themighty.com/u/americanfoundationforsuicideprevention/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="AFSP partner page on themighty.com"
			>
				<IconTheMighty
					id="themighty-footer-social"
					color={styles.colors.white}
				/>
			</a>
		</div>
	)
}

export default FooterSocials
