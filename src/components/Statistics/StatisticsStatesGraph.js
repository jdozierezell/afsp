import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import {
	XYPlot,
	VerticalGridLines,
	HorizontalGridLines,
	XAxis,
	YAxis,
	LineSeries,
} from 'react-vis'

import { styles } from '../../css/css'

const statisticsStatesGraphContainerCSS = css`
	width: 100vw;
	position: relative;
	left: -${styles.scale.px24};
	background-color: ${styles.colors.white};
	padding: ${styles.scale.px16};
	svg {
		fill: none;
	}
`

const StatisticsStatesGraph = () => {
	const [width, setWidth] = useState(382)
	const [height, setHeight] = useState(width / 1.62)

	const handleWindowResize = () => {
		setWidth(document.getElementById('states-graph-container').offsetWidth)
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize)
		setHeight(width / 1.626)
		console.log(`${width} ${height}`)
		return () => window.removeEventListener('resize', handleWindowResize)
	}, [width])

	return (
		<div
			css={statisticsStatesGraphContainerCSS}
			id="states-graph-container"
		>
			<XYPlot width={width} height={height}>
				{/* <HorizontalGridLines
					style={{ stroke: styles.colors.darkGray }}
				/>
				<VerticalGridLines style={{ stroke: styles.colors.darkGray }} /> */}
				<XAxis
					title="X Axis"
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
					className="first-series"
					data={[
						{ x: 1, y: 3 },
						{ x: 2, y: 5 },
						{ x: 3, y: 15 },
						{ x: 4, y: 12 },
					]}
					style={{
						strokeLinejoin: 'round',
						strokeWidth: 4,
					}}
				/>
				<LineSeries className="second-series" data={null} />
				<LineSeries
					className="third-series"
					curve={'curveMonotoneX'}
					data={[
						{ x: 1, y: 10 },
						{ x: 2, y: 4 },
						{ x: 3, y: 2 },
						{ x: 4, y: 15 },
					]}
					strokeDasharray="7, 3"
				/>
				<LineSeries
					className="fourth-series"
					data={[
						{ x: 1, y: 7 },
						{ x: 2, y: 11 },
						{ x: 3, y: 9 },
						{ x: 4, y: 2 },
					]}
				/>
			</XYPlot>
		</div>
	)
}

export default StatisticsStatesGraph
