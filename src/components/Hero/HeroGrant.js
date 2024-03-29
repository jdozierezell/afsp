import React from 'react'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { styles } from '../../css/css'

const solidGrantCSS = css`
	background-color: ${styles.colors.blue};
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: flex-start;
	padding: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px50};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px150} ${styles.scale.px50} ${styles.scale.px50};
	}
`
const grantInformationCSS = css`
	max-width: 600px;
	h1 {
		color: ${styles.colors.white};
		font-family: ${styles.fonts.paul};
		margin: ${styles.scale.px35} 0;
		font-size: ${styles.scale.px36};
		@media (min-width: ${styles.screens.tablet}px) {
			margin: ${styles.scale.px40} 0;
			font-size: ${styles.scale.px44};
		}
	}
	h4 {
		color: ${styles.colors.white};
		font-family: ${styles.fonts.avenirRegular};
		line-height: ${styles.scale.px24};
	}
`
const granteeInformationCSS = css`
	display: grid;
	width: 100%;
	grid-gap: ${styles.scale.px24};
	margin-top: ${styles.scale.px24};
	@media (min-width: ${styles.screens.navigation}px) {
		width: calc(100vw - 600px - 150px);
		margin-top: 0;
	}
	div {
		min-width: 100px;
		max-width: 200px;
		@media (min-width: ${styles.screens.navigation}px) {
			max-width: 360px;
		}
	}
	img {
		@media (min-width: ${styles.screens.navigation}px) {
			border-radius: 50%;
		}
	}
	p {
		text-align: left;
		color: ${styles.colors.white};
		direction: ltr;
		margin-bottom: 0;
		@media (min-width: ${styles.screens.navigation}px) {
			text-align: center;
		}
	}
`

const HeroGrant = ({ grant }) => {
	const { title, grantInformation } = grant
	let amount, type, year, displayAmount, displayAreas, mentor
	let areas = []
	let grantees = []
	grantInformation.forEach(grant => {
		if (grant.__typename === 'DatoCmsYear') {
			year = grant.year
		} else if (grant.__typename === 'DatoCmsGrantType') {
			type = grant.grantType
		} else if (grant.__typename === 'DatoCmsAmount') {
			amount = grant.amount
		} else if (grant.__typename === 'DatoCmsArea') {
			areas.push(grant.area)
		} else if (grant.__typename === 'DatoCmsGrantee') {
			grantees.push({
				name: grant.granteeName,
				institution: grant.granteeInstitution,
				image: grant.granteeImage,
				staticImage: grant.granteeImage.url,
			})
		} else if (grant.__typename === 'DatoCmsMentor') {
			mentor = grant.mentor
		}
	})
	const currencyFormatter = Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	})
	let tempAmount = currencyFormatter.formatToParts(amount)
	tempAmount = tempAmount.filter(object => object.type !== 'decimal')
	tempAmount = tempAmount.filter(object => object.type !== 'fraction')
	tempAmount.forEach(object =>
		displayAmount === undefined
			? (displayAmount = object.value)
			: (displayAmount += object.value)
	)
	areas.forEach((area, index) => {
		if (index + 1 < areas.length) {
			displayAreas === undefined
				? (displayAreas = `${area}, `)
				: (displayAreas += `${area}, `)
		} else {
			displayAreas === undefined
				? (displayAreas = `${area}`)
				: (displayAreas += `${area}`)
		}
	})
	return (
		<div
			css={css`
				${solidGrantCSS};
			`}
		>
			<div css={grantInformationCSS}>
				<h1>{title}</h1>
				<h4>
					{year} {type}
					<br />
					Amount Awarded: {displayAmount}
					<br />
					Focus {areas.length > 1 ? 'Areas' : 'Area'}: {displayAreas}
				</h4>
			</div>
			<div
				css={css`
					${granteeInformationCSS};
					grid-template-columns: repeat(
						${grantees.length > 1 ? 2 : 1},
						1fr
					);
					@media (min-width: ${styles.screens.tablet}px) {
						grid-template-columns: repeat(${grantees.length}, 1fr);
					}
					@media (min-width: ${styles.screens.navigation}px) {
						direction: rtl;
						grid-template-columns: repeat(${grantees.length}, 1fr);
					}
				`}
			>
				{grantees.map((grantee, index) => {
					return (
						<div key={index}>
							<GatsbyImage
								image={grantee.image.gatsbyImageData}
								alt={grantee.name}
								css={css`
									margin: 0 0 ${styles.scale.px36};
									@media (min-width: ${styles.screens
											.navigation}px) {
										margin: 0 ${styles.scale.px36}
											${styles.scale.px36};
									}
								`}
							/>
							<p>
								<strong>{grantee.name}</strong>
								<br />
								{grantee.institution}
								{mentor && (
									<>
										<br />
										<br />
										Mentor: {mentor}
									</>
								)}
							</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default HeroGrant
