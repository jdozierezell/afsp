import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'

import buildUrl from '../../utils/buildUrl'

import { styles } from '../../css/css'

const menuCSS = css`
	list-style: none;
	margin: 0;
	padding: 0;
	flex-grow: 1;
	& > li {
		display: table-cell;
		vertical-align: middle;
		height: 105px;
		:hover {
			background-color: ${styles.colors.blue};
			color: ${styles.colors.white};
		}
	}
	a {
		font-size: ${styles.scale.px17};
		font-family: ${styles.fonts.avenirBold};
		text-decoration: none;
		color: inherit;
		padding: 0 20px;
	}
`

const megaCSS = css`
	width: 100%;
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
`

const megaLinkCSS = css`
	list-style: none;
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
	min-height: 300px;
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

const DeskMenu = ({
	deskMenuCSS,
	items,
	activeItem,
	handleMouseEnter,
	handleMouseLeave,
}) => {
	return (
		<nav css={deskMenuCSS}>
			<ul css={menuCSS}>
				{items.map((item, index) => {
					const url = buildUrl(
						item.displayLink.__typename,
						item.displayLink.slug
					)
					return (
						<li
							key={index}
							id={item.id}
							onMouseEnter={e => handleMouseEnter(e, item.id)}
							onMouseLeave={() => handleMouseLeave()}
						>
							<Link to={url}>{item.displayTitle}</Link>
							{activeItem === item.id &&
								item.navigationItem.length >= 1 && (
									<ul css={megaCSS}>
										{item.navigationItem.map(
											(link, index) => {
												if (
													link.__typename ===
													'DatoCmsChildItem'
												) {
													const url = link.childLink
														? buildUrl(
																link.childLink
																	.__typename,
																link.childLink
																	.slug
														  )
														: link.childExternalLink
													return (
														<li
															css={megaLinkCSS}
															key={index}
														>
															{link.childLink && (
																<Link to={url}>
																	{
																		link.childHeading
																	}
																</Link>
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
													return ''
												}
											}
										)}
									</ul>
								)}
						</li>
					)
				})}
			</ul>
		</nav>
	)
}

export default DeskMenu
