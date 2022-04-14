import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'

import { styles } from '../css/css'

// import { useEffect } from 'react'
// import { navigate } from 'gatsby'

const storyContentCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	font-family: ${styles.fonts.avenirRegular};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px50} ${styles.scale.px50} 0;
	}
`

const Redirect404 = () => {
	// useEffect(() => {
	// 	let pathString
	// 	const pathArray = window.location.pathname.split('/')
	// 	pathArray.shift()
	// 	pathString = pathArray.join('+')
	// 	pathString = pathString.replace(/-/g, '+') // the regex replacement string matches all occurrences

	// 	navigate(
	// 		`/search-results/?query=${pathString}&source=${window.location}`
	// 	)
	// }, [])
	// return null

	const structuredData = {
		'@content': 'https://schema.org',
		'@type': 'SearchAction',
		about: '404',
		description: '404',
		image: 'https://www.datocms-assets.com/12810/1565360975-stackedlogocolor.jpg?w=1000&fit=max&fm=jpg',
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: `Page Not Found | AFSP`,
		publisher: 'American Foundation for Suicide Prevention',
		url: 'https://afsp.org/404',
	}

	const data = {
		title: '404',
	}

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={{
				tags: [
					{
						tagName: 'title',
						content: `404 | AFSP`,
					},
				],
			}}
			structuredData={structuredData}
		>
			<HeroSolid data={data} />
			<section
				css={css`
					${storyContentCSS};
					max-width: 623px;
				`}
			>
				We're sorry. The page you're looking for cannot be found. Please
				use our search bar in the upper navigation to find the content
				you're looking for.
			</section>
		</Layout>
	)
}

export default Redirect404
