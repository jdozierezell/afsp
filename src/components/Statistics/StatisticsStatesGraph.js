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

const StatisticsStatesGraph = ({ width, height, data }) => {
	// console.log(data)

	return (
		<div
			css={statisticsStatesGraphContainerCSS}
			id="states-graph-container"
		>
			<XYPlot xType="time" width={width} height={height}>
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
				<LineSeries
					data={[
						{ x: new Date('2008'), y: 12.6 },
						{ x: new Date('2009'), y: 13.74 },
						{ x: new Date('2010'), y: 13.95 },
						{ x: new Date('2011'), y: 13.18 },
						{ x: new Date('2012'), y: 14.65 },
						{ x: new Date('2013'), y: 14.35 },
						{ x: new Date('2014'), y: 14.46 },
						{ x: new Date('2015'), y: 14.87 },
						{ x: new Date('2016'), y: 15.61 },
						{ x: new Date('2017'), y: 16.65 },
						{ x: new Date('2018') },
					]}
					style={{
						strokeLinejoin: 'round',
						strokeWidth: 4,
					}}
				/>
			</XYPlot>
		</div>
	)
}

export default StatisticsStatesGraph
