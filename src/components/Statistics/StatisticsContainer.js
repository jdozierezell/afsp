import React from 'react'
import { css } from '@emotion/core'

import StatisticsStatesContainer from './StatisticsStatesContainer'
import StatisticsNationalContainer from './StatisticsNationalContainer'

import { styles } from '../../css/css'

const statisticsContainerCSS = css`
	margin: 0;
`

const StatisticsContainer = () => {
	return (
		<section css={statisticsContainerCSS}>
			<StatisticsStatesContainer />
			<StatisticsNationalContainer />
		</section>
	)
}

export default StatisticsContainer
