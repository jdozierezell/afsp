import React, { useEffect } from 'react'
import { css } from '@emotion/core'

import Card from '../Cards/Card'

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

const CardContainer = ({ title, data, cardCSS }) => {
	return (
		<section css={cardContainerCSS}>
			{title && <h2>{title}</h2>}
			<ul css={cardListCSS}>
				{data.map((state, index) => {
					return (
						<Card
							key={index}
							title={state.title}
							cta="View state fact sheet"
							cardCSS={cardCSS}
						/>
					)
				})}
			</ul>
		</section>
	)
}

export default CardContainer
