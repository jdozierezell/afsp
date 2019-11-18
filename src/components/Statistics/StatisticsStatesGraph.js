import React from 'react'
import { css } from '@emotion/core'
import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis'

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

const StatisticsStatesGraph = ({ width, height, data, selection }) => {
	return (
		<div
			css={statisticsStatesGraphContainerCSS}
			id="states-graph-container"
		>
			<XYPlot
				xType="time"
				width={width}
				height={height}
				yDomain={[0, 26]}
			>
				{/* <HorizontalGridLines
					style={{ stroke: styles.colors.darkGray }}
				/>
				<VerticalGridLines style={{ stroke: styles.colors.darkGray }} /> */}
				<XAxis
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
						}
					})}
			</XYPlot>
		</div>
	)
}

export default StatisticsStatesGraph
