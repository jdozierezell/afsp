import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header/Header'
import EmailSignupChapter from './EmailSignup/EmailSignupChapter'
import Footer from './Footer/Footer'
import WindowDimensionsProvider from './WindowDimensionsProvider'
import HeaderContextProvider from './HeaderContextProvider'

import '../css/layout.css'
import '../css/global.css'
import '../fonts/gatsby-afsp.css'

const LayoutChapter = ({ logo, children }) => {
	const data = useStaticQuery(graphql`
		query {
			nav: allDatoCmsNavigation {
				...Navigation
			}
		}
	`)
	const { nav } = data
	let headerNav = []
	let footerNav = []
	nav.edges.forEach(({ node }) => {
		if (node.inHeader === true) {
			headerNav.push(node)
		} else if (node.inHeader === false) {
			footerNav.push(node)
		}
	})
	return (
		<WindowDimensionsProvider>
			<HeaderContextProvider value={logo}>
				<Header nav={headerNav} />
			</HeaderContextProvider>
			<main>{children}</main>
			<EmailSignupChapter />
			<Footer nav={footerNav} />
		</WindowDimensionsProvider>
	)
}

export default LayoutChapter
