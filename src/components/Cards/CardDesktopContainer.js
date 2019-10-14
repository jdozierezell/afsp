import React, { useEffect } from 'react'
import { css } from '@emotion/core'

import Card from './Card'

import { styles } from '../../css/css'

const cardContainerCSS = css`
	padding: ${styles.scale.px80} ${styles.scale.px50};
	background-color: ${styles.colors.lightGray};
	position: relative;
	z-index: 500;
`

const cardListCSS = css`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: ${styles.gridGap.desktop};
	margin: 0;
`

const CardContainer = ({ title, data }) => {
	return (
		<section css={cardContainerCSS}>
			<h2>{title}</h2>
			<ul css={cardListCSS}>
				{data.map((chapter, index) => {
					return (
						<Card key={index} title="Grant type" cta="Apply now" />
					)
				})}
			</ul>
		</section>
	)
}

export default CardContainer
