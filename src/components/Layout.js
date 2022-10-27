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
			{/* <HelmetDatoCms seo={seo} favicon={data.site.faviconMetaTags}>
				<html lang="en" />
				<meta property="og:url" content={`${structuredData.url}/`} />
				<meta property="fb:app_id" content="925475567867156" />
				<script type="application/ld+json">
					{JSON.stringify(structuredData)}
				</script>
			</HelmetDatoCms> */}
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
