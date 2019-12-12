import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header/Header'
import EmailSignup from './EmailSignup/EmailSignup'
import Footer from './Footer/Footer'
import HeaderContextProvider from './HeaderContextProvider'

const Layout = ({ logo, children }) => {
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
	return (
		<>
			<HeaderContextProvider value={logo}>
				<Header nav={headerNav} />
			</HeaderContextProvider>
			<main>{children}</main>
			<EmailSignup formId="LGcf3Q">
				<div>
					<h2>Sign up for email alerts</h2>
					<p>Join our network and be the first to take action</p>
				</div>
			</EmailSignup>
			<Footer nav={footerNav} />
		</>
	)
}

export default Layout
