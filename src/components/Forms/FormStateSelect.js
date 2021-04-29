import React, { useRef, useEffect } from 'react'
import Select from 'react-select'
import { useField } from '@rocketseat/unform'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

const selectCSS = css`
	margin-bottom: ${styles.scale.px36};
	.react-select__control {
		border: 2px solid ${styles.colors.darkGray};
		border-radius: 5px;
	}
	.react-select__input {
		max-height: ${styles.scale.px42};
	}
	.react-select__placeholder {
		color: ${styles.colors.darkGray};
	}
`

const QuiltStateSelect = ({ name, options }) => {
	const ref = useRef(null)
	const { fieldName, registerField, defaultValue, error } = useField(name)
	const parseSelectValue = selectRef => {
		const selectValue = selectRef.state.value
		return selectValue ? selectValue.value : ''
	}

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: ref.current,
			path: 'state.value',
			parseValue: parseSelectValue,
			clearValue: selectRef => {
				selectRef.select.clearValue()
			},
		})
	}, [fieldName, registerField])

	const getDefaultValue = () => {
		if (!defaultValue) return null
		return options.find(option => option.value === defaultValue)
	}

	return (
		<>
			<Select
				css={selectCSS}
				className="react-select"
				classNamePrefix="react-select"
				name={fieldName}
				options={options}
				defaultValue={getDefaultValue()}
				ref={ref}
				getOptionValue={option => option.value}
				getOptionLabel={option => option.label}
			/>
			{error && <span>{error}</span>}
		</>
	)
}

export default QuiltStateSelect
