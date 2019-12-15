import React from 'react'
import { css } from '@emotion/core'
import { ResponsiveLine } from '@nivo/line'
import { ResponsivePie } from '@nivo/pie'

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
	height: 75vh;
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
	brief,
	title,
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
			<div dangerouslySetInnerHTML={{ __html: brief }}></div>
			<div>
				<h3>{title}</h3>
				<div css={statisticsNationalGraphContainerCSS}>
					{graphType === 'line' && data && (
						<ResponsiveLine
							data={data}
							margin={{
								top: 50,
								right: 110,
								bottom: 50,
								left: 60,
							}}
							xScale={{ type: 'point' }}
							yScale={{
								type: 'linear',
								stacked: false,
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
								legend: 'Years',
								legendOffset: 36,
								legendPosition: 'middle',
							}}
							axisLeft={{
								orient: 'left',
								tickSize: 5,
								tickPadding: 5,
								tickRotation: 0,
								legend: 'Rate per 100,000 Individuals',
								legendOffset: -40,
								legendPosition: 'middle',
							}}
							colors={styles.ageRaceMethodGraphColors}
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
												itemBackground:
													'rgba(0, 0, 0, .03)',
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
					)}
					{console.log(data)}
					{graphType === 'radial' && data && (
						<ResponsivePie
							data={data}
							margin={{
								top: 40,
								right: 80,
								bottom: 80,
								left: 80,
							}}
							innerRadius={0.5}
							padAngle={0.7}
							cornerRadius={3}
							colors={styles.ageRaceMethodGraphColors}
							borderWidth={0}
							radialLabel={function(e) {
								return `${e.id} (${e.percent})`
							}}
							radialLabelsSkipAngle={10}
							radialLabelsTextXOffset={6}
							radialLabelsTextColor="#333333"
							radialLabelsLinkOffset={0}
							radialLabelsLinkDiagonalLength={16}
							radialLabelsLinkHorizontalLength={24}
							radialLabelsLinkStrokeWidth={1}
							radialLabelsLinkColor={{ from: 'color' }}
							enableSlicesLabels={false}
							slicesLabelsSkipAngle={10}
							slicesLabelsTextColor="#333333"
							sortByValue={true}
							animate={true}
							motionStiffness={90}
							motionDamping={15}
							legends={[
								{
									anchor: 'bottom',
									direction: 'row',
									translateY: 56,
									itemWidth: 100,
									itemHeight: 18,
									itemTextColor: '#999',
									symbolSize: 18,
									symbolShape: 'circle',
									effects: [
										{
											on: 'hover',
											style: {
												itemTextColor: '#000',
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
					)}
				</div>
			</div>
		</div>
	)
}

export default StatisticsNationalGraph
