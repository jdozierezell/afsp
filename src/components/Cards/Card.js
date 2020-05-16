import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const defaultCardCSS = css`
	position: relative;
	background-color: ${styles.colors.white};
	border-radius: ${styles.scale.px5};
	padding: ${styles.scale.px30} ${styles.scale.px54} ${styles.scale.px150};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px40} ${styles.scale.px40} ${styles.scale.px150};
	}
`

const titleCSS = css`
	font-size: ${styles.scale.px17};
	font-family: ${styles.fonts.avenirDemi};
	@media (min-width: ${styles.screens.mobile}px) {
		margin-bottom: ${styles.scale.px60};
	}
`

const cardCategoryCSS = css`
	font-size: ${styles.scale.px20};
	font-family: ${styles.fonts.avenirDemi};
	@media (min-width: ${styles.screens.mobile}px) {
		margin-bottom: ${styles.scale.px30};
	}
`

const cardBodyCSS = css`
	p {
		:last-of-type {
			margin-bottom: 0;
		}
	}
`

const ctaCSS = css`
	position: absolute;
	bottom: ${styles.scale.px40};
	@media (min-width: ${styles.screens.mobile}px) {
		bottom: ${styles.scale.px60};
	}
`

const Card = ({ card, cardCSS }) => {
	const {
		cardCategory,
		cardHeading,
		cardBodyNode,
		cardButtonCta,
		cardButtonUrl,
	} = card
	const cardBody = cardBodyNode.internal.content
	return (
		<div
			css={css`
				${defaultCardCSS};
				${cardCSS};
			`}
		>
			{cardCategory && <p css={cardCategoryCSS}>{cardCategory}</p>}
			<h2 css={titleCSS}>{cardHeading}</h2>
			<div
				css={cardBodyCSS}
				dangerouslySetInnerHTML={{ __html: cardBody }}
			></div>
			<a href={cardButtonUrl} className="secondary-button" css={ctaCSS}>
				{cardButtonCta}
			</a>
		</div>
	)
}

export default Card
