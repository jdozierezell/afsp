import React, { useRef } from 'react'
import { useField } from '@unform/core'

export default function Input({ name, label, ...rest }) {
	const inputRef = useRef(null)

	const { fieldName, defaultValue, registerField, error } = useField(name)

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'target.value',
		})
	}, [fieldName, registerField])

	return (
		<>
			<label htmlFor={fieldName}>{label}</label>

			<input
				id={fieldName}
				ref={inputRef}
				defaultValue={defaultValue}
				{...rest}
			/>

			{error && <span className="error">{error}</span>}
		</>
	)
}
