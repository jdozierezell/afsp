import React from 'react'
import { css } from '@emotion/core'

import CaretIcon from './CaretIcon'

import { styles } from '../css/css'

const menuTitleCSS = css`
	display: flex;
	justify-content: space-between;
	height: ${styles.scale.px22};
	margin-bottom: ${styles.scale.px30};
	h2 {
		color: ${styles.colors.white};
		font-size: ${styles.scale.px18};
		margin: 0;
	}
`

const caretIconCSS = css`
	background-color: transparent;
	border: none;
	padding: 0;
	svg {
		width: ${styles.scale.px18};
	}
`

const MenuListCSS = css`
	list-style: none;
	margin: ${styles.scale.px60} 0;
	li {
		margin-bottom: ${styles.scale.px30};
	}
	li:first-child {
		margin-top: ${styles.scale.px60};
	}
	a {
		color: ${styles.colors.white};
		font-family: ${styles.fonts.paul};
		font-size: ${styles.scale.px18};
		text-decoration: solid underline ${styles.colors.white} 1px;
	}
`

const MenuSection = ({ title }) => {
	return (
		<div>
			<div css={menuTitleCSS}>
				<h2>{title}</h2>
				<button css={caretIconCSS}>
					<CaretIcon color={styles.colors.white} />
				</button>
			</div>
			<ul css={MenuListCSS}>
				<li>
					<a href="">Foo</a>
				</li>
				<li>
					<a href="">Bar</a>
				</li>
				<li>
					<a href="">Maj</a>
				</li>
				<li>
					<a href="">Apt</a>
				</li>
				<li>
					<a href="">Foo</a>
				</li>
			</ul>
			<hr
				css={css`
					border-top: 1px solid ${styles.colors.white};
					display: block;
					margin: ${styles.scale.px30} 0;
				`}
			/>
		</div>
	)
}

export default MenuSection
