import React from 'react'
import { css } from '@emotion/core'

import Convo from './Convo'

import { styles } from '../../css/css'

const ConvoContainer = ({ convos }) => {
	return (
		<div id="read-the-guides">
			{convos.map((convo, index) => (
				<Convo
					convo={convo}
					addCSS={css`
						background-color: ${index % 2 === 0
							? styles.colors.blue
							: styles.colors.lightGray};
						color: ${index % 2 === 0
							? styles.colors.white
							: styles.colors.darkGray};
					`}
				/>
			))}
		</div>
	)
}

export default ConvoContainer
