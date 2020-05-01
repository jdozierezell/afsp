import React from 'react'
import { css } from '@emotion/core'

import DeskMenuSection from './DeskMenuSection'

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
		font-size: ${styles.scale.px16};
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
					<DeskMenuSection
						key={item.id}
						id={item.id}
						menuItem={item}
					/>
				))}
			</ul>
		</nav>
	)
}

export default DeskMenu
