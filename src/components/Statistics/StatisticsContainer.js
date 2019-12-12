import React, { useState, useEffect, useCallback } from 'react'
import { css } from '@emotion/core'
import Papa from 'papaparse'

import StatisticsStatesContainer from './StatisticsStatesContainer'
import StatisticsNationalContainer from './StatisticsNationalContainer'

import { styles } from '../../css/css'

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
					if (states.some(e => e.state === result.State)) {
						const index = states.findIndex(
							state => state.state === result.State
						)
						const state = states[index]
						state.data.push({
							x: new Date(result.Year),
							y: parseFloat(result['Age-Adjusted Rate']),
						})
						state.rank = result.Rank
						state.rate = result['Age-Adjusted Rate']
					} else {
						states.push({
							state: result.State,
							data: [
								{
									x: new Date(result.Year),
									y: parseFloat(result['Age-Adjusted Rate']),
								},
							],
							rank: result.Rank,
							rate: result['Age-Adjusted Rate'],
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
				setAgeData(results)
			},
		})
		Papa.parse(data.methodData.url, {
			download: true,
			header: true,
			complete: results => {
				setMethodData(results)
			},
		})
		Papa.parse(data.raceData.url, {
			download: true,
			header: true,
			complete: results => {
				setRaceData(results)
			},
		})
	}, [data])

	return (
		<section css={statisticsContainerCSS}>
			<StatisticsStatesContainer data={stateData} />
			<StatisticsNationalContainer
				csv={{
					ageData,
					methodData,
					raceData,
				}}
				brief={{
					ageBrief: data.ageBrief,
					methodBrief: data.methodBrief,
					raceBrief: data.raceBrief,
				}}
			/>
		</section>
	)
}

export default StatisticsContainer
