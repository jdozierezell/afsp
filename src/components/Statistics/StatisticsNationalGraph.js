import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const statisticsNationalGraphCSS = css`
	margin: ${styles.scale.px40} ${styles.scale.px24} ${styles.scale.px36};
	h3 {
		font-size: ${styles.scale.px20};
		font-family: ${styles.fonts.avenirBold};
	}
	h4 {
		font-size: ${styles.scale.px14};
		font-family: ${styles.fonts.avenirBold};
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

const StatisticsNationalGraph = () => {
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
			<h3>Suicide rates by age from 2000 to 2017</h3>
			<div></div>
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
