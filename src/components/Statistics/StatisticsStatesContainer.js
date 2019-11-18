import React from 'react'
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

const searchStateIntroCSS = css`
	margin: ${styles.scale.px35} 0 ${styles.scale.px40};
`

const searchStateCSS = css`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	input {
		border: none;
		margin-right: ${styles.gridGap.mobile};
	}
`

const searchStateListIntroCSS = css`
	margin: ${styles.scale.px25} 0;
`

const searchStateListCSS = css`
	ul {
		list-style: none;
		margin: 0;
		overflow: scroll hidden;
		display: flex;
	}
	li {
		display: inline-block;
		white-space: nowrap;
		padding: ${styles.scale.px20};
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
	console.log(data)
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
	return (
		<div css={statisticsStatesContainerCSS}>
			<h2>Suicide Rates in the United States</h2>
			<div css={searchStateCSS}>
				<p css={searchStateIntroCSS}>
					Search state to add to the list to compare statistics
				</p>
				<Downshift
					onChange={selection =>
						alert(
							selection
								? `You selected ${selection}`
								: 'Selection Cleared'
						)
					}
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
							<label {...getLabelProps()}>Enter a fruit</label>
							<input {...getInputProps()} />
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
														key: state.toLowerCase(),
														index,
														item: state.toLowerCase(),
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
				<p css={searchStateListIntroCSS}>Showing state info for:</p>
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
			<StatisticsStatesGraph width={width} height={height} data={data} />
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
