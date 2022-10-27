import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header/Header'
import InstagramFeed from '../components/Social/InstagramFeed'
import EmailSignupBar from './EmailSignup/EmailSignupBar'
import Footer from './Footer/Footer'

const LayoutChapter = ({
	theme,
	overrideLight,
	instagram,
	email,
	children,
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
			/>
			<main id="main">{children}</main>
			{instagram && <InstagramFeed instaClass={instagram} />}
			{email && <EmailSignupBar></EmailSignupBar>}
			<Footer nav={footerNav} />
		</>
	)
}

export default LayoutChapter
