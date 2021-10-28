import React from 'react'
import { css } from '@emotion/react'

import IconCircleCheck from '../SVGs/IconCircleCheck'
import IconCircleCircle from '../SVGs/IconCircleCircle'
import IconCircleX from '../SVGs/IconCircleX'

import { styles } from '../../css/css'

const Fact = ({ fact }) => {
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
				{fact.value === true && (
					<IconCircleCheck
						color={styles.colors.green}
						iconCSS={css`
							width: ${styles.scale.px24};
						`}
					></IconCircleCheck>
				)}
				{fact.value === 'Encouraged' && (
					<IconCircleCircle
						color={styles.colors.yellow}
						iconCSS={css`
							width: ${styles.scale.px24};
						`}
					></IconCircleCircle>
				)}
				{fact.value === 'Required' && (
					<IconCircleCircle
						color={styles.colors.green}
						iconCSS={css`
							width: ${styles.scale.px24};
						`}
					></IconCircleCircle>
				)}
			</span>
			<span>{fact.display}</span>
		</li>
	)
}

export default Fact
