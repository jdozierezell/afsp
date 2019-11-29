import React from 'react'

const appId = '795920594206191'
const redirect = 'https%3A%2F%2Fafsp.org%2Fabout'
const type = 'code'
const scope = 'user_profile,user_media'

const instaAuth = () => {
	return (
		<div>
			<a
				href={`https://api.instagram.com/oauth/authorize?app_id=${appId}&redirect_uri=${redirect}&response_type=${type}&scope=${scope}`}
			>
				Instagram Authorization
			</a>
		</div>
	)
}

export default instaAuth
