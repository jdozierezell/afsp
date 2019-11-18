import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'

import IconX from '../SVGs/IconX'
import StatisticsStatesGraph from './StatisticsStatesGraph'
import StatisticsStatesFactsContainer from './StatisticsStatesFactsContainer'
import Downshift from 'downshift'
import _ from 'lodash'

import { styles } from '../../css/css'

const statisticsStatesContainerCSS = css`
	background: ${styles.colors.lightGray};
	padding: ${styles.scale.px50} ${styles.scale.px24} 0;
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50} 0;
	}
	> h2 {
		font-size: ${styles.scale.px36};
		margin: 0;
	}
`

const searchStateCSS = css`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr)) 50px repeat(
			4,
			minmax(0, 1fr)
		);
	margin-bottom: ${styles.scale.px24};
`

const searchStateInputCSS = css`
	grid-column: 1 / 5;
	grid-row: 1 / 4;
	display: grid;
	grid-template-columns: subgrid;
	grid-template-rows: subgrid;
	position: relative;
	div {
		grid-column: 1 / 5;
		grid-row: 1 / 4;
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: subgrid;
		div {
			grid-column: 1 / 5;
			grid-row: 3 / 4;
			position: relative;
			ul {
				position: absolute;
				top: -${styles.scale.px20};
				left: 0;
				list-style: none;
				margin: 0;
				padding: 0;
				li {
					margin: 0;
					padding: ${styles.scale.px12};
				}
			}
		}
	}
	label {
		margin: ${styles.scale.px35} 0 ${styles.scale.px40};
		font-family: ${styles.fonts.avenirRegular};
		grid-column: 1 / 5;
		grid-row: 1 / 2;
	}
	input {
		border: none;
		margin-right: ${styles.gridGap.mobile};
		grid-column: 1 / 4;
		grid-row: 2 / 3;
		align-self: start;
		position: relative;
		z-index: 5;
	}
	button {
		grid-column: 4 / 5;
		grid-row: 2 / 3;
		align-self: start;
	}
`

const searchStateListCSS = css`
	grid-column: 6 / 10;
	grid-row: 1 / 3;
	display: grid;
	grid-template-columns: subgrid;
	grid-template-rows: subgrid;
	p {
		margin: ${styles.scale.px35} 0 ${styles.scale.px40};
		grid-column: 1 / 5;
		grid-row: 1 / 2;
	}
	ul {
		grid-column: 1 / 5;
		grid-row: 2 / 4;
		list-style: none;
		margin: 0;
		overflow: auto hidden;
		display: flex;
		align-self: flex-start;
	}
	li {
		display: inline-block;
		white-space: nowrap;
		padding: ${styles.scale.px14} ${styles.scale.px20};
		border-radius: 5px;
		margin: 0 ${styles.scale.px12} ${styles.scale.px12} 0;
		background-color: ${styles.colors.white};
		cursor: pointer;
		position: relative;
		button {
			background: transparent;
			border: none;
			margin: 0;
			padding: 0;
		}
		svg {
			width: 12px;
			margin-right: ${styles.scale.px7};
		}
		span {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}
	}
`

const searchStateKeyCSS = css`
	list-style: none;
	margin: ${styles.scale.px20} 0 0;
	display: flex;
	flex-flow: row wrap;
	li {
		display: inline-block;
		white-space: nowrap;
		border-radius: ${styles.scale.px5};
		margin-right: ${styles.scale.px20};
	}
`

const stateBulletCSS = css`
	display: inline-block;
	width: ${styles.scale.px12};
	height: ${styles.scale.px12};
	margin-right: ${styles.scale.px7};
	border-radius: 50%;
`

const statisticsStatesFactsContainerCSS = css`
	h2 {
		font-size: ${styles.scale.px20};
	}
`

const StatisticsStatesContainer = ({ width, height, data }) => {
	const states = [
		'alabama',
		'alaska',
		'arizona',
		'arkansas',
		'california',
		'colorado',
		'connecticut',
		'delaware',
		'district of columbia',
		'florida',
		'georgia',
		'hawaii',
		'idaho',
		'illinois',
		'indiana',
		'iowa',
		'kansas',
		'kentucky',
		'louisiana',
		'maine',
		'maryland',
		'massachusetts',
		'michigan',
		'minnesota',
		'mississippi',
		'missouri',
		'montana',
		'nebraska',
		'nevada',
		'new hampshire',
		'new jersey',
		'new mexico',
		'new york',
		'north carolina',
		'north dakota',
		'ohio',
		'oklahoma',
		'oregon',
		'pennsylvania',
		'rhode island',
		'south carolina',
		'south dakota',
		'tennessee',
		'texas',
		'utah',
		'vermont',
		'virginia',
		'washington',
		'west virginia',
		'wisconsin',
		'wyoming',
	]
	const colors = [
		styles.colors.blue,
		styles.colors.green,
		styles.colors.poppy,
		styles.colors.yellow,
		styles.colors.darkBlue,
		styles.colors.fuchsia,
	]
	const [selection, setSelection] = useState([])
	useEffect(() => {
		// console.log(selection)
	}, [selection])

	return (
		<div css={statisticsStatesContainerCSS}>
			<h2>Suicide Rates in the United States</h2>
			<div css={searchStateCSS}>
				<div css={searchStateInputCSS}>
					<Downshift
						onChange={state => {
							let newState, newColor
							if (!selection.some(e => e.state === state)) {
								newState = state
								colors.forEach(color => {
									if (
										!selection.some(e => e.color === color)
									) {
										newColor = color
									}
								})
								setSelection(selection => [
									...selection,
									{ state: newState, color: newColor },
								])
							}
						}}
						itemToString={state => (state ? state : '')}
					>
						{({
							getInputProps,
							getItemProps,
							getLabelProps,
							getMenuProps,
							isOpen,
							inputValue,
							highlightedIndex,
							selectedItem,
						}) => (
							<div>
								<label {...getLabelProps()}>
									Search state to add to the list to compare
									statistics
								</label>
								<input
									{...getInputProps()}
									id="state-input"
									onKeyPress={e => {
										if (e.key === 'Enter') {
											const value = e.target.value.toLowerCase()
											if (
												!selection.some(
													e => e.state === value
												) &&
												states.includes(value)
											)
												setSelection(selection => [
													...selection,
													{ state: value },
												])
										}
									}}
								/>
								<div>
									<ul {...getMenuProps()}>
										{isOpen
											? states
													.filter(
														state =>
															!inputValue.toLowerCase() ||
															state.includes(
																inputValue.toLowerCase()
															)
													)
													.map((state, index) => (
														<li
															{...getItemProps({
																key: state,
																index,
																item: state,
																style: {
																	backgroundColor:
																		highlightedIndex ===
																		index
																			? styles
																					.colors
																					.lightGray
																			: 'white',
																	fontWeight:
																		selectedItem ===
																		state
																			? 'bold'
																			: 'normal',
																},
															})}
														>
															{_.startCase(state)}
														</li>
													))
											: null}
									</ul>
								</div>
							</div>
						)}
					</Downshift>
				</div>
				<div css={searchStateListCSS}>
					<p>Showing state info for:</p>
					<ul>
						{selection.map((state, index) => (
							<li
								key={index}
								id={state}
								onClick={e =>
									setSelection(
										selection.filter(
											thisState => state !== thisState
										)
									)
								}
							>
								<IconX />
								{_.startCase(state.state)}
								{/* the following span just standardizes the click target */}
								<span></span>
							</li>
						))}
					</ul>
				</div>
			</div>
			<StatisticsStatesGraph
				width={width}
				height={height}
				data={data}
				selection={selection}
			/>
			<ul css={searchStateKeyCSS}>
				<li>
					<div
						css={css`
							${stateBulletCSS};
							background-color: ${styles.colors.lightGray};
							border: 2px solid ${styles.colors.white};
						`}
					></div>{' '}
					US Average
				</li>
				{selection.map((state, index) => (
					<li key={index}>
						<div
							css={css`
								${stateBulletCSS};
								background-color: ${state.color};
							`}
						></div>{' '}
						{_.startCase(state.state)}
					</li>
				))}
			</ul>
			<StatisticsStatesFactsContainer
				data={data}
				selection={selection}
				cardCSS={statisticsStatesFactsContainerCSS}
			/>
		</div>
	)
}

export default StatisticsStatesContainer
