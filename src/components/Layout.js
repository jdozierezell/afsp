import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header/Header'
import EmailSignup from './EmailSignup/EmailSignup'
import Footer from './Footer/Footer'
import WindowDimensionsProvider from './WindowDimensionsProvider'
import HeaderContextProvider from './HeaderContextProvider'

import '../css/layout.css'
import '../css/global.css'
import '../fonts/gatsby-afsp.css'

const Layout = ({ logo, children }) => {
	const data = useStaticQuery(graphql`
		query {
			nav: allDatoCmsNavigation {
				edges {
					node {
						id
						inHeader
						displayTitle
						displayLink {
							... on DatoCmsLanding {
								slug
							}
							... on DatoCmsRealStory {
								slug
							}
							... on DatoCmsChapterSearch {
								slug
							}
						}
						navigationItem {
							... on DatoCmsChildItem {
								childHeading
								childLink {
									... on DatoCmsLanding {
										slug
									}
									... on DatoCmsDetail {
										slug
									}
									... on DatoCmsChapterSearch {
										slug
									}
								}
								childExternalLink
							}
							... on DatoCmsFeaturedItem {
								featuredHeading
								featuredLink {
									... on DatoCmsLanding {
										slug
										seo {
											image {
												fluid(
													maxWidth: 1080
													imgixParams: {
														fm: "jpg"
														fit: "crop"
														crop: "faces"
														ar: 1.67
														w: "1080"
													}
												) {
													...GatsbyDatoCmsFluid_tracedSVG
												}
											}
										}
									}
								}
							}
						}
					}
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
		<WindowDimensionsProvider>
			<HeaderContextProvider value={logo}>
				<Header nav={headerNav} />
			</HeaderContextProvider>
			<main>{children}</main>
			<EmailSignup />
			<Footer nav={footerNav} />
		</WindowDimensionsProvider>
	)
}

export default Layout
