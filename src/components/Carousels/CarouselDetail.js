import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'

import { styles } from '../../css/css'

const carouselComponentCSS = css`
	margin: 0 ${styles.gridGap.desktop} 0 0;
	background-color: ${styles.colors.white};
	padding: ${styles.scale.px35} ${styles.scale.px24} ${styles.scale.px75};
	border-radius: 5px;
	position: relative;
	min-height: 250px;
	min-width: 150px;
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px40} ${styles.scale.px40} ${styles.scale.px80};
		min-height: 325px;
	}
	.addeventatc {
		color: ${styles.colors.poppy} !important;
		font-weight: initial;
		padding-top: 0;
		padding-bottom: 0;
		font-size: ${styles.scale.px17};
		box-shadow: none !important;
		line-height: inherit;
		position: absolute !important;
		bottom: ${styles.scale.px40};
		font-family: ${styles.fonts.avenirDemi} !important;
		text-decoration: underline !important;
		:hover {
			font-size: ${styles.scale.px17};
			background-color: ${styles.colors.white};
			text-decoration: none;
		}
		.addeventatc_icon {
			top: 0;
		}
	}
`

const carouselMessageCSS = css`
	font-family: ${styles.fonts.avenirBold};
	font-size: ${styles.scale.px17};
	@media (min-width: ${styles.screens.mobile}px) {
		font-size: ${styles.scale.px18};
	}
	span {
		color: ${styles.colors.poppy};
	}
`

const carouselTitleCSS = css`
	color: ${styles.colors.darkGray};
`

const carouselLinkCSS = css`
	position: absolute;
	bottom: ${styles.scale.px40};
	font-family: ${styles.fonts.avenirDemi};
	text-decoration: underline;
`

const CarouselDetail = ({
	type,
	anchor,
	eventCode,
	featured,
	content,
	title,
	externalAnchor,
	buttonText,
	addCSS,
	eventTitleSize,
}) => {
	let internalSrc, externalSrc, eventSrc
	if (type === 'Event') {
		if (anchor.length < 1) {
			eventSrc = `https://www.addevent.com/event/${eventCode}`
		} else {
			externalSrc = anchor
		}
	} else {
		internalSrc = anchor
		externalSrc = externalAnchor
	}
	return (
		<div
			css={css`
				${carouselComponentCSS};
				${addCSS};
			`}
		>
			<p css={carouselMessageCSS}>
				{featured && (
					<>
						<span>Featured Event</span>
						<br />
					</>
				)}
				{content}
			</p>
			{title && (
				<h2
					css={css`
						${carouselTitleCSS};
						font-size: ${eventTitleSize
							? eventTitleSize
							: 'inherit'};
					`}
				>
					{title}
				</h2>
			)}
			{externalSrc && (
				<a
					href={externalSrc}
					css={carouselLinkCSS}
					target="_blank"
					rel="noopener noreferrer"
				>
					{buttonText ? buttonText : 'Learn more'}
				</a>
			)}
			{eventSrc && !externalSrc && (
				<a
					title="Add to Calendar"
					className="addeventatc"
					data-id={eventCode}
					href={`https://www.addevent.com/event/${eventCode}`}
				>
					{buttonText ? buttonText : 'Add to calendar'}
				</a>
			)}
			{internalSrc && !externalSrc && (
				<Link to={internalSrc} css={carouselLinkCSS}>
					{buttonText ? buttonText : 'Learn more'}
				</Link>
			)}
		</div>
	)
}

export default CarouselDetail
