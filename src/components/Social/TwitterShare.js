import React from 'react'

import IconTwitter from '../SVGs/IconTwitter'

import { styles } from '../../css/css'

const TwitterShare = ({ pageUrl }) => {
	return (
		<a
			target="_blank"
			href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
				pageUrl
			)}`}
			rel="noopener noreferrer"
		>
			<IconTwitter color={styles.colors.darkGray} />
		</a>
	)
}

export default TwitterShare
