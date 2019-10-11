import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const cardCSS = css``

const Card = ({ externalCSS }) => {
	return (
		<div
			css={css`
				${cardCSS};
				${externalCSS};
			`}
		>
			<h2>Grant Type</h2>
			<h3>Subtitle about grant type</h3>
			<div>
				<p>
					Each year our research department requests applications for
					innovative, high-risk, potentially high-yield projects that
					focuses on a specific area of suicide prevention. These
					areas have been determined by AFSP and its Scientific
					Council, and reviewed and updated annually.
				</p>
				<p>
					<strong>
						Applications must submit a Letter of Intent by August
						1st to be eligible to apply.
					</strong>
				</p>
				<p>
					<a href="https://example.com">Learn more about ...</a>
				</p>
				<p>
					<a href="https://example.com">Download Policy Document</a>
				</p>
			</div>
		</div>
	)
}

export default Card
