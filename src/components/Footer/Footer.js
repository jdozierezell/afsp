import React from 'react'
import { css } from '@emotion/core'

import FooterAside from './FooterAside'
import FooterSocials from './FooterSocials'
import MobileMenuSection from '../Navigation/MobileMenuSection'
import DeskFooterSection from '../Navigation/DeskFooterSection'
import LogoWhite from '../SVGs/LogoWhite'
import { useWindowDimensions } from '../WindowDimensionsProvider'

import footerItems from '../Navigation/footerItems'

import { styles } from '../../css/css'

const footerCSS = css`
	background-color: ${styles.colors.darkGray};
	padding: ${styles.scale.px50} ${styles.screens.px24};
	color: ${styles.colors.white};
	font-family: ${styles.fonts.avenirRegular};
	@media (min-width: ${styles.screens.footer}px) {
		display: grid;
		grid-template-columns: repeat(6, 1fr) 320px;
	}
`

const grid122 = css`
	@media (min-width: ${styles.screens.footer}px) {
		grid-area: 2 / 1 / 2 / 2;
		align-self: end;
	}
`
const grid782 = css`
	@media (min-width: ${styles.screens.footer}px) {
		grid-area: 2 / 7 / 2 / 8;
		align-self: end;
	}
`

const logoCSS = css`
	width: ${styles.scale.px126};
`

const copyrightCSS = css`
	font-size: ${styles.scale.px16};
	line-height: ${styles.scale.px22};
	margin: ${styles.scale.px30} 0 ${styles.scale.px40};
	display: inline-block;

	@media (min-width: ${styles.screens.footer}px) {
		margin: 0 0 0 ${styles.scale.px30};
		grid-area: 2 / 2 / 2 / 6;
		align-self: end;
	}
`

const legalCSS = css`
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: space-between;
	li {
		@media (min-width: ${styles.screens.footer}px) {
			margin: 0;
		}
	}
	a {
		color: ${styles.colors.white};
	}
`
const Footer = () => {
	const { width } = useWindowDimensions()
	return (
		<footer css={footerCSS}>
			{width > styles.screens.footer &&
				footerItems.map((item, index) => {
					const leftEdge = index * 2 + 1
					const rightEdge =
						index + 1 < footerItems.length
							? index * 2 + 3
							: index * 2 + 2
					return (
						<div
							css={css`
								grid-area: 1 / ${leftEdge} / 2 / ${rightEdge};
							`}
						>
							<DeskFooterSection
								item={item}
								index={index}
								length={footerItems.length}
							/>
						</div>
					)
				})}
			{width <= styles.screens.footer && (
				<>
					<FooterAside />
					<MobileMenuSection title="Real Stories" />
					<FooterSocials />
				</>
			)}
			<div css={[logoCSS, grid122]}>
				<LogoWhite />
			</div>
			<small css={copyrightCSS}>
				© {new Date().getFullYear()} American Foundation for Suicide
				Prevention. All rights reserved.
			</small>
			<div css={grid782}>
				<ul css={legalCSS}>
					<li>
						<a href="https://example.com">Terms of use</a>
					</li>
					<li>
						<a href="https://example.com">Privacy policy</a>
					</li>
					<li>
						<a href="https://example.com">Sitemap</a>
					</li>
				</ul>
			</div>
		</footer>
	)
}

export default Footer
