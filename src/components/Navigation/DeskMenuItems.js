import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const menuCSS = css`
	list-style: none;
	margin: 0;
	padding: 0;
	flex-grow: 1;
	li {
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
		font-family: ${styles.fonts.avenirRegular};
		text-decoration: none;
		color: inherit;
		padding: 0 20px;
	}
`

const MenuItems = ({ items, handleMouseEnter, handleMouseLeave }) => {
	return (
		<>
			<ul css={menuCSS}>
				{items.map(item => {
					return (
						<li
							key={item.id}
							id={item.id}
							onMouseEnter={() => handleMouseEnter(item.id)}
							onMouseLeave={() => handleMouseLeave(item.id)}
						>
							<a href="#">{item.name}</a>
						</li>
					)
				})}
			</ul>
		</>
	)
}

export default MenuItems
