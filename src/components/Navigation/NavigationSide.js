import React, { useRef, useEffect, useState } from 'react'
import { css } from '@emotion/core'

import EmailSignupSideBar from '../EmailSignup/EmailSignupSideBar'

import createAnchor from '../../utils/createAnchor'

import { styles } from '../../css/css'

const sideNavigationCSS = css`
	padding: ${styles.scale.px50} ${styles.scale.px24};
	background-color: ${styles.colors.lightGray};
	max-height: 100vh;
	overflow: auto;
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

const NavigationSide = ({
	data,
	beforeAnchors,
	afterAnchors,
	navRoot,
	hasEvents,
}) => {
	let headings = []
	if (beforeAnchors) {
		beforeAnchors.map(anchor => {
			anchor = createAnchor(anchor)
			headings.push(anchor)
			return ''
		})
	}
	data.details.map(detail => {
		if (detail.__typename === 'DatoCmsContent') {
			if (detail.contentHeading) {
				const anchor = createAnchor(detail.contentHeading)
				headings.push({ heading: detail.contentHeading, anchor })
			}
		} else if (detail.__typename === 'DatoCmsTable') {
			const anchor = createAnchor(detail.tableHeading)
			headings.push({ heading: detail.tableHeading, anchor })
		} else if (detail.__typename === 'DatoCmsCardContainer') {
			const anchor = createAnchor(detail.cardContainerHeading)
			headings.push({ heading: detail.cardContainerHeading, anchor })
		} else if (
			detail.__typename === 'DatoCmsHeading' &&
			detail.headingLevel === 'Level 2 (will be included in sidebar)'
		) {
			const anchor = createAnchor(detail.heading)
			headings.push({ heading: detail.heading, anchor })
		} else if (detail.__typename === 'DatoCmsFeaturedStoryTag') {
			const anchor = createAnchor(detail.tag.tag)
			headings.push({
				heading: `${detail.tag.tag}s`,
				anchor: `${anchor}s`,
			})
		} else if (detail.__typename === 'DatoCmsEventList' && hasEvents) {
			const anchor = createAnchor(detail.programName)
			headings.push({
				heading: `Upcoming ${detail.programName} events`,
				anchor: `${anchor}-events`,
			})
		} else if (detail.__typename === 'search') {
			const anchor = createAnchor(detail.searchHeading)
			headings.push({ heading: detail.searchHeading, anchor })
		} else if (detail.__typename === 'DatoCmsImageSectionHeader') {
			const anchor = createAnchor(detail.header)
			headings.push({ heading: detail.header, anchor })
		}
		return headings
	})

	if (afterAnchors) {
		afterAnchors.map(anchor => {
			const heading = anchor
			anchor = createAnchor(anchor)
			headings.push({ heading, anchor })
			return ''
		})
	}

	const asideRef = useRef(null)
	const [position, setPosition] = useState('absolute')
	const [top, setTop] = useState('220px')
	const handleScroll = () => {
		if (headings.length > 1) {
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
	}
	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})
	if (headings.length > 1) {
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
					{headings.map((heading, index) => (
						<li key={index}>
							{navRoot ? (
								<a href={`${navRoot}#${heading.anchor}`}>
									<span
										dangerouslySetInnerHTML={{
											__html: heading.heading,
										}}
									/>
								</a>
							) : (
								<a href={`/${data.slug}#${heading.anchor}`}>
									<span
										dangerouslySetInnerHTML={{
											__html: heading.heading,
										}}
									/>
								</a>
							)}
						</li>
					))}
				</ul>
				<EmailSignupSideBar></EmailSignupSideBar>
			</aside>
		)
	} else {
		return ''
	}
}

export default NavigationSide
