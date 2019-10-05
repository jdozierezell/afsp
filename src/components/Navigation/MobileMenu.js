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

const MenuItems = () => {
	return (
		<div css={menuCSS}>
			<MobileMenuSection title="Real Stories" />
			<MobileMenuSection title="Real Stories" />
			<MenuCTA width="100%" margin={`${styles.scale.px45} 0 0`} />
		</div>
	)
}

export default MenuItems
