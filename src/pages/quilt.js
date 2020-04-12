import React from 'react'
import { graphql } from 'gatsby'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import fetch from 'isomorphic-fetch'

import { css } from '@emotion/core'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroImage from '../components/Hero/HeroImage'
import QuiltSquareContainer from '../components/Quilt/QuiltSquareContainer'

import { styles } from '../css/css'

// token for accessing afsp-quilt
const token = '17c3868770121b0a95844f825f90d8'
// create apollo client
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: 'https://graphql.datocms.com/',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		fetch,
	}),
})

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
	return (
		<ApolloProvider client={client}>
			<Layout
				theme={styles.logo.mobileLightDesktopLight}
				seo={quiltQuery.seoMetaTags}
			>
				<HeroImage data={quiltQuery} />
				<main css={containerCSS}>
					<h3
						dangerouslySetInnerHTML={{ __html: quiltQuery.brief }}
					></h3>
					<QuiltSquareContainer />
				</main>
			</Layout>
		</ApolloProvider>
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
			mobileCover: heroImage {
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
					...GatsbyDatoCmsFluid
				}
			}
			desktopCover: heroImage {
				url
				fluid(
					maxWidth: 1920
					imgixParams: {
						auto: "format"
						fit: "crop"
						crop: "faces"
						w: "1920"
						h: "768"
						blendMode: "hardlight"
						blend: "555"
					}
				) {
					...GatsbyDatoCmsFluid
				}
			}
			brief
		}
	}
`
