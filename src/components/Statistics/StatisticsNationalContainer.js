import React, { useState, useRef, useEffect } from 'react'
import { css } from '@emotion/react'
import { useSpring, animated } from 'react-spring'

import StatisticsNationalGraph from './StatisticsNationalGraph'
import IconCaret from '../SVGs/IconCaret'

import { styles } from '../../css/css'

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
	@media (min-width: ${styles.screens.tablet}px) {
		display: none;
	}
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
	@media (min-width: ${styles.screens.tablet}px) {
		display: none;
	}
	button {
		background: transparent;
		border: none;
		color: ${styles.colors.white};
		font-size: ${styles.scale.px17};
		font-family: ${styles.fonts.avenirBold};
		margin-bottom: ${styles.scale.px30};
		cursor: pointer;
	}
`

const menuTabsCSS = css`
	display: none;
	@media (min-width: ${styles.screens.tablet}px) {
		list-style: none;
		margin: 0;
		display: flex;
		justify-content: space-evenly;
		background-color: ${styles.colors.lightGray};
	}
	li {
		padding: ${styles.scale.px30} 0;
		flex-grow: 1;
		text-align: center;
		margin: 0;
		border-radius: 25px 25px 0 0;
		background-color: ${styles.colors.white};
		font-family: ${styles.fonts.avenirBold};
	}
	button {
		border: none;
		background: transparent;
		cursor: pointer;
	}
`

const StatisticsNationalContainer = ({ csv, brief }) => {
	const age = 'Suicide rates by age range'
	const race = 'Suicide rates by race/ethnicity and sex'
	const method = 'Suicide methods'

	const [isCaretFlipped, setCaretFlipped] = useState(false)
	const [childrenHeight, setChildrenHeight] = useState(0)
	const [focusedArea, setFocusedArea] = useState(age)
	const listRef = useRef(null)
	const ageRef = useRef(null)
	const raceRef = useRef(null)
	const methodRef = useRef(null)
	const ageButtonRef = useRef(null)
	const raceButtonRef = useRef(null)
	const methodButtonRef = useRef(null)

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

	const setMenuHeight = () => {
		const children = listRef.current.children
		let childHeight = 0
		for (let child of children) {
			if (childHeight < child.offsetHeight + 30 + 8) {
				childHeight = child.offsetHeight + 30 + 8 // add 30 margin based on li margin style and padding
			}
		}
		setChildrenHeight(children.length * childHeight)
	}

	useEffect(() => {
		if (listRef.current) {
			setMenuHeight()
		}
		if (focusedArea === age) {
			ageRef.current.setAttribute(
				'style',
				`background-color: ${styles.colors.blue};`
			)
			ageButtonRef.current.setAttribute(
				'style',
				`color: ${styles.colors.white};`
			)
			raceRef.current.setAttribute('style', ``)
			methodRef.current.setAttribute('style', ``)
			raceButtonRef.current.setAttribute('style', ``)
			methodButtonRef.current.setAttribute('style', ``)
		} else if (focusedArea === race) {
			raceRef.current.setAttribute(
				'style',
				`background-color: ${styles.colors.blue};`
			)
			raceButtonRef.current.setAttribute(
				'style',
				`color: ${styles.colors.white};`
			)
			ageRef.current.setAttribute('style', ``)
			methodRef.current.setAttribute('style', ``)
			ageButtonRef.current.setAttribute('style', ``)
			methodButtonRef.current.setAttribute('style', ``)
		} else if (focusedArea === method) {
			methodRef.current.setAttribute(
				'style',
				`background-color: ${styles.colors.blue};`
			)
			methodButtonRef.current.setAttribute(
				'style',
				`color: ${styles.colors.white};`
			)
			raceRef.current.setAttribute('style', ``)
			ageRef.current.setAttribute('style', ``)
			raceButtonRef.current.setAttribute('style', ``)
			ageButtonRef.current.setAttribute('style', ``)
		}
	}, [listRef, focusedArea])

	return (
		<div css={statisticsNationalGraphCSS}>
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
					<li>
						<button
							onClick={() => {
								setFocusedArea(age)
								setCaretFlipped(!isCaretFlipped)
							}}
						>
							{age}
						</button>
					</li>
				)}
				{focusedArea !== race && (
					<li>
						<button
							onClick={() => {
								setFocusedArea(race)
								setCaretFlipped(!isCaretFlipped)
							}}
						>
							{race}
						</button>
					</li>
				)}
				{focusedArea !== method && (
					<li>
						<button
							onClick={() => {
								setFocusedArea(method)
								setCaretFlipped(!isCaretFlipped)
							}}
						>
							{method}
						</button>
					</li>
				)}
			</animated.ul>
			<ul css={menuTabsCSS}>
				<li ref={ageRef}>
					<button
						ref={ageButtonRef}
						onClick={() => setFocusedArea(age)}
					>
						{age}
					</button>
				</li>
				<li ref={raceRef}>
					<button
						ref={raceButtonRef}
						onClick={() => setFocusedArea(race)}
					>
						{race}
					</button>
				</li>
				<li ref={methodRef}>
					<button
						ref={methodButtonRef}
						onClick={() => setFocusedArea(method)}
					>
						{method}
					</button>
				</li>
			</ul>
			{focusedArea === age && (
				<StatisticsNationalGraph
					graphType="line"
					title={age}
					brief={brief.ageBrief}
					data={csv.ageData}
					itemWidth={100}
				/>
			)}
			{focusedArea === race && (
				<StatisticsNationalGraph
					graphType="line"
					title={race}
					brief={brief.raceBrief}
					data={csv.raceData}
					itemWidth={180}
					rows={2}
				/>
			)}
			{focusedArea === method && (
				<StatisticsNationalGraph
					graphType="radial"
					title={method}
					brief={brief.methodBrief}
					data={csv.methodData}
				/>
			)}
		</div>
	)
}

export default StatisticsNationalContainer
