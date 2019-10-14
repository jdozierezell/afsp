import React, { useRef, useEffect, useState } from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const sideNavigationCSS = css`
	padding: ${styles.scale.px50} ${styles.scale.px24};
	background-color: ${styles.colors.lightGray};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px50} ${styles.scale.px50};
		background-color: ${styles.colors.white};
	}
	@media (min-width: ${styles.screens.navigation}px) {
		padding: ${styles.scale.px40} ${styles.scale.px50};
		width: 500px;
		right: 0;
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

const NavigationSide = () => {
	const asideRef = useRef(null)
	const [position, setPosition] = useState('absolute')
	const [top, setTop] = useState('220px')
	const handleScroll = () => {
		if (
			asideRef.current.getBoundingClientRect().y <= 0 &&
			window.scrollY >= 150
		) {
			setPosition('fixed')
			setTop(0)
		} else {
			setPosition('absolute')
			setTop('220px')
		}
	}
	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])
	return (
		<aside
			css={css`
				${sideNavigationCSS};
				@media (min-width: ${styles.screens.navigation}px) {
					position: ${position};
					top: ${top};
				}
			`}
			ref={asideRef}
		>
			<h2>In this section</h2>
			<ul>
				<li>
					<a href="">Do the police have to get involved?</a>
				</li>
				<li>
					<a href="">Can I/do I have to view the body?</a>
				</li>
				<li>
					<a href="">Will there to be an autopsy?</a>
				</li>
				<li>
					<a href="">What do I tell people about what happened?</a>
				</li>
				<li>
					<a href="">What do I tell my children?</a>
				</li>
				<li>
					<a href="">
						What do I need to know about planning the funeral?
					</a>
				</li>
				<li>
					<a href="">
						In my loved one’s obituary, do I have to say the death
						was a suicide?
					</a>
				</li>
			</ul>
		</aside>
	)
}

export default NavigationSide
