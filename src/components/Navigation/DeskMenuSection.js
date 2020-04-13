import React, { useState, useRef, useEffect } from 'react'
import { css } from '@emotion/core'
import { useTransition, animated as a } from 'react-spring'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import buildUrl from '../../utils/buildUrl'

import { styles } from '../../css/css'

const megaCSS = css`
	width: 100%;
	position: relative;
	z-index: 0;
	background-color: ${styles.colors.blue};
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(3, 1fr);
	padding: ${styles.scale.px50};
	position: absolute;
	top: 100%;
	right: 0;
	margin: 0;
	font-size: ${styles.scale.px17};
	min-height: 350px;
	max-height: 400px;
`

const megaLinkCSS = css`
	list-style: none;
	color: ${styles.colors.white};
	margin: 0 0 ${styles.scale.px50};
	a {
		font-family: ${styles.fonts.avenirBold};
		text-decoration: underline;
		padding: 0 ${styles.scale.px24} 0 0;
	}
`

const featuredCSS = css`
	grid-area: 1 / 3 / 4 / 5;
	list-style: none;
	position: relative;
	color: ${styles.colors.white};
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	height: 300px;
	h5 {
		margin: ${styles.scale.px35} ${styles.scale.px25} ${styles.scale.px25};
		font-size: ${styles.scale.px18};
		color: ${styles.colors.white};
	}
	h3 {
		margin: 0 ${styles.scale.px25} ${styles.scale.px60};
		color: ${styles.colors.white};
	}
	a {
		font-size: ${styles.scale.px18};
		font-family: ${styles.fonts.avenirDemi};
	}
`

const DeskMenuSection = ({ menuItem, id }) => {
	const [showMenu, setShowMenu] = useState(false)
	const transitions = useTransition(showMenu, null, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	})
	return (
		<>
			<li
				onMouseEnter={() => setShowMenu(true)}
				onMouseLeave={() => setShowMenu(false)}
			>
				<AniLink
					fade
					duration={styles.duration}
					to={buildUrl(
						menuItem.displayLink.__typename,
						menuItem.displayLink.slug
					)}
				>
					{menuItem.displayTitle}
				</AniLink>
				{menuItem.navigationItem.length >= 1 &&
					transitions.map(
						({ item, key, props }) =>
							item && (
								<a.ul
									css={css`
										${megaCSS};
									`}
									key={key}
									style={props}
								>
									{menuItem.navigationItem.map(
										(link, index) => {
											if (
												link.__typename ===
												'DatoCmsChildItem'
											) {
												const url = link.childLink
													? buildUrl(
															link.childLink
																.__typename,
															link.childLink.slug
													  )
													: link.childExternalLink
												return (
													<li
														key={index}
														css={megaLinkCSS}
													>
														{link.childLink && (
															<AniLink
																fade
																duration={
																	styles.duration
																}
																to={url}
															>
																{
																	link.childHeading
																}
															</AniLink>
														)}
														{!link.childLink && (
															<a
																href={url}
																target="_blank"
																rel="noopener noreferrer"
															>
																{
																	link.childHeading
																}
															</a>
														)}
													</li>
												)
											} else if (
												link.__typename ===
												'DatoCmsFeaturedItem'
											) {
												return (
													<li
														css={css`
															${featuredCSS};
															background-image: url(${`${link.featuredLink.seo.image.url}?w=768&h=475&fit=crop&crop=faces&q=30`});
														`}
														key={index}
													>
														<h5>Featured</h5>
														<h3>
															{
																link.featuredHeading
															}
														</h3>
														<a
															href={
																link
																	.featuredLink
																	.slug
															}
														>
															Learn more
														</a>
													</li>
												)
											} else {
												return
											}
										}
									)}
								</a.ul>
							)
					)}
			</li>
		</>
	)
}

export default DeskMenuSection
