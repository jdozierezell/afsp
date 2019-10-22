import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'
import createAnchor from '../../utils/createAnchor'

const tableWrapperCSS = css`
	padding: ${styles.scale.px50} 0;
	width: calc(100vw - ${styles.scale.px24});
	overflow: auto hidden;
	position: relative;
	z-index: 500;
	pointer-events: none;
	@media (min-width: ${styles.screens.tablet}px) {
		width: calc(100vw - (${styles.scale.px50} * 2));
		padding: ${styles.scale.px80} 0;
	}
`

const tableHeaderCSS = css`
	font-size: ${styles.scale.px36};
	margin-bottom: ${styles.scale.px22};
	@media (min-width: ${styles.screens.tablet}px) {
		margin-bottom: ${styles.scale.px56};
	}
`

const tableCSS = css`
	background: ${styles.colors.white};
	padding: ${styles.scale.px24} 0;
	pointer-events: auto;
	table {
		font-family: ${styles.fonts.avenirRegular};
		border-collapse: collapse;
		font-size: ${styles.scale.px17};
	}
	thead {
		font-family: ${styles.fonts.avenirBold};
		background-color: ${styles.colors.green};
		th {
			padding: ${styles.scale.px12};
			@media (min-width: ${styles.screens.tablet}px) {
				border: 1px solid ${styles.colors.white};
			}
			:first-of-type {
				border-right: 1px solid ${styles.colors.white};
			}
		}
	}
	tbody {
		td {
			min-width: 200px;
			padding: ${styles.scale.px12};
			border: none;
			border-bottom: 1px solid ${styles.colors.darkGray};
			@media (min-width: ${styles.screens.tablet}px) {
				border: 1px solid ${styles.colors.darkGray};
			}
			:first-of-type {
				border-right: 1px solid ${styles.colors.darkGray};
				background-color: hsla(156, 69%, 50.6%, 0.15);
				font-family: ${styles.fonts.avenirBold};
				@media (min-width: ${styles.screens.tablet}px) {
					border: 1px solid ${styles.colors.darkGray};
					border-left: none;
				}
			}
			:last-of-type {
				border-right: none;
			}
		}
	}
`

const Table = ({ tableHeading, tableBody }) => {
	return (
		<div css={tableWrapperCSS} id={createAnchor(tableHeading)}>
			<h2 css={tableHeaderCSS}>{tableHeading}</h2>
			<div
				css={tableCSS}
				dangerouslySetInnerHTML={{ __html: tableBody }}
			></div>
		</div>
	)
}

export default Table
