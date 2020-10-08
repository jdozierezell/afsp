import React, { useEffect } from 'react'
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
	useEffect(() => {
		console.log('useeffect')
		var serviceUrl = '//api.reciteme.com/asset/js?key='
		var serviceKey = '28a7fdb4e6e4925c84a1b6df2c5815f43bd9c80e'
		var options = {} // Options can be added as needed
		var autoLoad = false
		var enableFragment = '#reciteEnable'

		var loaded = [],
			frag = !1
		window.location.hash === enableFragment && (frag = !0)
		function loadScript(c, b) {
			var a = document.createElement('script')
			a.type = 'text/javascript'
			a.readyState
				? (a.onreadystatechange = function() {
						if (
							'loaded' == a.readyState ||
							'complete' == a.readyState
						)
							// eslint-disable-next-line no-unused-expressions
							(a.onreadystatechange = null), void 0 != b && b()
				  })
				: void 0 != b &&
				  (a.onload = function() {
						b()
				  })
			a.src = c
			document.getElementsByTagName('head')[0].appendChild(a)
		}
		function _rc(c) {
			c += '='
			for (var b = document.cookie.split(';'), a = 0; a < b.length; a++) {
				for (var d = b[a]; ' ' == d.charAt(0); )
					d = d.substring(1, d.length)
				if (0 == d.indexOf(c)) return d.substring(c.length, d.length)
			}
			return null
		}
		function loadService(c) {
			for (var b = serviceUrl + serviceKey, a = 0; a < loaded.length; a++)
				if (loaded[a] == b) return
			loaded.push(b)
			loadScript(serviceUrl + serviceKey, function() {
				// eslint-disable-next-line no-undef
				'function' === typeof _reciteLoaded && _reciteLoaded()
				'function' == typeof c && c()
				// eslint-disable-next-line no-undef
				Recite.load(options)
				// eslint-disable-next-line no-undef
				Recite.Event.subscribe('Recite:load', function() {
					// eslint-disable-next-line no-undef
					Recite.enable()
				})
			})
		}
		'true' == _rc('Recite.Persist') && loadService()
		if ((autoLoad && 'false' != _rc('Recite.Persist')) || frag)
			document.addEventListener
				? document.addEventListener('DOMContentLoaded', function(c) {
						loadService()
				  })
				: loadService()
		document
			.getElementById('reciteme')
			.addEventListener('click', function(i, e) {
				loadService()
				return false
			})
	}, [])
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
			<div id="reciteme" className="reciteme">
				Enable Recite
			</div>
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
