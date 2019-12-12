import React from 'react'
import { css } from '@emotion/core'
import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis'
import { ResponsiveLine } from '@nivo/line'

import { styles } from '../../css/css'

const statisticsStatesGraphContainerCSS = css`
	width: 100vw;
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

const DUMMY_DATA = [
	{
		id: 'japan',
		color: 'hsl(244, 70%, 50%)',
		data: [
			{
				x: 'plane',
				y: 20,
			},
			{
				x: 'helicopter',
				y: 67,
			},
			{
				x: 'boat',
				y: 53,
			},
			{
				x: 'train',
				y: 209,
			},
			{
				x: 'subway',
				y: 128,
			},
			{
				x: 'bus',
				y: 111,
			},
			{
				x: 'car',
				y: 269,
			},
			{
				x: 'moto',
				y: 1,
			},
			{
				x: 'bicycle',
				y: 271,
			},
			{
				x: 'horse',
				y: 224,
			},
			{
				x: 'skateboard',
				y: 119,
			},
			{
				x: 'others',
				y: 25,
			},
		],
	},
	{
		id: 'france',
		color: 'hsl(350, 70%, 50%)',
		data: [
			{
				x: 'plane',
				y: 207,
			},
			{
				x: 'helicopter',
				y: 93,
			},
			{
				x: 'boat',
				y: 5,
			},
			{
				x: 'train',
				y: 176,
			},
			{
				x: 'subway',
				y: 140,
			},
			{
				x: 'bus',
				y: 87,
			},
			{
				x: 'car',
				y: 232,
			},
			{
				x: 'moto',
				y: 96,
			},
			{
				x: 'bicycle',
				y: 10,
			},
			{
				x: 'horse',
				y: 272,
			},
			{
				x: 'skateboard',
				y: 173,
			},
			{
				x: 'others',
				y: 275,
			},
		],
	},
	{
		id: 'us',
		color: 'hsl(127, 70%, 50%)',
		data: [
			{
				x: 'plane',
				y: 157,
			},
			{
				x: 'helicopter',
				y: 249,
			},
			{
				x: 'boat',
				y: 235,
			},
			{
				x: 'train',
				y: 276,
			},
			{
				x: 'subway',
				y: 61,
			},
			{
				x: 'bus',
				y: 204,
			},
			{
				x: 'car',
				y: 47,
			},
			{
				x: 'moto',
				y: 81,
			},
			{
				x: 'bicycle',
				y: 99,
			},
			{
				x: 'horse',
				y: 98,
			},
			{
				x: 'skateboard',
				y: 243,
			},
			{
				x: 'others',
				y: 66,
			},
		],
	},
	{
		id: 'germany',
		color: 'hsl(29, 70%, 50%)',
		data: [
			{
				x: 'plane',
				y: 18,
			},
			{
				x: 'helicopter',
				y: 120,
			},
			{
				x: 'boat',
				y: 105,
			},
			{
				x: 'train',
				y: 25,
			},
			{
				x: 'subway',
				y: 290,
			},
			{
				x: 'bus',
				y: 173,
			},
			{
				x: 'car',
				y: 276,
			},
			{
				x: 'moto',
				y: 81,
			},
			{
				x: 'bicycle',
				y: 125,
			},
			{
				x: 'horse',
				y: 55,
			},
			{
				x: 'skateboard',
				y: 7,
			},
			{
				x: 'others',
				y: 2,
			},
		],
	},
	{
		id: 'norway',
		color: 'hsl(147, 70%, 50%)',
		data: [
			{
				x: 'plane',
				y: 144,
			},
			{
				x: 'helicopter',
				y: 270,
			},
			{
				x: 'boat',
				y: 112,
			},
			{
				x: 'train',
				y: 115,
			},
			{
				x: 'subway',
				y: 45,
			},
			{
				x: 'bus',
				y: 169,
			},
			{
				x: 'car',
				y: 146,
			},
			{
				x: 'moto',
				y: 48,
			},
			{
				x: 'bicycle',
				y: 93,
			},
			{
				x: 'horse',
				y: 210,
			},
			{
				x: 'skateboard',
				y: 2,
			},
			{
				x: 'others',
				y: 195,
			},
		],
	},
]

const StatisticsStatesGraph = ({ width, height, data, selection }) => {
	return (
		<div
			css={statisticsStatesGraphContainerCSS}
			id="states-graph-container"
		>
			<ResponsiveLine
				data={DUMMY_DATA}
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
