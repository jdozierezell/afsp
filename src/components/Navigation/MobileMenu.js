import React from 'react'
import { css } from '@emotion/core'

import MobileMenuSection from './MobileMenuSection'
import MenuCTA from './MenuCTA'

import { styles } from '../../css/css'

const menuCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px50} ${styles.scale.px24} ${styles.scale.px35};
	width: 100%;
`

const MenuItems = ({ items }) => {
	items.forEach(item => {
		if (item.__typename !== 0) {
		}
	})
	return (
		<nav css={menuCSS}>
			{items.map(item => (
				<MobileMenuSection key={item.id} item={item} />
			))}
			<MenuCTA width="100%" margin={`${styles.scale.px45} 0 0`} />
		</nav>
	)
}

export default MenuItems
