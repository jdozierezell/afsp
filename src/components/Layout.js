import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header/Header'
import EmailSignup from './EmailSignup/EmailSignup'
import Footer from './Footer/Footer'
import WindowDimensionsProvider from './WindowDimensionsProvider'
import HeaderContextProvider from './HeaderContextProvider'

const Layout = ({ logo, children }) => {
	const [showEmail, setEmail] = useState(false)
	const data = useStaticQuery(graphql`
		query {
			nav: allDatoCmsNavigation(sort: { fields: position, order: ASC }) {
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
	useEffect(() => {
		setEmail(true)
	})
	return (
		<WindowDimensionsProvider>
			<HeaderContextProvider value={logo}>
				<Header nav={headerNav} />
			</HeaderContextProvider>
			<main>{children}</main>
			{showEmail && <EmailSignup />}
			<Footer nav={footerNav} />
		</WindowDimensionsProvider>
	)
}

export default Layout
