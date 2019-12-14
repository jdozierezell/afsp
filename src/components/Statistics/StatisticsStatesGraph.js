import React from 'react'
import { css } from '@emotion/core'
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
	data.forEach(item => {
		item.id = item.id.toUpperCase()
	})
	const filteredData = data.filter(object => object.id === 'US AVERAGE')
	if (selection) {
		selection.forEach(selection => {
			const selectionArray = data.filter(
				object => object.id === selection.state.toUpperCase()
			)
			filteredData.push(selectionArray[0])
		})
	}
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
				colors={styles.graphColors}
				pointSize={10}
				pointColor={{ theme: 'background' }}
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabel="y"
				pointLabelYOffset={-12}
				enableSlices={'x'}
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
				theme={{
					tooltip: {
						container: {
							fontFamily: styles.fonts.avenirRegular,
						},
					},
				}}
			/>
		</div>
	)
}

export default StatisticsStatesGraph
