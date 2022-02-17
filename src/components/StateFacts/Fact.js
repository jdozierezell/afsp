import React from 'react'
import { css, ThemeProvider } from '@emotion/react'
import Button from '@mui/material/Button'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

import IconCircleCheck from '../SVGs/IconCircleCheck'
import IconCircleX from '../SVGs/IconCircleX'

import { styles } from '../../css/css'

const ExceptionTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: styles.colors.darkGray,
		color: styles.colors.white,
		fontSize: 14,
		fontFamily: styles.fonts.avenirRegularIt,
	},
	[`& .${tooltipClasses.popper}`]: {
		backgroundColor: styles.colors.darkGray,
		color: styles.colors.white,
		fontSize: 14,
		fontFamily: styles.fonts.avenirRegularIt,
	},
}))

const tooltipCSS = css`
	button {
		display: inline-block;
		min-width: auto;
	}
`

const Fact = ({ fact, exception }) => {
	return (
		<li>
			<span>
				{fact.value === false && (
					<IconCircleX
						color={styles.colors.poppy}
						iconCSS={css`
							width: ${styles.scale.px24};
						`}
					></IconCircleX>
				)}
				{fact.value === 'None' && (
					<IconCircleX
						color={styles.colors.poppy}
						iconCSS={css`
							width: ${styles.scale.px24};
						`}
					></IconCircleX>
				)}
				{fact.value === 'Encouraged' && (
					<IconCircleCheck
						color={styles.colors.yellow}
						iconCSS={css`
							width: ${styles.scale.px24};
						`}
					></IconCircleCheck>
				)}
				{fact.value === true && (
					<IconCircleCheck
						color={styles.colors.green}
						iconCSS={css`
							width: ${styles.scale.px24};
						`}
					></IconCircleCheck>
				)}
				{fact.value === 'Required' && (
					<IconCircleCheck
						color={styles.colors.green}
						iconCSS={css`
							width: ${styles.scale.px24};
						`}
					></IconCircleCheck>
				)}
			</span>
			<span>
				{fact.display}
				{exception && (
					<sup css={tooltipCSS}>
						<ExceptionTooltip
							title={fact.exception}
							placement="top"
							arrow
						>
							<Button>{exception}</Button>
						</ExceptionTooltip>
					</sup>
				)}
			</span>
		</li>
	)
}

export default Fact
