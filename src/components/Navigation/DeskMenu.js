import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import DeskMenuSection from './DeskMenuSection'

import buildUrl from '../../utils/buildUrl'

import { styles } from '../../css/css'

const deskMenuCSS = css`
	display: none;
	@media (min-width: ${styles.screens.navigation}px) {
		display: initial;
	}
`

const menuCSS = css`
	display: grid;
	grid-template-columns: repeat(5, auto);
	list-style: none;
	margin: 0;
	padding: 0;
	flex-grow: 1;
	& > li {
		line-height: 6rem;
		height: 105px;
		margin: 0;
		:hover {
			background-color: ${styles.colors.blue};
			color: ${styles.colors.white};
		}
	}
	a {
		font-size: ${styles.scale.px17};
		font-family: ${styles.fonts.avenirBold};
		text-decoration: none;
		text-align: center;
		color: inherit;
		padding: 0 20px;
	}
`

const DeskMenu = ({ items }) => {
	return (
		<nav css={deskMenuCSS}>
			<ul css={menuCSS}>
				{items.map(item => (
					<DeskMenuSection key={item.id} id={item.id} item={item} />
				))}
			</ul>
		</nav>
	)
}

// const DeskMenu = ({
// 	deskMenuCSS,
// 	items,
// 	activeItem,
// 	handleMouseEnter,
// 	handleMouseLeave,
// }) => {
// 	return (
// 		<nav css={deskMenuCSS}>
// 			<ul css={menuCSS}>
// 				{items.map((item, index) => {
// 					const url = buildUrl(
// 						item.displayLink.__typename,
// 						item.displayLink.slug
// 					)
// 					return (
// 						<li
// 							key={index}
// 							id={item.id}
// 							onMouseEnter={e => handleMouseEnter(e, item.id)}
// 							onMouseLeave={() => handleMouseLeave()}
// 						>
// 							<AniLink fade duration={styles.duration} to={url}>
// 								{item.displayTitle}
// 							</AniLink>
// 							{activeItem === item.id &&
// 								item.navigationItem.length >= 1 && (
// 									<ul css={megaCSS}>
// 										{item.navigationItem.map(
// 											(link, index) => {
// 												if (
// 													link.__typename ===
// 													'DatoCmsChildItem'
// 												) {
// 													const url = link.childLink
// 														? buildUrl(
// 																link.childLink
// 																	.__typename,
// 																link.childLink
// 																	.slug
// 														  )
// 														: link.childExternalLink
// 													return (
// 														<li
// 															css={megaLinkCSS}
// 															key={index}
// 														>
// 															{link.childLink && (
// 																<AniLink
// 																	fade
// 																	duration={1}
// 																	to={url}
// 																>
// 																	{
// 																		link.childHeading
// 																	}
// 																</AniLink>
// 															)}
// 															{!link.childLink && (
// 																<a
// 																	href={url}
// 																	target="_blank"
// 																	rel="noopener noreferrer"
// 																>
// 																	{
// 																		link.childHeading
// 																	}
// 																</a>
// 															)}
// 														</li>
// 													)
// 												} else if (
// 													link.__typename ===
// 													'DatoCmsFeaturedItem'
// 												) {
// 													return (
// 														<li
// 															css={css`
// 																${featuredCSS};
// 																background-image: url(${`${link.featuredLink.seo.image.url}?w=768&h=475&fit=crop&crop=faces&q=30`});
// 															`}
// 															key={index}
// 														>
// 															<h5>Featured</h5>
// 															<h3>
// 																{
// 																	link.featuredHeading
// 																}
// 															</h3>
// 															<a
// 																href={
// 																	link
// 																		.featuredLink
// 																		.slug
// 																}
// 															>
// 																Learn more
// 															</a>
// 														</li>
// 													)
// 												} else {
// 													return ''
// 												}
// 											}
// 										)}
// 									</ul>
// 								)}
// 						</li>
// 					)
// 				})}
// 			</ul>
// 		</nav>
// 	)
// }

export default DeskMenu
