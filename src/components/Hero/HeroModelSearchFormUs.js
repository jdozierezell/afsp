import React from 'react'

const HeroModelSearchFormUs = ({
	handleSubmit,
	radius,
	updateRadius,
	zip,
	updateZip,
	dropDownCSS,
	inputCSS,
}) => {
	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				handleSubmit()
			}}
		>
			<div css={inputCSS}>
				<label id="zipLabel" htmlFor="zip" className="sr-only">
					Enter your locality's zip code
				</label>
				<input
					name="zip"
					aria-describedby="zipLabel"
					type="text"
					placeholder="Search by zip"
					value={zip}
					onChange={e => {
						updateZip(e.target.value)
					}}
				/>
			</div>
			<span>within</span>
			<select
				css={dropDownCSS}
				name="radius"
				value={radius}
				onBlur={e => {
					updateRadius(e.target.value)
				}}
			>
				<option value="15">15 Miles</option>
				<option value="25">25 Miles</option>
				<option value="50">50 Miles</option>
				<option value="100">100 Miles</option>
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

export default HeroModelSearchFormUs
