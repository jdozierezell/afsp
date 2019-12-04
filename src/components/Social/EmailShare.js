import React from 'react'

import IconLink from '../SVGs/IconLink'

import { styles } from '../../css/css'

const EmailShare = ({ subject }) => {
	return (
		<a href={`mailto:?&subject=&body=${window.location}`}>
			<IconLink color={styles.colors.darkGray} />
		</a>
	)
}

export default EmailShare
