import React, { useState, useEffect } from 'react'
import { connectRefinementList } from 'react-instantsearch-dom'
import Select from 'react-select'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const refinementListCSS = css`
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	button {
		background: none;
		border: none;
		cursor: pointer;
		border-radius: ${styles.scale.px5};
		padding: ${styles.scale.px7};
	}
	span {
		background-color: ${styles.colors.lightGray};
		padding: ${styles.scale.px5} ${styles.scale.px5} ${styles.scale.px2};
		border-radius: ${styles.scale.px5};
	}
`

const selectCSS = css`
	margin-bottom: ${styles.scale.px36};
	.react-select__control {
		border: 2px solid ${styles.colors.darkGray};
		border-radius: 5px;
	}
	.react-select__input {
		max-height: ${styles.scale.px42};
	}
`

const RefinementList = ({
	items,
	attribute,
	displayAttribute,
	searchState,
	handleSearchChange,
}) => {
	const [options, setOptions] = useState([])
	const [updateDropdown, setUpdateDropdown] = useState(false)
	const [values, setReactSelectValue] = useState({
		selectedCountryOption: [],
		selectedStateOption: [],
	})
	useEffect(() => {
		// console.log(items)
		setOptions([])
		items.forEach(item => {
			setOptions(options => [
				...options,
				{ value: item.value[item.value.length - 1], label: item.label },
			])
		})
		setUpdateDropdown(false)
	}, [items, updateDropdown])
	return (
		<>
			<div css={refinementListCSS}>
				<h3>{displayAttribute}</h3>
				<Select
					css={selectCSS}
					id="meetingCountry"
					className="react-select"
					classNamePrefix="react-select"
					defaultValue={options[0]}
					isClearable={true}
					options={options}
					placeholder={`Select a ${displayAttribute}`}
					onChange={e => {
						console.log(e)
						handleSearchChange({
							target: {
								value: e ? [e.value] : null,
								attribute: attribute,
							},
						})
						setUpdateDropdown(true)
					}}
				/>
				{/* <ul id={`grant-${attribute}`}>
					{items.map(item => (
						<li key={item.label}>
							<button
								style={{
									border: item.isRefined
										? `${styles.colors.blue} ${styles.scale.px2} solid`
										: '',
								}}
								onClick={() =>
									handleSearchChange({
										target: {
											value: item.value,
											attribute: attribute,
										},
									})
								}
							>
								{item.label} <span>{item.count}</span>
							</button>
						</li>
					))}
				</ul> */}
			</div>
		</>
	)
}

const SearchResearchVideoRefinement = connectRefinementList(RefinementList)

export default SearchResearchVideoRefinement
