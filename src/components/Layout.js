import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Script from 'react-load-script'

import Header from './Header/Header'
import EmailSignup from './EmailSignup/EmailSignup'
import Footer from './Footer/Footer'

const Layout = ({
	theme,
	overrideLight,
	children,
	seo,
	facebook,
	structuredData,
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
				{facebook && (
					<meta property="fb:app_id" content="925475567867156" />
				)}
				<script type="application/ld+json">
					{JSON.stringify(structuredData)}
				</script>
			</HelmetDatoCms>
			<Header
				nav={headerNav}
				theme={theme}
				overrideLight={overrideLight}
			/>
			<main id="main">{children}</main>
			<EmailSignup formId="M2qiJq">
				<div>
					<h2 id="klaviyo-signup">Sign up for email alerts</h2>
					<p>
						Receive updates from the American Foundation for Suicide
						Prevention
					</p>
				</div>
			</EmailSignup>
			<Footer nav={footerNav} />
			<Script
				attributes={{
					async: '',
					type: 'text/javascript',
				}}
				url="//static.klaviyo.com/onsite/js/klaviyo.js?company_id=JXzNvL"
			/>
		</>
	)
}

export default Layout
