import React from 'react'
import { css } from '@emotion/core'
import Script from 'react-load-script'

import FooterAside from './FooterAside'
import FooterSocials from './FooterSocials'
import FooterRatings from './FooterRatings'
import MobileMenuSection from '../Navigation/MobileMenuSection'
import DeskFooterSection from '../Navigation/DeskFooterSection'
import LogoWhite from '../SVGs/LogoWhite'

import { styles } from '../../css/css'

const footerCSS = css`
	background-color: ${styles.colors.darkGray};
	padding: ${styles.scale.px50} ${styles.screens.px24};
	color: ${styles.colors.white};
	font-family: ${styles.fonts.avenirRegular};
	position: relative;
	z-index: 100;
`

const mobileFooterCSS = css`
	@media (min-width: ${styles.screens.footer}px) {
		display: none;
	}
`

const desktopFooterCSS = css`
	display: none;
	@media (min-width: ${styles.screens.footer}px) {
		display: grid;
		grid-gap: 0 ${styles.gridGap.desktop};
		grid-template-columns: repeat(6, auto) 320px;
	}
`

const logoLegalCSS = css`
	z-index: 1;
	/* justify-items: center; */
	@media (min-width: ${styles.screens.footer}px) {
		display: grid;
		grid-gap: 0 48px;
		grid-template-columns: auto auto 260px 320px;
	}
`

const grid452 = css`
	@media (min-width: ${styles.screens.footer}px) {
		grid-area: 2 / 4 / 2 / 5;
		align-self: end;
	}
`

const logoCSS = css`
	width: ${styles.scale.px126};
	margin-top: ${styles.scale.px64};
	@media (min-width: ${styles.screens.footer}px) {
		grid-area: 2 / 1 / 2 / 2;
		align-self: end;
	}
`

const ratingsCSS = css`
	@media (min-width: ${styles.screens.footer}px) {
		grid-area: 2 / 3 / 2 / 4;
		align-self: end;
	}
`

const copyrightCSS = css`
	font-size: ${styles.scale.px16};
	line-height: ${styles.scale.px22};
	margin: ${styles.scale.px30} 0 ${styles.scale.px40};
	display: inline-block;

	@media (min-width: ${styles.screens.footer}px) {
		margin: 0;
		grid-area: 2 / 2 / 2 / 3;
		align-self: end;
	}
`
const Footer = ({ nav }) => {
	return (
		<>
			<footer css={footerCSS}>
				<div css={desktopFooterCSS}>
					{nav.map((item, index) => {
						const leftEdge = index * 2 + 1
						const rightEdge =
							index + 1 < nav.length
								? index * 2 + 3
								: index * 2 + 2
						return (
							<div
								key={index}
								css={css`
									grid-area: 1 / ${leftEdge} / 2 /
										${rightEdge};
								`}
							>
								<DeskFooterSection
									item={item}
									index={index}
									length={nav.length}
								/>
							</div>
						)
					})}
				</div>
				<div css={mobileFooterCSS}>
					<FooterAside aria="footer crisis resources for mobile" />
					{nav.map((item, index) => (
						<MobileMenuSection key={index} item={item} />
					))}
				</div>
				<div css={logoLegalCSS}>
					<div css={grid452}>
						<FooterSocials />
					</div>
					<div css={ratingsCSS}>
						<FooterRatings />
					</div>
					<div css={logoCSS}>
						<LogoWhite />
					</div>
					<small css={copyrightCSS}>
						© {new Date().getFullYear()} American Foundation for
						Suicide Prevention. All rights reserved.
					</small>
				</div>
			</footer>
			<Script
				attributes={{
					id: 'siteimprove',
					type: 'text/javascript',
					async: '',
				}}
				url="//siteimproveanalytics.com/js/siteanalyze_6019066.js"
			/>
		</>
	)
}

export default Footer
