import React from 'react'

import IconTwitter from '../SVGs/IconTwitter'

import { styles } from '../../css/css'

const TwitterShare = () => {
	const uri =
		typeof window !== `undefined`
			? encodeURIComponent(window.location)
			: null
	return (
		<a
			target="_blank"
			href={`https://twitter.com/intent/tweet?url=${uri}`}
			rel="noopener noreferrer"
		>
			<IconTwitter color={styles.colors.darkGray} />
		</a>
	)
}

export default TwitterShare
