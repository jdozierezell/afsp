import React, { useState, useEffect } from 'react'

import IconLink from '../SVGs/IconLink'

import { styles } from '../../css/css'

const EmailShare = () => {
	const [uri, setUri] = useState(null)

	useEffect(() => {
		setUri(encodeURIComponent(window.location))
	}, [])
	return (
		<a href={`mailto:?&subject=&body=${uri}`}>
			<IconLink color={styles.colors.darkGray} />
		</a>
	)
}

export default EmailShare
