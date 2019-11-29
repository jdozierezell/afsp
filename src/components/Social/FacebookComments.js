import React, { Component } from 'react'
import { FacebookProvider, Comments } from 'react-facebook'

const FacebookComments = () => {
	return (
		<FacebookProvider appId="123456789">
			<Comments href="http://www.facebook.com" />
		</FacebookProvider>
	)
}

export default FacebookComments