import React, { useEffect } from 'react'
import { connectRefinementList } from 'react-instantsearch-dom'
import Select from 'react-select'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

import stateListAbbreviations from '../../utils/stateListAbbreviations'

const refinementListCSS = css`
	@media (min-width: ${styles.screens.tablet}px) {
		display: flex;
		align-items: baseline;
		> h3 {
			padding-right: 1rem;
			position: relative;
			top: ${styles.scale.px5};
		}
		> div {
			min-width: 50vw;
		}
	}
`

const selectCSS = css`
	margin-bottom: ${styles.scale.px36};
	.react-select__control {
		border: 2px solid ${styles.colors.darkGray};
		border-radius: 5px;
		font-family: ${styles.fonts.avenirRegular};
	}
	.react-select__input {
		max-height: ${styles.scale.px42};
		font-family: ${styles.fonts.avenirRegular};
	}
	.react-select__menu {
		font-family: ${styles.fonts.avenirRegular};
	}
	.react-select__placeholder {
		color: ${styles.colors.darkGray};
	}
`

const RefinementList = ({
	items,
	attribute,
	displayAttribute,
	searchState,
	handleSearchChange,
}) => {
	let options = []
	const placeholder = `Select a ${displayAttribute}`
	items.forEach(item => {
		let label = stateListAbbreviations.find(
			({ value }) => value === item.value[item.value.length - 1]
		)

		if (label) {
			label = label.label ? label.label : label
		} else {
			label = placeholder
		}

		options.push({
			value: item.value[item.value.length - 1],
			label: label,
		})
	})
	useEffect(() => {}, [attribute, items, searchState])
	const displayID = displayAttribute
		.replace(/[^A-Za-z0-9]/g, '-')
		.toLowerCase()
	return (
		<div css={refinementListCSS}>
			<h3 id={`${displayID}-label`} htmlFor={displayID}>
				{displayAttribute}
			</h3>
			<Select
				aria-describedby={`${displayID}-label`}
				aria-labelledby={`${displayID}-label`}
				id={displayID}
				css={selectCSS}
				styles={{
					placeholder: (provided, state) => ({
						...provided,
						color: styles.colors.darkGray,
					}),
				}}
				className="react-select"
				classNamePrefix="react-select"
				defaultValue={options[0]}
				isClearable={true}
				options={options}
				placeholder={placeholder}
				onChange={e => {
					handleSearchChange({
						target: {
							value: e ? [e.value] : null,
							attribute: attribute,
						},
					})
				}}
			/>
		</div>
	)
}

const SearchResearchRefinement = connectRefinementList(RefinementList)

export default SearchResearchRefinement
