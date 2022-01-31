import React, { useState } from 'react'
import { css } from '@emotion/react'
import { connectInfiniteHits, Configure } from 'react-instantsearch-dom'
import ContentGrid from '../Content/ContentGrid'

import { styles } from '../../css/css'

const buttonCSS = css`
	margin: 0;
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

	return (
		<div>
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
		</div>
	)
}

const SearchHits = connectInfiniteHits(CustomHitsSBTC)

export default SearchHits
