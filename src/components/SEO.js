/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import Helmet from 'react-helmet'

const SEO = ({ lang, meta }) => {
	console.log(meta)
	const tags = meta.tags
	let title,
		description,
		ogTitle,
		ogDescription,
		ogType,
		ogLocale,
		ogSiteName,
		ogImage,
		articleModifiedTime,
		articlePublishedTime,
		articlePublisher,
		twitterCard,
		twitterTitle,
		twitterDescription,
		twitterImage = ''

	tags.forEach(tag => {
		if (tag.tagName === 'title') {
			title = tag.content
		} else if (tag.tagName === 'meta') {
			if (tag.attributes.property === 'og:title') {
				ogTitle = tag.attributes.content
			} else if (tag.attributes.property === 'og:description') {
				ogDescription = tag.attributes.content
			} else if (tag.attributes.property === 'og:type') {
				ogType = tag.attributes.content
			} else if (tag.attributes.property === 'og:locale') {
				ogLocale = tag.attributes.content
			} else if (tag.attributes.property === 'og:site_name') {
				ogSiteName = tag.attributes.content
			} else if (tag.attributes.property === 'og:image') {
				ogImage = tag.attributes.content
			} else if (tag.attributes.property === 'article:modified_time') {
				articleModifiedTime = tag.attributes.content
			} else if (tag.attributes.property === 'article:published_time') {
				articlePublishedTime = tag.attributes.content
			} else if (tag.attributes.property === 'article:publisher') {
				articlePublisher = tag.attributes.content
			}

			if (tag.attributes.name === 'description') {
				description = tag.attributes.content
			} else if (tag.attributes.name === 'twitter:card') {
				twitterCard = tag.attributes.content
			} else if (tag.attributes.name === 'twitter:title') {
				twitterTitle = tag.attributes.content
			} else if (tag.attributes.name === 'twitter:description') {
				twitterDescription = tag.attributes.content
			} else if (tag.attributes.name === 'twitter:image') {
				twitterImage = tag.attributes.content
			}
		}
	})
	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title}
			// titleTemplate={`%s | ${site.siteMetadata.title}`}
			meta={[
				{
					name: `description`,
					content: description,
				},
				{
					property: `og:title`,
					content: ogTitle,
				},
				{
					property: `og:description`,
					content: ogDescription,
				},
				{
					property: `og:type`,
					content: ogType,
				},
				{
					property: `og:locale`,
					content: ogLocale,
				},
				{
					property: `og:site_name`,
					content: ogSiteName,
				},
				{
					property: `og:image`,
					content: ogImage,
				},
				{
					property: `article:modified_time`,
					content: articleModifiedTime,
				},
				{
					property: `article:published_time`,
					content: articlePublishedTime,
				},
				{
					property: `article:publisher`,
					content: articlePublisher,
				},
				{
					name: `twitter:card`,
					content: twitterCard,
				},
				{
					name: `twitter:creator`,
					content: `@afspnational`,
				},
				{
					name: `twitter:title`,
					content: twitterTitle,
				},
				{
					name: `twitter:description`,
					content: twitterDescription,
				},
				{
					name: `twitter:image`,
					content: twitterImage,
				},
			].concat(meta)}
		/>
	)
}

export default SEO
