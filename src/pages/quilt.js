import React, { useState } from 'react'
import qs from 'qs'
import { css } from '@emotion/react'
import { graphql } from 'gatsby'

import { SEO } from '../components/SEO/SEO'
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
	const visibility = hasQuery.length === 0 ? 'inherit' : 'hidden'

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
		<Layout theme={styles.logo.mobileLightDesktopLight}>
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

export const Head = ({ data: { quiltQuery } }) => {
	let metaImage,
		metaDescription = ''

	quiltQuery.seoMetaTags.tags.forEach(tag => {
		if (tag.attributes) {
			if (
				tag.attributes.property &&
				tag.attributes.property === 'og:image'
			) {
				metaImage = tag.attributes.content
			}
			if (
				tag.attributes.property &&
				tag.attributes.property === 'og:description'
			) {
				metaDescription = tag.attributes.content
			}
		}
	})

	const structuredData = {
		'@content': 'https://schema.org',
		'@type': 'WebPage',
		about: 'suicide loss memory quilt',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: quiltQuery.title,
		author: 'American Foundation for Suicide Prevention',
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${quiltQuery.slug}`,
	}

	return <SEO structuredData={structuredData} meta={quiltQuery.seoMetaTags} />
}

export const query = graphql`
	query {
		quiltQuery: datoCmsQuilt(slug: { eq: "quilt" }) {
			title
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			heroImage {
				url
				gatsbyImageData(
					width: 769
					placeholder: NONE
					imgixParams: {
						fit: "crop"
						crop: "faces"
						w: "769"
						h: "475"
					}
				)
			}
			brief
		}
	}
`
