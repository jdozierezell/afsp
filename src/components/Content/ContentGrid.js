import React from 'react'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

const ContentGrid = ({ hideHeader, table }) => {
	const tableCss = css`
		background: ${styles.colors.white};
		padding: ${styles.scale.px24} 0;
		pointer-events: auto;
		width: calc(100vw - ${styles.scale.px24});
		overflow: auto hidden;
		position: relative;
		z-index: 500;
		pointer-events: none;
		background-color: ${styles.colors.white};
		@media (min-width: ${styles.screens.tablet}px) {
			width: calc(100vw - (${styles.scale.px50} * 2));
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
			vertical-align: initial;
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

	const tableJSON = JSON.parse(table)
	let columnContents = []
	let dataContents = []
	let gridItems = []
	if (!hideHeader) {
		tableJSON.columns.forEach(column => {
			columnContents.push({ isColumn: true, value: column })
		})
		gridItems.push(columnContents)
	}
	tableJSON.data.forEach(data => {
		let rowContents = []
		tableJSON.columns.forEach(column => {
			if (data.hasOwnProperty(column)) {
				rowContents.push({ isColumn: false, value: data[column] })
			}
		})
		dataContents.push(rowContents)
	})
	gridItems.push(...dataContents)
	console.log(gridItems)

	const gridCssMobile = css`
		display: grid;
		@media (min-width: ${styles.screens.tablet}px) {
			display: none;
		}
	`

	const gridCssDesktop = css`
		display: none;
		@media (min-width: ${styles.screens.tablet}px) {
			display: grid;
			grid-template-columns: repeat(${tableJSON.columns.length}, 1fr);
			width: calc(100vw - (${styles.scale.px50} * 2));
			position: relative;
			z-index: 500;
			background-color: ${styles.colors.white};
		}
	`

	const columnCss = css`
		background-color: ${styles.colors.green};
		border: 1px solid ${styles.colors.white};
		font-family: ${styles.fonts.avenirDemi};
		font-size: ${styles.scale.px16};
		margin: 0;
		padding: ${styles.scale.px12};
	`

	const rowCss = css`
		border-bottom: 1px solid ${styles.colors.darkGray};
		border-left: 1px solid ${styles.colors.darkGray};
		font-family: ${styles.fonts.avenirRegular};
		margin: 0;
		padding: ${styles.scale.px12};
		&[data-row-number='0'] {
			border-top: 1px solid ${styles.colors.darkGray};
		}
		&[data-column-number='0'] {
			border-left: none;
			background-color: hsla(156, 69%, 50.6%, 0.15);
			font-family: ${styles.fonts.avenirBold};
		}
	`
	console.log(gridItems)
	return (
		<div>
			<div css={gridCssMobile}>
				{gridItems.map((items, rowIndex) => {
					return items.map((item, columnIndex) => {
						return (
							<div
								key={rowIndex + columnIndex}
								data-rows={tableJSON.data.length}
								data-row-number={rowIndex}
								data-columns={tableJSON.columns.length}
								data-column-number={columnIndex}
								css={
									item.isColumn === true ? columnCss : rowCss
								}
								dangerouslySetInnerHTML={{ __html: item.value }}
							></div>
						)
					})
				})}
			</div>
			<div css={gridCssDesktop}>
				{gridItems.map((items, rowIndex) => {
					return items.map((item, columnIndex) => {
						return (
							<div
								key={rowIndex + columnIndex}
								data-rows={tableJSON.data.length}
								data-row-number={rowIndex}
								data-columns={tableJSON.columns.length}
								data-column-number={columnIndex}
								css={
									item.isColumn === true ? columnCss : rowCss
								}
								dangerouslySetInnerHTML={{ __html: item.value }}
							></div>
						)
					})
				})}
			</div>
			<div css={tableCss}>
				<table>
					<thead>
						<tr>
							<th>Review Cycle</th>
							<th>Letter of Intent Due</th>
							<th>Due Date</th>
							<th>Review Dates</th>
							<th>Funding Decisions</th>
							<th>Earliest Start Date</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								Innovation Grants (six categories: see below)
							</td>
							<td>
								None
								<br />* Excluding Linked Standard Research
								Grants (see below)
							</td>
							<td>Nov. 15, 2021</td>
							<td>Spring 2022</td>
							<td>End of May 2022</td>
							<td>October 2022</td>
						</tr>
						<tr>
							<td>Focus Grants</td>
							<td>Aug. 1, 2021, 11:59 p.m. EDT</td>
							<td>Dec. 7, 2021</td>
							<td>Spring 2022</td>
							<td>End of May 2022</td>
							<td>October 2022</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ContentGrid
