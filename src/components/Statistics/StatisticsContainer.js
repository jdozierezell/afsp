import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import Papa from 'papaparse'

import StatisticsStatesContainer from './StatisticsStatesContainer'
import StatisticsNationalContainer from './StatisticsNationalContainer'

import createAnchor from '../../utils/createAnchor'

const statisticsContainerCSS = css`
	margin: 0;
`

const StatisticsContainer = ({ data }) => {
	const [stateData, setStateData] = useState()
	const [ageData, setAgeData] = useState()
	const [methodData, setMethodData] = useState()
	const [raceData, setRaceData] = useState()

	useEffect(() => {
		Papa.parse(data.stateData.url, {
			download: true,
			header: true,
			complete: results => {
				let states = []
				// https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e/8217584#8217584
				results.data.forEach(result => {
					result.State = result.State.toLowerCase()
					if (states.some(e => e.id === result.State)) {
						const index = states.findIndex(
							state => state.id === result.State
						)
						const state = states[index]
						state.data.push({
							x: result.Year,
							y: parseFloat(result['Age-Adjusted Rate']),
						})
						state.rank = result.Rank
						state.rate = result['Age-Adjusted Rate']
					} else {
						states.push({
							id: result.State,
							data: [
								{
									x: result.Year,
									y: parseFloat(result['Age-Adjusted Rate']),
								},
							],
							rank: result.Rank,
							rate: result['Age-Adjusted Rate'],
							factSheet: `${data.stateFactsYear}-${createAnchor(
								result.State
							)}`,
						})
					}
				})
				setStateData(states)
			},
		})
		Papa.parse(data.ageData.url, {
			download: true,
			header: true,
			complete: results => {
				let ages = []
				results.data.forEach(result => {
					let data = []
					Object.keys(result).forEach(key => {
						if (key !== 'Year') {
							data.push({ x: key, y: result[key] })
						}
					})
					ages.push({
						id: result.Year,
						data,
					})
				})
				setAgeData(ages)
			},
		})
		Papa.parse(data.raceData.url, {
			download: true,
			header: true,
			complete: results => {
				let races = []
				results.data.forEach(result => {
					let data = []
					Object.keys(result).forEach(key => {
						if (key !== 'Year') {
							data.push({ x: key, y: result[key] })
						}
					})
					races.push({
						id: result.Year,
						data,
					})
				})
				setRaceData(races)
			},
		})
		Papa.parse(data.methodData.url, {
			download: true,
			header: true,
			complete: results => {
				let methods = []
				results.data.forEach(result => {
					methods.push({
						id: result.Method,
						label: result.Method,
						value: Number(result.Deaths),
						percent: Number(result.Percent),
					})
				})
				setMethodData(methods)
			},
		})
	}, [data])

	return (
		<section css={statisticsContainerCSS}>
			{stateData && <StatisticsStatesContainer data={stateData} />}
			{ageData && raceData && (
				<StatisticsNationalContainer
					csv={{
						ageData,
						methodData,
						raceData,
					}}
					brief={{
						ageBrief: data.ageBrief,
						raceBrief: data.raceBrief,
						methodBrief: data.methodBrief,
					}}
				/>
			)}
		</section>
	)
}

export default StatisticsContainer
