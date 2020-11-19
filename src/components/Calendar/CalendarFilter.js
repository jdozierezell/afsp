import React from 'react'
import { css } from '@emotion/core'
import Select from 'react-select'

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
`

const calendarFilterCSS = css`
	position: relative;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: ${styles.gridGap.desktop};
`

const CalendarFilter = ({
	zIndex,
	handleChapterSelectChange,
	handleProgramSelectChange,
	programs,
	chapters,
}) => {
	if (chapters[0].label !== 'All Chapters') {
		chapters.unshift({ value: null, label: 'All Chapters' })
	}
	if (programs.length > 0 && programs[0].label !== 'All Programs') {
		programs.unshift({ value: null, label: 'All Programs' })
	}

	console.log(chapters)
	return (
		<div
			css={css`
				${calendarFilterCSS};
				z-index: ${zIndex};
			`}
		>
			<div>
				<label htmlFor="chapter">Select Chapter</label>
				<Select
					name="chapter"
					id="chapter"
					title="chapter"
					css={selectCSS}
					className="react-select"
					classNamePrefix="react-select"
					// value={values.selectedOption}
					options={chapters}
					onChange={handleChapterSelectChange}
					// isClearable={true}
				/>
			</div>
			<div>
				<label htmlFor="chapter">Select Program</label>
				<Select
					name="program"
					id="program"
					title="program"
					css={selectCSS}
					className="react-select"
					classNamePrefix="react-select"
					// value={values.selectedOption}
					options={programs}
					onChange={handleProgramSelectChange}
					// isClearable={true}
				/>
			</div>
		</div>
	)
}

export default CalendarFilter
