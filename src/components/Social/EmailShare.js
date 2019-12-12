import React from 'react'

import IconLink from '../SVGs/IconLink'

import { styles } from '../../css/css'

const EmailShare = () => {
	const body = typeof window !== `undefined` ? window.location : ''
	return (
		<a href={`mailto:?&subject=&body=${body}`}>
			<IconLink color={styles.colors.darkGray} />
		</a>
	)
}

export default EmailShare
