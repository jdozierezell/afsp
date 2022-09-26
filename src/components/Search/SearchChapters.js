import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'

import { styles } from '../../css/css'

const searchResultCSS = css`
	display: grid;
	grid-column-gap: 0;
	grid-template-columns: 1fr 1fr;
	background-color: ${styles.colors.white};
	margin-bottom: ${styles.scale.px16};
	border-radius: ${styles.scale.px5};
	overflow: hidden;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: 1fr 1fr 1fr;
		margin-bottom: ${styles.scale.px20};
	}
	:last-of-type {
		margin-bottom: 0;
	}
`

const searchImageCSS = css`
	grid-area: 1 / 1 / 2 / 2;
	overflow: hidden;
	background-position: center;
	background-size: cover;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-area: 1 / 2 / 2 / 3;
	}
`

const searchInfoCSS = css`
	grid-area: 2 / 1 / 3 / 3;
	margin-top: ${styles.scale.px40};
	padding: 0 ${styles.scale.px20};
	@media (min-width: ${styles.screens.tablet}px) {
		grid-area: 1 / 1 / 2 / 2;
	}
	h2 {
		margin: 0;
	}
	h3 {
		margin: ${styles.scale.px35} 0;
	}
	address {
		margin-bottom: ${styles.scale.px40};
		font-family: ${styles.fonts.avenirRegular};
		font-style: normal;
		a {
			color: ${styles.colors.darkGray};
			:hover {
				color: ${styles.colors.poppy};
			}
		}
	}
	.secondary-button {
		margin-bottom: ${styles.scale.px30};
		@media (min-width: ${styles.screens.tablet}px) {
			margin-bottom: ${styles.scale.px40};
		}
	}
`

const searchMapCSS = css`
	grid-area: 1 / 1 / 2 / 2;
	overflow: hidden;
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-area: 1 / 3 / 2 / 4;
	}
`

const ChapterSearchResult = ({ chapter }) => {
	const heroBackgroundImg = `${chapter[0].image.url}?format=auto&w=1080&h=1080&crop=faces&fit=crop`
	const chapterBackgroundImg = chapter[0].map.url
	let chapterStaff = []
	const holdChanges = true
	if (!holdChanges) {
		chapterStaff =
			chapter[0].chapter_staff.length > 0
				? chapter[0].chapter_staff
				: [
						{
							email: chapter[0].staff_email,
							name: chapter[0].staff_name,
							phone: chapter[0].staff_phone,
							title: chapter[0].staff_title,
						},
				  ]
	} else {
		chapterStaff = [
			{
				email: chapter[0].staffEmail,
				name: chapter[0].staffName,
				phone: chapter[0].staffPhone,
				title: chapter[0].staffTitle,
			},
		]
	}
	return (
		<div css={searchResultCSS}>
			<div
				css={css`
					${searchImageCSS};
					background-image: url(${heroBackgroundImg});
				`}
			></div>
			<div css={searchInfoCSS}>
				<h2>AFSP {chapter[0].title}</h2>
				<h3>Community contact:</h3>
				{chapterStaff.map((staff, index) => (
					<address key={index}>
						{staff.name && <strong>{staff.name}</strong>}
						{staff.title && (
							<>
								<br />
								{staff.title}
							</>
						)}
						{staff.email && (
							<>
								<br />
								<a href={`mailto:${staff.email}`}>
									{staff.email}
								</a>
							</>
						)}
						{staff.phone && (
							<>
								<br />
								<a href={`tel:${staff.phone}`}>{staff.phone}</a>
							</>
						)}
					</address>
				))}

				<Link
					className="secondary-button"
					to={`/chapter/${chapter[0].slug}`}
				>
					More info
				</Link>
			</div>
			<div
				css={css`
					${searchMapCSS};
					background-image: url(${chapterBackgroundImg});
				`}
			></div>
		</div>
	)
}

export default ChapterSearchResult
