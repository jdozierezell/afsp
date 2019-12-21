import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header/Header'
import EmailSignup from './EmailSignup/EmailSignup'
import Footer from './Footer/Footer'

const Layout = ({ theme, children }) => {
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
			<Header nav={headerNav} theme={theme} />
			<main>{children}</main>
			<EmailSignup formId="KxgQRb">
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
