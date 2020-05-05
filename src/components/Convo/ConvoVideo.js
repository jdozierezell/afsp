import React from 'react'

const ConvoVideo = ({ video }) => {
	return (
		<div>
			<video src={video.video.url} />
		</div>
	)
}

export default ConvoVideo
