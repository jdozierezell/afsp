import React from 'react'

const ContentEmbed = ({ embedCode }) => {
	return <div dangerouslySetInnerHTML={{ __html: embedCode }}></div>
}

export default ContentEmbed
