import React, { useState, useEffect } from 'react'

import IconTwitter from '../SVGs/IconTwitter'

import { styles } from '../../css/css'

const TwitterShare = () => {
	const [uri, setUri] = useState(null)

	useEffect(() => {
		setUri(encodeURIComponent(window.location))
	}, [])
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
