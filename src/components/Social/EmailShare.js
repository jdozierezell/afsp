import React from 'react'

import IconEmail from '../SVGs/IconEmail'

import { styles } from '../../css/css'

const EmailShare = ({ pageUrl }) => {
	return (
		<a href={`mailto:?&subject=&body=${encodeURIComponent(pageUrl)}`}>
			<IconEmail color={styles.colors.darkGray} />
		</a>
	)
}

export default EmailShare
