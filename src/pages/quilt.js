import React from 'react'
import { graphql } from 'gatsby'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import fetch from 'isomorphic-fetch'

import { css } from '@emotion/core'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
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
	@media (min-width: ${styles.screens.tablet}px) {
		margin: ${styles.scale.px24} ${styles.scale.px50};
	}
`

const Quilt = ({ data: { quiltQuery } }) => {
	return (
		<ApolloProvider client={client}>
			<Layout logo={styles.logo.mobileLightDesktopLight}>
				<SEO meta={quiltQuery.seoMetaTags} />
				<HeroImage data={quiltQuery} />
				<main css={containerCSS}>
					<h3>{quiltQuery.brief}</h3>
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
				tags
			}
			mobileCover: heroImage {
				fluid(
					maxWidth: 769
					imgixParams: {
						fm: "jpg"
						fit: "crop"
						crop: "faces"
						w: "769"
						h: "475"
					}
				) {
					...GatsbyDatoCmsFluid_tracedSVG
				}
			}
			desktopCover: heroImage {
				fluid(
					maxWidth: 1920
					imgixParams: {
						fm: "jpg"
						fit: "crop"
						crop: "faces"
						ar: 2.5
						w: "1920"
						blendMode: "hardlight"
						blend: "555"
					}
				) {
					...GatsbyDatoCmsFluid_tracedSVG
				}
			}
			brief
		}
	}
`
