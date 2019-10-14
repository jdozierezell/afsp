import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const tableWrapperCSS = css`
	padding: ${styles.scale.px50} 0 ${styles.scale.px50} ${styles.scale.px24};
	background: ${styles.colors.white};
	width: 100vw - ${styles.scale.px24};
	overflow: scroll hidden;
	position: relative;
	z-index: 500;
	@media (min-width: ${styles.screens.tablet}px) {
		width: 100vw - (${styles.scale.px50} * 2);
		padding: ${styles.scale.px80} ${styles.scale.px50};
	}
`

const tableHeaderCSS = css`
	font-size: ${styles.scale.px36};
	margin-bottom: ${styles.scale.px45};
	@media (min-width: ${styles.screens.tablet}px) {
		margin-bottom: ${styles.scale.px80};
	}
`

const tableCSS = css`
	font-family: ${styles.fonts.avenirRegular};
	border-collapse: collapse;
	font-size: ${styles.scale.px17};
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

const Table = () => {
	return (
		<section css={tableWrapperCSS}>
			<h2 css={tableHeaderCSS}>Lorem ipsum</h2>
			<table css={tableCSS}>
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
						<td>Innovation Grants (6 categories: see below)</td>
						<td>
							None *Excluding Linked Standard Research Grants (See
							below)
						</td>
						<td>Nov.15, 2019</td>
						<td>Spring 2020</td>
						<td>End of May 2020</td>
						<td>
							July 2020 (Postdoc)
							<br />
							<br />
							October 2020 (All others)
						</td>
					</tr>
					<tr>
						<td>Focus Grants</td>
						<td>Aug.1, 2019</td>
						<td>Dec. 7 2019</td>
						<td>Spring 2020</td>
						<td>End of May 2020</td>
						<td>
							July 2020 (Postdoc)
							<br />
							<br />
							October 2020 (All others)
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	)
}

export default Table
