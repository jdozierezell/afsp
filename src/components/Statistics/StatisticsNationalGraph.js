import React from 'react'
import { css } from '@emotion/react'
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
	h4 {
		font-size: ${styles.scale.px14};
		font-family: ${styles.fonts.avenirBold};
	}
`

const graphHeadingCSS = css`
	margin-bottom: 0;
`

const statisticsNationalGraphContainerCSS = css`
	width: 100%;
	height: calc(100vw);
	position: relative;
	left: -${styles.scale.px24};
	background-color: ${styles.colors.white};
	padding: ${styles.scale.px16};
	@media (min-width: ${styles.screens.tablet}px) {
		width: auto;
		position: initial;
		padding: 0;
		height: calc(100vw / 3.5);
	}
	svg {
		fill: none;
	}
`

const StatisticsNationalGraph = ({
	data,
	brief,
	title,
	graphType,
	itemWidth,
	rows,
}) => {
	rows = rows ? rows : 1
	let legendProps = []
	let lineData

	for (let i = 0; i < rows; i++) {
		if (i === 0) {
			lineData = data
				.slice(0, Math.floor(data.length / rows))
				.map((cur, index) => ({
					id: cur.id,
					label: cur.id,
					color: styles.ageRaceMethodGraphColors.slice(
						0,
						Math.floor(data.length / rows)
					)[index],
				}))
		} else if (i < rows - 1) {
			lineData = data
				.slice(
					Math.floor(data.length / rows) * i,
					Math.floor(data.length / rows) * (i + 1)
				)
				.map((cur, index) => ({
					id: cur.id,
					label: cur.id,
					color: styles.ageRaceMethodGraphColors.slice(
						Math.floor(data.length / rows) * i,
						Math.floor(data.length / rows) * (i + 1)
					)[index],
				}))
		} else {
			lineData = data
				.slice(Math.floor(data.length / rows) * i)
				.map((cur, index) => ({
					id: cur.id,
					label: cur.id,
					color: styles.ageRaceMethodGraphColors.slice(
						Math.floor(data.length / rows) * i
					)[index],
				}))
		}

		legendProps.push({
			anchor: 'bottom',
			direction: 'row',
			justify: false,
			translateX: 0,
			translateY: 65 + 20 * i,
			itemsSpacing: 0,
			itemDirection: 'left-to-right',
			itemWidth: itemWidth,
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
			data: lineData,
		})
	}
	return (
		<div css={statisticsNationalGraphCSS}>
			<div dangerouslySetInnerHTML={{ __html: brief }}></div>
			<div>
				<h2 css={graphHeadingCSS}>{title}</h2>
				<div css={statisticsNationalGraphContainerCSS}>
					{graphType === 'line' && data && (
						<ResponsiveLine
							data={data}
							margin={{
								top: 10,
								right: 20,
								bottom: 25 + 50 * rows,
								left: 50,
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
							legends={legendProps}
							theme={{
								tooltip: {
									container: {
										fontFamily: styles.fonts.avenirRegular,
									},
								},
							}}
						/>
					)}
					{graphType === 'radial' && data && (
						<ResponsivePie
							data={data}
							margin={{
								top: 0,
								right: 80,
								bottom: 0,
								left: 80,
							}}
							innerRadius={0.5}
							padAngle={0.7}
							cornerRadius={3}
							colors={styles.ageRaceMethodGraphColors}
							borderWidth={0}
							radialLabel={function (e) {
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
							legends={[]}
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
