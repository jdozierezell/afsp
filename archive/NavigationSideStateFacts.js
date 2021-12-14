import React, { useRef, useEffect, useState } from 'react'
import { css } from '@emotion/react'

import EmailSignupSideBar from '../EmailSignup/EmailSignupSideBar'

import { styles } from '../../css/css'

const sideNavigationCSS = css`
	display: none;
	@media (min-width: ${styles.screens.video}px) {
		display: block;
		padding: ${styles.scale.px40} ${styles.scale.px50};
		background-color: ${styles.colors.white};
		width: 500px;
		right: 0;
		max-height: 100vh;
		overflow: auto;
	}
	h2 {
		margin-bottom: ${styles.scale.px30};
		font-family: ${styles.fonts.avenirBold};
		font-size: ${styles.scale.px20};
	}
	ul {
		margin: 0;
		list-style: none;
		li {
			margin-bottom: ${styles.scale.px24};
			:last-of-type {
				margin-bottom: 0;
			}
		}
		a {
			color: ${styles.colors.darkGray};
			line-height: ${styles.scale.px24};
		}
	}
`

const NavigationSide = ({ facts, topStart, slug }) => {
	const asideRef = useRef(null)
	const [position, setPosition] = useState('absolute')
	const [top, setTop] = useState('652px')
	const handleScroll = () => {
		const heightToFix = topStart ? topStart : 150
		if (
			asideRef.current.getBoundingClientRect().y <= 0 &&
			window.scrollY >= heightToFix
		) {
			setPosition('fixed')
			setTop(0)
		} else {
			setPosition('absolute')
			setTop('652px')
		}
	}
	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})
	facts.forEach(section => {
		if (section.main) {
			section = {
				display: section.main.display,
				anchor: section.main.anchor,
			}
		}
	})
	return (
		<aside
			css={css`
				${sideNavigationCSS};
				@media (min-width: ${styles.screens.video}px) {
					position: ${position};
					top: ${top};
				}
			`}
			ref={asideRef}
		>
			<h2>On this page</h2>
			<ul>
				{facts.map((section, index) => {
					return (
						<li key={index}>
							<a href={`/facts/${slug}#${section.anchor}`}>
								<span
									dangerouslySetInnerHTML={{
										__html: section.display,
									}}
								/>
							</a>
						</li>
					)
				})}
			</ul>
			<EmailSignupSideBar></EmailSignupSideBar>
		</aside>
	)
}

export default NavigationSide
