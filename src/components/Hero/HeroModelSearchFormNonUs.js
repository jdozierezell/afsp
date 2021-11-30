import React from 'react'

const HeroModelSearchFormNonUs = ({
	handleSubmit,
	country,
	updateCountry,
	countryGroups,
	dropDownCSS,
}) => {
	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				handleSubmit()
			}}
		>
			<select
				css={dropDownCSS}
				name="country"
				value={country}
				onChange={e => {
					updateCountry(e.target.value)
				}}
			>
				<option>Search by country</option>
				{countryGroups.map((group, index) => {
					return (
						<option key={index} value={group.meetingCountry}>
							{group.meetingCountry}
						</option>
					)
				})}
			</select>
			<button
				type="submit"
				className="secondary-button"
				id="search-button"
			>
				Search
			</button>
		</form>
	)
}

export default HeroModelSearchFormNonUs
