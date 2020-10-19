import React from 'react'

import IconFacebook from '../SVGs/IconFacebook'

import { styles } from '../../css/css'

const FacebookShare = ({ pageUrl }) => {
	return (
		<a
			target="_blank"
			href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
				pageUrl
			)}&amp;src=sdkpreparse`}
			className="fb-xfbml-parse-ignore"
			rel="noopener noreferrer"
		>
			<IconFacebook color={styles.colors.darkGray} />
		</a>
	)
}

export default FacebookShare
