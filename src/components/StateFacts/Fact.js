import React from 'react'
import { css } from '@emotion/react'

import IconCircleCheck from '../SVGs/IconCircleCheck'
import IconCircleCircle from '../SVGs/IconCircleCircle'
import IconCircleX from '../SVGs/IconCircleX'

import { styles } from '../../css/css'

const Fact = ({ fact, exception, onExceptionClick }) => {
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
					<sup>
						{' '}
						<a href="#" onClick={onExceptionClick(exception)}>
							{exception}
						</a>
					</sup>
				)}
			</span>
		</li>
	)
}

export default Fact
