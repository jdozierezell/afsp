import React from 'react'

const FacebookSDK = () => {
	return (
		<div>
			<script>
				window.fbAsyncInit = function(){' '}
				{FB.init({
					appId: '2546027162151797',
					autoLogAppEvents: true,
					xfbml: true,
					version: 'v5.0',
				})}
			</script>
			<script
				async
				defer
				src="https://connect.facebook.net/en_US/sdk.js"
			></script>
			<div
				class="fb-like"
				data-share="true"
				data-width="450"
				data-show-faces="true"
			></div>
		</div>
	)
}

export default FacebookSDK
