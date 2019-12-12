import React from 'react'
import { css } from '@emotion/core'
import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis'
import { ResponsiveLine } from '@nivo/line'

import { styles } from '../../css/css'

const statisticsStatesGraphContainerCSS = css`
	width: 100vw;
	height: 400px;
	position: relative;
	left: -${styles.scale.px24};
	background-color: ${styles.colors.white};
	padding: ${styles.scale.px16};
	@media (min-width: ${styles.screens.tablet}px) {
		width: auto;
		position: initial;
		padding: ${styles.scale.px35};
	}
	svg {
		fill: none;
	}
`

const StatisticsStatesGraph = ({ width, height, data, selection }) => {
	const filteredData = data.filter(object => object.id === 'us average')
	if (selection) {
		selection.forEach(selection => {
			const selectionArray = data.filter(
				object => object.id === selection.state
			)
			console.log(selection)
			console.log(selectionArray)
			filteredData.push(selectionArray[0])
		})
	}
	console.log(filteredData)
	return (
		<div
			css={statisticsStatesGraphContainerCSS}
			id="states-graph-container"
		>
			<ResponsiveLine
				data={filteredData}
				margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
				xScale={{ type: 'point' }}
				yScale={{
					type: 'linear',
					stacked: true,
					min: 'auto',
					max: 'auto',
				}}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					orient: 'bottom',
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'transportation',
					legendOffset: 36,
					legendPosition: 'middle',
				}}
				axisLeft={{
					orient: 'left',
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'count',
					legendOffset: -40,
					legendPosition: 'middle',
				}}
				colors={{ scheme: 'nivo' }}
				pointSize={10}
				pointColor={{ theme: 'background' }}
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabel="y"
				pointLabelYOffset={-12}
				useMesh={true}
				legends={[
					{
						anchor: 'bottom-right',
						direction: 'column',
						justify: false,
						translateX: 100,
						translateY: 0,
						itemsSpacing: 0,
						itemDirection: 'left-to-right',
						itemWidth: 80,
						itemHeight: 20,
						itemOpacity: 0.75,
						symbolSize: 12,
						symbolShape: 'circle',
						symbolBorderColor: 'rgba(0, 0, 0, .5)',
						effects: [
							{
								on: 'hover',
								style: {
									itemBackground: 'rgba(0, 0, 0, .03)',
									itemOpacity: 1,
								},
							},
						],
					},
				]}
			/>
			{/* <XYPlot xType="time" width={400} height={200} yDomain={[0, 26]}>
				{/* <HorizontalGridLines
					style={{ stroke: styles.colors.darkGray }}
				/>
				<VerticalGridLines style={{ stroke: styles.colors.darkGray }} /> */}
			{/* <XAxis
					title="X Axis"
					tickSize={0}
					tickTotal={15}
					style={{
						line: { stroke: styles.colors.darkGray },
						text: {
							stroke: 'none',
							fill: styles.colors.darkGray,
							fontWeight: 600,
						},
					}}
				/>
				<YAxis
					title="Y Axis"
					tickSize={0}
					style={{
						line: { stroke: styles.colors.darkGray },
						text: {
							stroke: 'none',
							fill: styles.colors.darkGray,
							fontWeight: 600,
						},
					}}
				/>
				{data &&
					data.map((line, index) => {
						const state = line.state.toLowerCase()
						if (state === 'us average') {
							return (
								<LineSeries
									color={styles.colors.lightGray}
									key={index}
									data={line.data}
									style={{
										strokeLinejoin: 'round',
										strokeWidth: 4,
									}}
								/>
							)
						} else if (selection.some(e => e.state === state)) {
							const stateIndex = selection.findIndex(
								x => x.state === state
							)
							const color = selection[stateIndex].color
							return (
								<LineSeries
									key={index}
									data={line.data}
									color={color}
									style={{
										strokeLinejoin: 'round',
										strokeWidth: 4,
									}}
								/>
							)
						} else {
							return ''
						}
					})}
			</XYPlot> */}
		</div>
	)
}

export default StatisticsStatesGraph
