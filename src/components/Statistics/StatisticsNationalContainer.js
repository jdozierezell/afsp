import React, { useState, useRef, useEffect } from 'react'
import { css } from '@emotion/core'
import { useSpring, animated } from 'react-spring'

import StatisticsNationalGraph from './StatisticsNationalGraph'
import IconCaret from '../SVGs/IconCaret'

import { styles } from '../../css/css'

const dataRadial = [{ angle: 1 }, { angle: 5 }, { angle: 2 }]

const statisticsNationalGraphCSS = css`
	position: relative;
`

const iconCaretCSS = css`
	background-color: transparent;
	border: none;
	padding: 0;
	cursor: pointer;
	svg {
		width: ${styles.scale.px18};
	}
`

const activeGraphSwitchCSS = css`
	background-color: ${styles.colors.blue};
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${styles.scale.px30} ${styles.scale.px24};
	h2 {
		color: ${styles.colors.white};
		margin: 0;
		font-size: ${styles.scale.px17};
		font-family: ${styles.fonts.avenirBold};
	}
`

const menuListCSS = css`
	list-style: none;
	/* padding: ${styles.scale.px24} ${styles.scale.px24}; */
	margin: 0 0;
	position: relative;
	background-color: ${styles.colors.blue};
	border-top: solid ${styles.scale.px2} ${styles.colors.white};
	li {
		color: ${styles.colors.white};
		font-size: ${styles.scale.px17};
		font-family: ${styles.fonts.avenirBold};
		margin-bottom: ${styles.scale.px30};
        cursor: pointer;
	}
`

const StatisticsNationalContainer = () => {
	const age = 'Suicide rates by age'
	const race = 'Suicide rates by race/ethnicity'
	const method = 'Suicide methods'

	const [isCaretFlipped, setCaretFlipped] = useState(false)
	const [focus, setFocus] = useState(age)
	const [childrenHeight, setChildrenHeight] = useState(0)
	const [focusedArea, setFocusedArea] = useState(age)
	const listRef = useRef(null)
	const ageRef = useRef(null)
	const raceRef = useRef(null)
	const methodRef = useRef(null)

	const flipCaret = useSpring({
		transform: isCaretFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)',
	})

	const showList = useSpring({
		opacity: isCaretFlipped ? 1 : 0,
		maxHeight: isCaretFlipped ? `${childrenHeight}px` : '0px',
		padding: isCaretFlipped
			? `${styles.scale.px24} ${styles.scale.px24}`
			: `0px ${styles.scale.px24}`,
	})

	useEffect(() => {
		const children = listRef.current.children
		let childHeight = 0
		for (let child of children) {
			if (childHeight < child.offsetHeight + 30 + 8) {
				childHeight = child.offsetHeight + 30 + 8 // add 30 margin based on li margin style and padding
			}
		}
		setChildrenHeight(children.length * childHeight)
	}, [listRef])

	return (
		<div css="statisticsNationalGraphCSS">
			<div css={activeGraphSwitchCSS}>
				<h2>{focusedArea}</h2>
				<animated.button
					css={iconCaretCSS}
					style={flipCaret}
					onClick={() => setCaretFlipped(!isCaretFlipped)}
				>
					<IconCaret color={styles.colors.white} />
				</animated.button>
			</div>
			<animated.ul css={menuListCSS} style={showList} ref={listRef}>
				{focusedArea !== age && (
					<li onClick={() => setFocusedArea(age)}>{age}</li>
				)}
				{focusedArea !== race && (
					<li onClick={() => setFocusedArea(race)}>{race}</li>
				)}
				{focusedArea !== method && (
					<li onClick={() => setFocusedArea(method)}>{method}</li>
				)}
			</animated.ul>
			{console.log(focusedArea)}
			{focusedArea === age && (
				<StatisticsNationalGraph graphType="line" data={dataRadial} />
			)}
			{focusedArea === race && (
				<StatisticsNationalGraph graphType="line" data={dataRadial} />
			)}
			{focusedArea === method && (
				<StatisticsNationalGraph graphType="radial" data={dataRadial} />
			)}
		</div>
	)
}

export default StatisticsNationalContainer
