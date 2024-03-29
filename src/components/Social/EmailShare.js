import React from 'react'

import IconEmail from '../SVGs/IconEmail'

import { styles } from '../../css/css'

const EmailShare = ({ pageUrl }) => {
	return (
		<a
			href={`mailto:?&subject=&body=${encodeURIComponent(pageUrl)}`}
			aria-label="Email this story"
		>
			<IconEmail color={styles.colors.darkGray} />
		</a>
	)
}

export default EmailShare
