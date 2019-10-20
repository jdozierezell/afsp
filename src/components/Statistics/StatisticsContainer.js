import React, { useState, useEffect, useCallback } from 'react'
import { css } from '@emotion/core'

import StatisticsStatesContainer from './StatisticsStatesContainer'
import StatisticsNationalContainer from './StatisticsNationalContainer'

import { useWindowDimensions } from '../WindowDimensionsProvider'

import { styles } from '../../css/css'

const statisticsContainerCSS = css`
	margin: 0;
`

const StatisticsContainer = () => {
	const { width } = useWindowDimensions()

	const [visWidth, setVisWidth] = useState(
		width <= styles.screens.tablet ? width - 32 : width - 170 // account for margins and padding
	)
	const [height, setHeight] = useState(
		width <= styles.screens.tablet ? visWidth / 1.62 : 400
	)

	const handleWindowResize = useCallback(() => {
		setVisWidth(width <= styles.screens.tablet ? width - 32 : width - 170) // account for margins and padding
		setHeight(width <= styles.screens.tablet ? visWidth / 1.62 : 400)
	}, [width, visWidth])

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize)
		return () => window.removeEventListener('resize', handleWindowResize)
	}, [visWidth, handleWindowResize])
	return (
		<section css={statisticsContainerCSS}>
			<StatisticsStatesContainer width={visWidth} height={height} />
			<StatisticsNationalContainer
				width={visWidth}
				height={height}
				tabWidth={width}
			/>
		</section>
	)
}

export default StatisticsContainer
