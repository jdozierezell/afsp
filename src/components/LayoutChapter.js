import React from 'react'
// import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header/Header'
import EmailSignupChapter from './EmailSignup/EmailSignupChapter'
import Footer from './Footer/Footer'
import WindowDimensionsProvider from './WindowDimensionsProvider'

import '../css/layout.css'
import '../css/global.css'
import '../fonts/gatsby-afsp.css'

const LayoutChapter = ({ children }) => {
	// const data = useStaticQuery(graphql`
	// 	query SiteTitleQuery {
	// 		site {
	// 			siteMetadata {
	// 				title
	// 			}
	// 		}
	// 	}
	// `)

	return (
		<WindowDimensionsProvider>
			<Header />
			<main>{children}</main>
			<EmailSignupChapter />
			<Footer />
		</WindowDimensionsProvider>
	)
}

export default LayoutChapter
