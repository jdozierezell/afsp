import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header/Header'
import InstagramFeed from '../components/Social/InstagramFeed'
import EmailSignup from './EmailSignup/EmailSignup'
import Footer from './Footer/Footer'

const LayoutChapter = ({ theme, instagram, email, children }) => {
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
			<InstagramFeed instaClass={instagram} />
			<EmailSignup formId={email}>
				<div>
					<h2>Sign up for chapter news</h2>
				</div>
			</EmailSignup>
			<Footer nav={footerNav} />
		</>
	)
}

export default LayoutChapter
