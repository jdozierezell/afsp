import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const menuCSS = css`
	list-style: none;
	margin: 0;
	padding: 0;
	flex-grow: 1;
	& > li {
		display: table-cell;
		vertical-align: middle;
		height: 100px;
		:hover {
			background-color: ${styles.colors.blue};
			color: ${styles.colors.white};
		}
	}
	a {
		font-size: ${styles.scale.px17};
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
		font-family: ${styles.fonts.avenirDemi};
		text-decoration: underline;
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
	h5 {
		margin: ${styles.scale.px35} ${styles.scale.px25} ${styles.scale.px25};
		font-size: ${styles.scale.px18};
	}
	h3 {
		margin: 0 ${styles.scale.px25} ${styles.scale.px60};
	}
	a {
		font-size: ${styles.scale.px18};
		font-family: ${styles.fonts.avenirDemi};
	}
`

const MenuItems = ({
	items,
	activeItem,
	handleMouseEnter,
	handleMouseLeave,
}) => {
	return (
		<>
			<ul css={menuCSS}>
				{items.map(item => {
					const featuredImage = item.featured.img
					return (
						<li
							key={item.id}
							id={item.id}
							onMouseEnter={() => handleMouseEnter(item.id)}
							onMouseLeave={() => handleMouseLeave(item.id)}
						>
							<a href="https://example.com">{item.name}</a>
							{activeItem === item.id && (
								<>
									<ul css={megaCSS}>
										{item.links.map((link, index) => (
											<li css={megaLinkCSS} key={index}>
												<a href={link.url}>
													{link.name}
												</a>
											</li>
										))}
										<li
											css={css`
												${featuredCSS};
												background-image: url(${featuredImage});
											`}
										>
											<h5>Featured</h5>
											<h3>{item.featured.name}</h3>
											<a href="https://example.com">
												Learn more
											</a>
										</li>
									</ul>
								</>
							)}
						</li>
					)
				})}
			</ul>
		</>
	)
}

export default MenuItems
