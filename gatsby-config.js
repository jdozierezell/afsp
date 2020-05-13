require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})
console.log(process.env.NODE_ENV)
console.log(process.env.PREVIEW_MODE)
module.exports = {
	siteMetadata: {
		title: `Gatsby Default Starter`,
		description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
		author: `@gatsbyjs`,
		siteUrl:
			process.env.NODE_ENV === 'development'
				? `http://localhost:8000`
				: `https://afsp.org`,
	},
	plugins: [
		`gatsby-plugin-emotion`,
		`gatsby-plugin-react-helmet`,
		// `gatsby-plugin-netlify-cache`,
		`gatsby-plugin-sitemap`,
		`gatsby-plugin-playground`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-netlify`,
		// {
		// 	resolve: `gatsby-source-filesystem`,
		// 	options: {
		// 		name: `images`,
		// 		path: `${__dirname}/src/images`,
		// 	},
		// },
		{
			resolve: `gatsby-source-datocms`,
			options: {
				apiToken: process.env.DATOCMS_API,
				previewMode:
					process.env.NODE_ENV === 'development' ? true : false,
				disableLiveReload: false,
			},
		},
		{
			resolve: 'gatsby-source-graphql',
			options: {
				typeName: 'AFSPMedia',
				fieldName: 'afspMedia',
				url: 'https://graphql.datocms.com/',
				headers: {
					Authorization: `Bearer ${process.env.DATOCMS_API}`,
				},
			},
		},
		`gatsby-plugin-client-side-redirect`, // keep it in last in list
	],
}
