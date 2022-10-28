import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header/Header'
import EmailSignupBar from './EmailSignup/EmailSignupBar'
import Footer from './Footer/Footer'

const Layout = ({
	theme,
	overrideLight,
	children,
	hideEmailLayout,
	customPadding,
}) => {
	const data = useStaticQuery(graphql`
		query {
			nav: allDatoCmsNavigation(sort: { fields: position, order: ASC }) {
				...Navigation
			}
			site: datoCmsSite {
				faviconMetaTags {
					...GatsbyDatoCmsFaviconMetaTags
				}
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
			<Header
				nav={headerNav}
				theme={theme}
				overrideLight={overrideLight}
				showCampaign={false}
			/>
			<main id="main">{children}</main>
			{!hideEmailLayout && <EmailSignupBar></EmailSignupBar>}
			<Footer nav={footerNav} customPadding={customPadding} />
		</>
	)
}

export default Layout
