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
		font-family: ${styles.fonts.avenirRegular};
	}
	.react-select__input {
		max-height: ${styles.scale.px42};
		font-family: ${styles.fonts.avenirRegular};
	}
	.react-select__menu {
		font-family: ${styles.fonts.avenirRegular};
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
	const [placeholder, setPlaceholder] = useState(
		`Select a ${displayAttribute}`
	)
	const [placeholderColor, setPlaceholderColor] = useState('#777777')
	const [updateDropdown, setUpdateDropdown] = useState(false)
	useEffect(() => {
		setOptions([])
		items.forEach(item => {
			setOptions(options => [
				...options,
				{ value: item.value[item.value.length - 1], label: item.label },
			])
		})
		if (searchState.refinementList) {
			const refinementKeys = Object.keys(searchState.refinementList)
			refinementKeys.forEach(key => {
				if (key === attribute) {
					setPlaceholder(searchState.refinementList[attribute])
					setPlaceholderColor(styles.colors.darkGray)
				}
			})
		}
		setUpdateDropdown(false)
	}, [items, updateDropdown, searchState])

	return (
		<>
			<div css={refinementListCSS}>
				<h3>{displayAttribute}</h3>
				<Select
					css={selectCSS}
					styles={{
						placeholder: (provided, state) => ({
							...provided,
							color: placeholderColor,
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
						setUpdateDropdown(true)
					}}
				/>
			</div>
		</>
	)
}

const SearchResearchRefinement = connectRefinementList(RefinementList)

export default SearchResearchRefinement
