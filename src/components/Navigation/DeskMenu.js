import React from 'react'
import { css } from '@emotion/react'

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
	a {
		font-size: ${styles.scale.px16};
		font-family: ${styles.fonts.avenirBold};
		text-decoration: none;
		text-align: center;
		color: inherit;
		padding: 0 20px;
	}
`

const DeskMenu = ({ items, overrideLight }) => {
	return (
		<nav css={deskMenuCSS}>
			<ul css={menuCSS}>
				{items.map(item => (
					<DeskMenuSection
						key={item.id}
						id={item.id}
						menuItem={item}
						overrideLight={overrideLight}
					/>
				))}
			</ul>
		</nav>
	)
}

export default DeskMenu
