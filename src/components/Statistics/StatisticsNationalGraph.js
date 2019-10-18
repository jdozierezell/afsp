import React from 'react'
import { css } from '@emotion/core'
import {
	XYPlot,
	VerticalGridLines,
	HorizontalGridLines,
	XAxis,
	YAxis,
	LineSeries,
	RadialChart,
} from 'react-vis'

import { styles } from '../../css/css'

const statisticsNationalGraphCSS = css`
	margin: ${styles.scale.px40} ${styles.scale.px24} ${styles.scale.px36};
	@media (min-width: ${styles.screens.tablet}px) {
		margin: ${styles.scale.px40} ${styles.scale.px50} ${styles.scale.px36};
		display: grid;
		grid-template-columns: 1fr 2fr 100px;
		grid-column-gap: ${styles.scale.px40};
	}
	h3 {
		font-size: ${styles.scale.px20};
		font-family: ${styles.fonts.avenirBold};
	}
	h4 {
		font-size: ${styles.scale.px14};
		font-family: ${styles.fonts.avenirBold};
	}
`

const statisticsNationalGraphContainerCSS = css`
	width: 100vw;
	position: relative;
	left: -${styles.scale.px24};
	background-color: ${styles.colors.white};
	padding: ${styles.scale.px16};
	@media (min-width: ${styles.screens.tablet}px) {
		width: auto;
		position: initial;
		padding: 0;
	}
	svg {
		fill: none;
	}
`

const keyCSS = css`
	list-style: none;
	margin: ${styles.scale.px20} 0 0;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
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

const StatisticsNationalGraph = ({
	data,
	graphType,
	width,
	height,
	tabWidth,
}) => {
	if (tabWidth > styles.screens.tablet) {
		const fractionWidth = (width - 100) / 3
		width = fractionWidth * 2 // add 50 to width to account for removed padding
	}
	return (
		<div css={statisticsNationalGraphCSS}>
			<p>
				In 2017, the highest suicide rate (20.2) was among adults
				between 45 and 54 years of age. The second highest rate (20.1)
				occurred in those 85 years or older. Younger groups have had
				consistently lower suicide rates than middle-aged and older
				adults. In 2017, adolescents and young adults aged 15 to 24 had
				a suicide rate of 14.46.
			</p>
			<div>
				<h3>Suicide rates by age from 2000 to 2017</h3>
				<div css={statisticsNationalGraphContainerCSS}>
					{graphType === 'line' && (
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
					)}
					{graphType === 'radial' && (
						<RadialChart
							data={data}
							width={width}
							height={height}
						/>
					)}
				</div>
			</div>
			<div>
				<h4>Age range</h4>
				<ul css={keyCSS}>
					<li>
						<div></div> 15 to 24
					</li>
					<li>
						<div></div> 15 to 24
					</li>
					<li>
						<div></div> 15 to 24
					</li>
					<li>
						<div></div> 15 to 24
					</li>
					<li>
						<div></div> 15 to 24
					</li>
					<li>
						<div></div> 15 to 24
					</li>
					<li>
						<div></div> 15 to 24
					</li>
					<li>
						<div></div> 15 to 24
					</li>
					<li>
						<div></div> 15 to 24
					</li>
				</ul>
			</div>
		</div>
	)
}

export default StatisticsNationalGraph
