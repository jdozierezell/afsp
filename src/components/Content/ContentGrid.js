import React from 'react'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

const ContentGrid = ({ hideHeader, table }) => {
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
	console.log(table)
	table.data.forEach(data => {
		let rowContents = []
		if (hideHeader) {
			table.columns.forEach((column, index) => {
				if (data.hasOwnProperty(column)) {
					rowContents.push({
						isHeader: false,
						value: data[column],
						hasLastValue: data[column] !== '' ? true : false,
					})
				}
				if (rowContents.length > 1 && data[column] !== '') {
					rowContents[index - 1].hasLastValue = false
				}
			})
		} else if (!hideHeader) {
			table.columns.forEach((column, index) => {
				if (data.hasOwnProperty(column)) {
					rowContents.push({
						isHeader: true,
						value: column,
						display: 'mobile',
						empty: data[column] !== '' ? false : true,
						hasLastValue: data[column] !== '' ? true : false,
					})
					rowContents.push({
						isHeader: false,
						value: data[column],
						empty: data[column] !== '' ? false : true,
						hasLastValue: data[column] !== '' ? true : false,
					})
				}
				if (rowContents.length > 2 && data[column] !== '') {
					rowContents[rowContents.length - 3].hasLastValue = false
					rowContents[rowContents.length - 4].hasLastValue = false
				}
			})
		}
		console.log(rowContents)
		dataContents.push(rowContents)
	})
	gridItems.push(...dataContents)

	const gridCssDesktop = css`
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

	const columnCss = css`
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

	const rowCss = css`
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

	return (
		<>
			{/* <div css={gridCssMobile}>
				{gridItems.map((items, rowIndex) => {
					return items.map((item, columnIndex) => {
						return (
							<div
								css={
									item.isHeader === true ? columnCss : rowCss
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
								}`}
								key={rowIndex + columnIndex}
							></div>
						)
					})
				})}
			</div> */}
			<div css={gridCssDesktop}>
				{gridItems.map((items, rowIndex) => {
					console.log(items.length)
					return items.map((item, columnIndex) => {
						return (
							<div
								css={
									item.isHeader === true ? columnCss : rowCss
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
