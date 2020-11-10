import React from 'react'

const ContentTweet = ({ tweet }) => {
	const encodedTweet = encodeURI(tweet)
	return (
		<div>
			<a href={`https://twitter.com/intent/tweet?text=${encodedTweet}`}>
				{encodedTweet} - {encodedTweet.length}
			</a>
		</div>
	)
}

export default ContentTweet
