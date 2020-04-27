import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import Header from './Header/Header'
import EmailSignup from './EmailSignup/EmailSignup'
import Footer from './Footer/Footer'

const Layout = ({ theme, overrideLight, children, seo, facebook }) => {
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
			<HelmetDatoCms seo={seo} favicon={data.site.faviconMetaTags}>
				<html lang="en" />
				{facebook && (
					<meta property="fb:app_id" content="925475567867156" />
				)}
			</HelmetDatoCms>
			<Header
				nav={headerNav}
				theme={theme}
				overrideLight={overrideLight}
			/>
			<main>{children}</main>
			<EmailSignup formId="M2qiJq">
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
