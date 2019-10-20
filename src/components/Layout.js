import React from 'react'
// import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header/Header'
import EmailSignup from './EmailSignup/EmailSignup'
import Footer from './Footer/Footer'
import WindowDimensionsProvider from './WindowDimensionsProvider'
import HeaderContextProvider from './HeaderContextProvider'

import '../css/layout.css'
import '../css/global.css'
import '../fonts/gatsby-afsp.css'

const Layout = ({ logo, children }) => {
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
			<HeaderContextProvider value={logo}>
				<Header />
			</HeaderContextProvider>
			<main>{children}</main>
			<EmailSignup />
			<Footer />
		</WindowDimensionsProvider>
	)
}

export default Layout