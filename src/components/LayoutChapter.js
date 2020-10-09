import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import Header from './Header/Header'
import InstagramFeed from '../components/Social/InstagramFeed'
import EmailSignup from './EmailSignup/EmailSignup'
import Footer from './Footer/Footer'

const LayoutChapter = ({
	theme,
	overrideLight,
	instagram,
	email,
	children,
	seo,
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
			<HelmetDatoCms seo={seo} favicon={data.site.faviconMetaTags}>
				<html lang="en" />
			</HelmetDatoCms>
			<Header
				nav={headerNav}
				theme={theme}
				overrideLight={overrideLight}
			/>
			<main id="main">{children}</main>
			{instagram && <InstagramFeed instaClass={instagram} />}
			{email && (
				<EmailSignup formId={email}>
					<div>
						<h2 id="klaviyo-signup">Sign up for chapter news</h2>
					</div>
				</EmailSignup>
			)}
			<Footer nav={footerNav} />
		</>
	)
}

export default LayoutChapter
