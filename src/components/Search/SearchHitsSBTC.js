import React, { useState } from 'react'
import { css } from '@emotion/react'
import { connectInfiniteHits, Configure } from 'react-instantsearch-dom'
import ContentGrid from '../Content/ContentGrid'

import { styles } from '../../css/css'

const hitCSS = css`
	display: grid;
	grid-template-columns: 0.6fr 1.4fr;
	grid-template-rows: 1fr;
	grid-gap: ${styles.gridGap.mobile};
	align-items: stretch;
	border: ${styles.colors.darkGray} solid ${styles.scale.px2};
	border-radius: ${styles.scale.px5};
	min-height: ${styles.scale.px46};
	img {
		display: inline-block;
		margin: 0;
		object-fit: cover;
	}
	p {
		padding: ${styles.scale.px16};
		color: ${styles.colors.poppy};
	}
	@media (min-width: ${styles.screens.tablet}px) and (max-width: ${styles
			.screens.video}px) {
		grid-template-columns: 1fr;
		grid-template-rows: 1.5fr 0.5fr;
	}
`

const buttonCSS = css`
	margin: 0;
`

const videoWrapperCSS = css`
	background-size: cover;
	background-position: center;
	border-radius: ${styles.scale.px7} / ${styles.scale.px5};
	padding: 56.25% 0 0 0;
	position: relative;
	iframe {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: 5px;
		border: none;
	}
`

const CustomHitsSBTC = data => {
	const [display, setDisplay] = useState(20)
	let clinicianDataArray = []
	console.log(data.hits)
	const clinicianHeaderArray = [
		'Name',
		'Address',
		'Email',
		'Phone',
		'Telehealth',
		'Specialties',
	]
	data.hits.forEach(hit => {
		clinicianDataArray.push({
			Name: hit.name,
			Address: `${hit.address1 ? `${hit.address1}<br />` : ''}${
				hit.address2 ? `${hit.address2}<br />` : ''
			}${hit.city ? `${hit.city}, ` : ''}${
				hit.state ? `${hit.state} ` : ''
			}${hit.zipCode ? `${hit.zipCode}` : ''}`,
			Email: hit.email
				? `<a href="mailto:${hit.email}" target="_blank" rel="noopener noreferrer">${hit.email}</a>`
				: '',
			Phone: hit.phone,
			Telehealth: hit.telehealth,
			Specialties: hit.specialties,
		})
	})
	// data.hits.forEach(hit => {
	// 	clinicianDataArray.push({
	// 		Name: 'foo',
	// 		Address: 'foo',
	// 		Email: 'foo',
	// 		Phone: 'foo',
	// 		Telehealth: 'foo',
	// 		Specialties: 'foo',
	// 	})
	// })
	console.log(clinicianHeaderArray)
	console.log(clinicianDataArray)
	return (
		<>
			<Configure hitsPerPage={display} />
			<ContentGrid
				table={{
					columns: clinicianHeaderArray,
					data: clinicianDataArray,
				}}
			/>
			{data.hasMore && (
				<button
					className="secondary-button"
					css={buttonCSS}
					onClick={() => {
						setDisplay(display + 10)
					}}
				>
					Load more
				</button>
			)}
		</>
	)
}

const SearchHits = connectInfiniteHits(CustomHitsSBTC)

export default SearchHits
