import React, { useRef, useState } from 'react'
import { css } from '@emotion/core'

import IconX from '../SVGs/IconX'

import { styles } from '../../css/css'

const searchCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px50} ${styles.scale.px24} ${styles.scale.px35};
	width: 100%;
	position: relative;
	input {
		width: 100%;
		border: none;
	}
	button {
		position: absolute;
		right: ${styles.scale.px36};
		top: ${styles.scale.px62};
		background-color: transparent;
		border: none;
		padding: 0;
		width: ${styles.scale.px24};
		height: ${styles.scale.px36};
	}
`

const SearchBar = () => {
	const [searchValue, setSearchValue] = useState('')
	const [showX, setShowX] = useState(false)
	const searchRef = useRef(null)

	const showXFunc = () => {
		if (searchRef.current.value !== '') {
			setShowX(true)
		} else {
			setShowX(false)
		}
		setSearchValue(searchRef.current.value)
	}

	return (
		<div css={searchCSS}>
			<input
				type="text"
				placeholder="Search..."
				value={searchValue}
				ref={searchRef}
				onChange={() => showXFunc()}
			/>
			{showX && (
				<button
					onClick={() => {
						setSearchValue('')
						setShowX(false)
					}}
				>
					<IconX />
				</button>
			)}
		</div>
	)
}

export default SearchBar
