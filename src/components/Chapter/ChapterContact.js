import React from 'react'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

const chapterContactCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px50} ${styles.scale.px24};
	color: ${styles.colors.white};
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px50};
		background-color: ${styles.colors.lightGray};
		color: ${styles.colors.darkGray};
	}
	h3 {
		color: ${styles.colors.white};
		font-size: ${styles.scale.px24};
		font-family: ${styles.fonts.avenirBold};
		margin-bottom: ${styles.scale.px35};
		@media (min-width: ${styles.screens.tablet}px) {
			color: ${styles.colors.darkGray};
		}
	}
	address {
		font-family: ${styles.fonts.avenirRegular};
		font-style: normal;
		line-height: ${styles.scale.px30};
		padding: 0 0 1rem 0;
		border-bottom: solid 1px black;
		:last-of-type {
			border-bottom: none;
			padding: 0;
		}
		a {
			color: ${styles.colors.white};
			@media (min-width: ${styles.screens.tablet}px) {
				color: ${styles.colors.darkGray};
			}
			:hover {
				color: ${styles.colors.poppy};
			}
		}
		div {
			line-height: ${styles.scale.px20};
			padding-top: ${styles.scale.px10};
		}
	}
`

const ChapterSignup = ({ contact, addCSS }) => {
	return (
		<div
			css={css`
				${chapterContactCSS};
				${addCSS};
			`}
		>
			<h3>Chapter contact:</h3>
			{contact.map((contact, index) => {
				let mapQuery = `${contact.address1} ${contact.address2} ${contact.state} ${contact.zipCode}`
				mapQuery = mapQuery.replace(/ /g, '+')
				const mapLink = `https://www.google.com/maps?q=${mapQuery}`
				return (
					<address address key={index}>
						{contact.name && <strong>{contact.name}</strong>}
						{contact.title && (
							<>
								<br />
								{contact.title}
							</>
						)}
						{contact.email && (
							<>
								<br />
								<a href={`mailto:${contact.email}`}>
									{contact.email}
								</a>
							</>
						)}
						{contact.phone && (
							<>
								<br />
								<a href={`tel:${contact.phone}`}>
									{contact.phone}
								</a>
							</>
						)}
						{(contact.address1 ||
							contact.city ||
							contact.state ||
							contact.zipCode) && (
							<div>
								<a
									href={mapLink}
									target="_blank"
									rel="noopener noreferrer"
								>
									{contact.address1 && (
										<>{contact.address1}</>
									)}
									{contact.address2 && (
										<>
											<br />
											{contact.address2}
										</>
									)}
									{contact.city && (
										<>
											<br />
											{contact.city}
										</>
									)}
									{contact.state && <>, {contact.state}</>}
									{contact.zipCode && <> {contact.zipCode}</>}
								</a>
							</div>
						)}
					</address>
				)
			})}
		</div>
	)
}

export default ChapterSignup
