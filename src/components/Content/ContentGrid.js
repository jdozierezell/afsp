import React from 'react'
import { css } from '@emotion/react'

import { styles } from '../../css/css'
import createAnchor from '../../utils/createAnchor'

const ContentGrid = ({ hideHeader, table, tableHeader }) => {
	let columnContents = []
	let dataContents = []
	let gridItems = []
	if (!hideHeader) {
		table.columns.forEach(column => {
			columnContents.push({
				isHeader: true,
				value: column,
				display: 'desktop',
			})
		})
		gridItems.push(columnContents)
	}
	table.data.forEach((data, rowIndex) => {
		let rowContents = []
		if (hideHeader) {
			table.columns.forEach((column, columnIndex) => {
				let row
				if (data.hasOwnProperty(column)) {
					row = {
						isHeader: false,
						value: data[column],
						empty: data[column] !== '' ? false : true,
					}
				}

				if (rowIndex + 1 === table.data.length) {
					if (
						!row.empty &&
						columnIndex + 1 === table.columns.length
					) {
						row.hasLastValue = true
					} else if (!row.empty) {
						for (
							let i = columnIndex;
							i + 1 < table.columns.length;
							i++
						) {
							if (data[table.columns[i + 1]] !== '') {
								break
							} else {
								row.hasLastValue = true
							}
						}
					}
				}
				rowContents.push(row)
			})
		} else if (!hideHeader) {
			table.columns.forEach((column, columnIndex) => {
				let mobile, desktop
				if (data.hasOwnProperty(column)) {
					mobile = {
						isHeader: true,
						value: column,
						display: 'mobile',
						empty: data[column] !== '' ? false : true,
						hasLastValue: data[column] !== '' ? true : false,
					}
					desktop = {
						isHeader: false,
						value: data[column],
						empty: data[column] !== '' ? false : true,
						hasLastValue: data[column] !== '' ? true : false,
					}
					rowContents.push(mobile, desktop)
				}

				if (rowContents.length > 2) {
					rowContents[rowContents.length - 3].hasLastValue = false
					rowContents[rowContents.length - 4].hasLastValue = false
				}
			})
		}
		dataContents.push(rowContents)
	})
	gridItems.push(...dataContents)

	const gridCSSDesktop = css`
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		padding: ${styles.scale.px24} 0;
		@media (min-width: ${styles.screens.navigation}px) {
			background-color: ${styles.colors.white};
			display: grid;
			grid-template-columns: repeat(${table.columns.length}, 1fr);
			padding: ${styles.scale.px24} 0;
			position: relative;
			width: calc(100vw - (${styles.scale.px50} * 2));
			z-index: 500;
		}
		@media (max-width: ${styles.screens.navigation - 1}px) {
			& div[data-grid~='last'] {
				border-bottom: none;
			}
			& div[data-grid~='empty'] {
				display: none;
			}
		}
	`

	const columnCSS = css`
		font-family: ${styles.fonts.avenirDemi};
		font-size: ${styles.scale.px16};
		margin: 0;
		padding: ${styles.scale.px12};
		@media (max-width: ${styles.screens.navigation - 1}px) {
			background-color: hsla(156, 69%, 50.6%, 0.15);
			border-bottom: 1px solid ${styles.colors.darkGray};
			grid-column: 1;
			&[data-grid~='desktop'] {
				display: none;
			}
			&[data-grid*='-0'] {
				display: none;
			}
		}
		@media (min-width: ${styles.screens.navigation}px) {
			background-color: ${styles.colors.green};
			border: 1px solid ${styles.colors.white};
			&[data-grid~='mobile'] {
				display: none;
			}
		}
	`

	const rowCSS = css`
		border-bottom: 1px solid ${styles.colors.darkGray};
		font-family: ${styles.fonts.avenirRegular};
		margin: 0;
		padding: ${styles.scale.px12};
		@media (max-width: ${styles.screens.navigation - 1}px) {
			grid-column: 2 / 3;
		}
		@media (min-width: ${styles.screens.navigation}px) {
			border-left: 1px solid ${styles.colors.darkGray};
			&[data-row-number='0'] {
				border-top: 1px solid ${styles.colors.darkGray};
			}
		}
		&[data-grid*='-0 hide-header'] {
			border-left: none;
			background-color: hsla(156, 69%, 50.6%, 0.15);
			font-family: ${styles.fonts.avenirBold};
			@media (max-width: ${styles.screens.navigation - 1}px) {
				background-color: ${styles.colors.green};
				border-bottom: none;
				grid-column: 1 / 3;
			}
		}
		&[data-grid*='hide-header row 0-'] {
			@media (min-width: ${styles.screens.navigation}px) {
				border-top: 1px solid ${styles.colors.darkGray};
			}
		}
		&[data-grid*='-1 show-header'] {
			border-left: none;
			background-color: hsla(156, 69%, 50.6%, 0.15);
			font-family: ${styles.fonts.avenirBold};
			@media (max-width: ${styles.screens.navigation - 1}px) {
				background-color: ${styles.colors.green};
				border-bottom: none;
				grid-column: 1 / 3;
			}
		}
		&[data-grid~='hide-header'] {
			@media (max-width: ${styles.screens.navigation - 1}px) {
				grid-column: 1 / 3;
			}
		}
	`
	const contentHeadingCSS = css`
		font-size: ${styles.scale.px36};
		margin: ${styles.scale.px50} 0 ${styles.scale.px35};
		@media (min-width: ${styles.screens.mobile}px) {
			margin: ${styles.scale.px80} 0 ${styles.scale.px40};
		}
		a {
			font-family: ${styles.fonts.paul};
			font-size: ${styles.scale.px36};
		}
	`

	return (
		<>
			{tableHeader && (
				<h2 css={contentHeadingCSS} id={createAnchor(tableHeader)}>
					{tableHeader}
				</h2>
			)}
			<div css={gridCSSDesktop}>
				{gridItems.map((items, rowIndex) => {
					return items.map((item, columnIndex) => {
						return (
							<div
								css={
									item.isHeader === true ? columnCSS : rowCSS
								}
								dangerouslySetInnerHTML={{
									__html: item.value,
								}}
								data-grid={`${
									hideHeader ? 'hide-header' : 'show-header'
								} ${
									item.isHeader ? 'column' : 'row'
								} ${rowIndex}-${columnIndex} ${
									hideHeader ? 'hide-header' : 'show-header'
								} ${item.display ? item.display : ''} ${
									item.hasLastValue === true ? 'last' : ''
								} ${item.empty ? 'empty' : ''}`}
								key={rowIndex + columnIndex}
							></div>
						)
					})
				})}
			</div>
		</>
	)
}

export default ContentGrid
