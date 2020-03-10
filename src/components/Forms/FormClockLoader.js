import React from 'react'
import { css } from '@emotion/core'
import ClockLoader from 'react-spinners/ClockLoader'

import { styles } from '../../css/css'

const loaderWrapperCSS = css`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	padding: calc(50vh - ${styles.scale.px50}) calc(50vw - ${styles.scale.px50});
	background-color: hsla(0, 0%, 91.8%, 0.7);
`

const FormClockLoader = ({ loading }) => {
	return (
		<div
			css={css`
				${loaderWrapperCSS};
				display: ${loading ? 'block' : 'none'};
			`}
		>
			<ClockLoader
				size={100}
				loading={true}
				color={styles.colors.green}
			/>
		</div>
	)
}

export default FormClockLoader
