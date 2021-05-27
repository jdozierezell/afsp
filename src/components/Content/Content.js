import React from 'react'
import { css } from '@emotion/react'

import { styles } from '../../css/css'
import createAnchor from '../../utils/createAnchor'

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

const contentBodyCSS = css`
	.content-table {
		width: calc(100vw - ${styles.scale.px24});
		overflow: auto hidden;
		position: relative;
		z-index: 500;
		pointer-events: none;
		background-color: ${styles.colors.white};
		@media (min-width: ${styles.screens.tablet}px) {
			width: calc(100vw - (${styles.scale.px50} * 2));
		}
	}
	.table-plain {
		th {
			border: none;
		}
		td {
			border: none;
			:first-of-type {
				background-color: ${styles.colors.white};
				font-family: ${styles.fonts.avenirRegular};
				@media (min-width: ${styles.screens.tablet}px) {
					border: none;
				}
			}
		}
	}
	.td-two {
		width: 50%;
	}
	table {
		background: ${styles.colors.white};
		padding: ${styles.scale.px24} 0;
		pointer-events: auto;
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
	blockquote {
		border-left: ${styles.scale.px12} solid ${styles.colors.lightGray};
		margin-left: 0;
		padding-left: ${styles.scale.px20};
	}
`

const Content = ({ contentHeading, contentBody }) => {
	return (
		<div>
			{contentHeading && (
				<h2
					css={contentHeadingCSS}
					id={createAnchor(contentHeading)}
					dangerouslySetInnerHTML={{ __html: contentHeading }}
				></h2>
			)}
			<div
				css={contentBodyCSS}
				dangerouslySetInnerHTML={{
					__html: contentBody,
				}}
			></div>
		</div>
	)
}

export default Content
