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
				{countryGroups.map((country, index) => {
					return (
						<option key={index} value={country}>
							{country}
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
