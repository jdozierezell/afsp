import React, { useState } from 'react'
import qs from 'qs'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import HeroImage from '../components/Hero/HeroImage'
import SearchQuilts from '../components/Search/SearchQuilts'

import { styles } from '../css/css'

const containerCSS = css`
	margin: ${styles.scale.px24};
	h3 a {
		font-family: ${styles.fonts.avenirBold};
		font-size: ${styles.scale.px22};
	}
	@media (min-width: ${styles.screens.tablet}px) {
		margin: ${styles.scale.px24} ${styles.scale.px50};
	}
`

const Quilt = ({ data: { quiltQuery } }) => {
	const urlParams =
		typeof window !== `undefined`
			? qs.parse(window.location.search.slice(1))
			: null
	const [searchState, setSearchState] = useState(
		urlParams
			? { query: urlParams.query, quilt: urlParams.quilt }
			: { query: '', quilt: '' }
	)
	const hasQuery = searchState.query ? searchState.query : '' // running a check here prevents undefined error
	const [visibility, setVisibility] = useState(
		hasQuery.length === 0 ? 'inherit' : 'hidden'
	)

	const handleSearchChange = event => {
		setSearchState({
			query: event.target.value,
		})
		// https://gist.github.com/excalq/2961415#gistcomment-2221360
		const params = new URLSearchParams(searchState)
		params.set('query', event.target.value)
		window.history.replaceState(
			{},
			'',
			`${window.location.pathname}?${params}`
		)
	}
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={quiltQuery.seoMetaTags}
		>
			<HeroImage
				title={quiltQuery.title}
				heroImage={quiltQuery.heroImage}
			/>
			<main css={containerCSS}>
				<h3 dangerouslySetInnerHTML={{ __html: quiltQuery.brief }}></h3>
				<SearchQuilts
					visibility={visibility}
					searchState={searchState}
					handleSearchChange={handleSearchChange}
				/>
			</main>
		</Layout>
	)
}

export default Quilt

export const query = graphql`
	query {
		quiltQuery: datoCmsQuilt(slug: { eq: "quilt" }) {
			title
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			heroImage {
				url
				fluid(
					maxWidth: 769
					imgixParams: {
						auto: "format"
						fit: "crop"
						crop: "faces"
						w: "769"
						h: "475"
					}
				) {
					...GatsbyDatoCmsFluid_noBase64
				}
			}
			brief
		}
	}
`
