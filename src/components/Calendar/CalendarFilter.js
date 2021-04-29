import React from 'react'
import { css } from '@emotion/react'
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
	.react-select__placeholder {
		color: ${styles.colors.darkGray};
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
	chapterFilter,
	programFilter,
	handleChapterSelectChange,
	handleProgramSelectChange,
	chapters,
	programs,
}) => {
	if (chapters[0].label !== 'All Chapters') {
		chapters.unshift({ value: '', label: 'All Chapters' })
	}
	if (programs.length > 0 && programs[0].label !== 'All Programs') {
		programs.unshift({ value: '', label: 'All Programs' })
	}
	let chapterSelectValue, programSelectValue
	chapters.forEach(chapter => {
		if (chapter.value === chapterFilter) {
			chapterSelectValue = { value: chapter.value, label: chapter.label }
		}
	})
	programs.forEach(program => {
		if (program.value === programFilter) {
			programSelectValue = { value: program.value, label: program.label }
		}
	})

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
					value={chapterSelectValue}
					options={chapters}
					onChange={handleChapterSelectChange}
				/>
			</div>
			<div>
				<label htmlFor="program">Select Program</label>
				<Select
					name="program"
					id="program"
					title="program"
					css={selectCSS}
					className="react-select"
					classNamePrefix="react-select"
					value={programSelectValue}
					options={programs}
					onChange={handleProgramSelectChange}
				/>
			</div>
		</div>
	)
}

export default CalendarFilter
