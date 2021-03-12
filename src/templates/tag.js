import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import StoriesContainer from '../components/Stories/StoriesContainer'

import { styles } from '../css/css'

const Tag = ({ data: { stories }, pageContext: { title, slug } }) => {
	const heroData = {
		title: `Tagged: ${title}`,
	}
	const seoTags = {
		tags: [
			{
				tagName: 'title',
				content: `${title} | AFSP`,
			},
			{
				tagName: 'meta',
				attributes: {
					property: 'og:title',
					content: title,
				},
			},
			{
				tagName: 'meta',
				attributes: {
					name: 'twitter:title',
					content: title,
				},
			},
			{
				tagName: 'meta',
				attributes: {
					name: 'description',
					content: `Stories tagged as ${title}`,
				},
			},
			{
				tagName: 'meta',
				attributes: {
					property: 'og:description',
					content: `All stories listed on this page have been tagged as ${title}`,
				},
			},
			{
				tagName: 'meta',
				attributes: {
					name: 'twitter:description',
					content: `All stories listed on this page have been tagged as ${title}`,
				},
			},
			{
				tagName: 'meta',
				attributes: {
					property: 'og:image',
					content:
						'https://www.datocms-assets.com/12810/1565360975-stackedlogocolor.jpg?fit=max&fm=jpg&w=1000',
				},
			},
			{
				tagName: 'meta',
				attributes: {
					property: 'og:image:width',
					content: '1481',
				},
			},
			{
				tagName: 'meta',
				attributes: {
					property: 'og:image:height',
					content: '603',
				},
			},
			{
				tagName: 'meta',
				attributes: {
					property: 'og:image:alt',
					content:
						'Logo for American Foundation for Suicide Prevention',
				},
			},
			{
				tagName: 'meta',
				attributes: {
					name: 'twitter:image',
					content:
						'https://www.datocms-assets.com/12810/1565360975-stackedlogocolor.jpg?fit=max&fm=jpg&w=1000',
				},
			},
			{
				tagName: 'meta',
				attributes: {
					name: 'twitter:image:alt',
					content:
						'Logo for American Foundation for Suicide Prevention',
				},
			},
			{
				tagName: 'meta',
				attributes: {
					property: 'og:locale',
					content: 'en',
				},
			},
			{
				tagName: 'meta',
				attributes: {
					property: 'og:type',
					content: 'article',
				},
			},
			{
				tagName: 'meta',
				attributes: {
					property: 'og:site_name',
					content: 'American Foundation for Suicide Prevention',
				},
			},
			{
				tagName: 'meta',
				attributes: {
					property: 'article:publisher',
					content: 'https://facebook.com/afspnational',
				},
			},
			{
				tagName: 'meta',
				attributes: {
					name: 'twitter:card',
					content: 'summary_large_image',
				},
			},
			{
				tagName: 'meta',
				attributes: {
					name: 'twitter:site',
					content: '@afspnational',
				},
			},
		],
	}
	let metaImage,
		metaDescription = ''
	seoTags.tags.forEach(tag => {
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
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		affiliation: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/tag/${slug}`,
	}
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={seoTags}
			structuredData={structuredData}
		>
			<HeroSolid data={heroData} />
			<StoriesContainer stories={stories.edges} more={true} />
		</Layout>
	)
}

export default Tag

export const query = graphql`
	query($slug: String) {
		stories: allDatoCmsStory(
			filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
			limit: 66
			sort: { fields: publicationDate, order: DESC }
		) {
			edges {
				node {
					__typename
					id
					title
					slug
					tags {
						tag
						slug
					}
					publicationDate(formatString: "D MMM YYYY")
					author {
						authorName
					}
					seo {
						description
						image {
							url
							gatsbyImageData(
								width: 600
								placeholder: NONE
								imgixParams: {
									auto: "format"
									fit: "crop"
									crop: "faces"
									w: "600"
									h: "370"
								}
							)
						}
					}
				}
			}
		}
	}
`
