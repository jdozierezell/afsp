import React from 'react'
import { css } from '@emotion/react'

import Recite from '../Recite/Recite'
import MoreForMentalHealthheader from '../Campaigns/MoreForMentalHealth/MoreForMentalHealthHeader'

import { styles } from '../../css/css'

const headerAsideCSS = css`
	background-color: ${styles.colors.yellow};
	padding: ${styles.scale.px24} ${styles.scale.px24};
	position: relative;
	> div {
		font-family: ${styles.fonts.avenirRegular};
		line-height: ${styles.scale.px24};
		margin: 0;
		text-align: center;
		&:last-of-type {
			padding-top: ${styles.scale.px12};
		}
	}
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px14} ${styles.scale.px50};
		min-height: ${styles.scale.px46};
		> div {
			font-family: ${styles.fonts.avenirRegular};
			line-height: ${styles.scale.px24};
			margin: 0;
			position: absolute;
			top: ${styles.scale.px12};
			&:first-of-type {
				text-align: left;
				left: ${styles.scale.px24};
			}
			&:last-of-type {
				text-align: right;
				right: ${styles.scale.px24};
				padding-top: 0;
				cursor: pointer;
				text-decoration: underline;
			}
		}
	}
	a {
		color: ${styles.colors.darkGray};
	}
`

const HeaderAside = ({ showCampaign }) => {
	return (
		<>
			<aside
				id="crisisResources"
				css={headerAsideCSS}
				aria-label="crisis resources"
			>
				<div>
					<strong>Are you in a crisis?</strong> Call or text{' '}
					<a
						href="tel:988"
						aria-label="Suicide & Crisis Lifeline website link and phone number: 988"
					>
						988
					</a>{' '}
					or text{' '}
					<a
						href="sms:741741&body=TALK"
						aria-label="crisis text line website link and text information: TALK to 741741"
					>
						TALK to 741741
					</a>
					.
				</div>
				<div>
					<Recite />
				</div>
			</aside>
			{showCampaign && (
				<MoreForMentalHealthheader></MoreForMentalHealthheader>
			)}
		</>
	)
}

export default HeaderAside
