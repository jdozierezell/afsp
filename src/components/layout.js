import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header'

import '../css/layout.css'
import '../css/global.css'
import '../fonts/gatsby-afsp.css'

const Layout = ({ children }) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`)

	return (
		<>
			<Header />
			<main>{children}</main>
			<footer>
				© {new Date().getFullYear()}, Built with
				{` `}
				<a href="https://www.gatsbyjs.org">Gatsby</a>
			</footer>
		</>
	)
}

export default Layout
