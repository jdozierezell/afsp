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
	grid-row: 1 / 3;
	display: grid;
	grid-template-columns: subgrid;
	grid-template-rows: subgrid;
	div {
		grid-column: 1 / 5;
		grid-row: 1 / 3;
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: subgrid;
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
	}
	ul {
		position: absolute;
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
		margin-right: ${styles.scale.px12};
		background-color: ${styles.colors.white};
	}
	svg {
		width: 12px;
		margin-right: ${styles.scale.px7};
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
	div {
		display: inline-block;
		width: ${styles.scale.px12};
		height: ${styles.scale.px12};
		margin-right: ${styles.scale.px7};
		border-radius: 50%;
		background-color: ${styles.colors.blue};
	}
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
	const [selection, setSelection] = useState([])

	useEffect(() => {
		console.log(selection)
	}, [selection])

	return (
		<div css={statisticsStatesContainerCSS}>
			<h2>Suicide Rates in the United States</h2>
			<div css={searchStateCSS}>
				<div css={searchStateInputCSS}>
					<Downshift
						onChange={state => {
							if (!selection.includes(state)) {
								setSelection(selection => [...selection, state])
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
									onKeyPress={e => {
										if (e.key === 'Enter') {
											const value = e.target.value.toLowerCase()
											if (
												!selection.includes(value) &&
												states.includes(value)
											)
												setSelection(selection => [
													...selection,
													value,
												])
										}
									}}
								/>
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
																		? 'lightgray'
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
						)}
					</Downshift>
					<button className="secondary-button">Add</button>
				</div>
				<div css={searchStateListCSS}>
					<p>Showing state info for:</p>
					<ul>
						<li>
							<IconX /> Minnesota
						</li>
						<li>
							<IconX /> Rhode Island
						</li>
						<li>
							<IconX /> New York
						</li>
						<li>
							<IconX /> California
						</li>
						<li>
							<IconX /> New Jersey
						</li>
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
					<div></div> Minnesota
				</li>
				<li>
					<div></div> Rhode Island
				</li>
				<li>
					<div></div> New York
				</li>
				<li>
					<div></div> California
				</li>
				<li>
					<div></div> New Jersey
				</li>
			</ul>
			<StatisticsStatesFactsContainer
				title="Minnesota"
				cardCSS={statisticsStatesFactsContainerCSS}
			/>
		</div>
	)
}

export default StatisticsStatesContainer
