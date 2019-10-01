import React from 'react'

import { css } from '@emotion/core'

import menuItems from './MenuItems'

import { styles } from '../../css/css'

const megaCSS = css`
	width: 100%;
	background-color: ${styles.colors.blue};
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(3, 1fr);
	padding: ${styles.scale.px50};
	position: absolute;
	top: 100%;
`

const featuredCSS = css`
	grid-area: 1 / 3 / 4 / 5;
	background: white;
`

const DeskMenuMega = ({
	items,
	activeItem,
	handleMouseEnter,
	handleMouseLeave,
}) => {
	return (
		<>
			{activeItem && (
				<div
					css={megaCSS}
					handleMouseEnter={handleMouseEnter(activeItem)}
					handleMouseLeave={handleMouseLeave(activeItem)}
				>
					{items.map(item => {
						console.log(activeItem)
						if (item.id === activeItem) {
							return item.links.map((link, index) => (
								<div key={index}>{link.name}</div>
							))
						}
					})}
					<div css={featuredCSS}>{activeItem}</div>
				</div>
			)}
		</>
	)
}

export default DeskMenuMega
