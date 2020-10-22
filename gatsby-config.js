require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})
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
		`gatsby-plugin-preact`,
		// {
		// 	resolve: `gatsby-plugin-loadable-components-ssr`,
		// 	options: {
		// 		// Whether replaceHydrateFunction should call ReactDOM.hydrate or ReactDOM.render
		// 		// Defaults to ReactDOM.render on develop and ReactDOM.hydrate on build
		// 		useHydrate: true,
		// 	},
		// },
		// {
		// 	resolve: `gatsby-source-filesystem`,
		// 	options: {
		// 		name: `images`,
		// 		path: `${__dirname}/src/images`,
		// 	},
		// },
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				// The property ID; the tracking code won't be generated without it
				trackingId: 'UA-72781922-1',
				// Defines where to place the tracking script - `true` in the head and `false` in the body
				head: true,
				// Setting this parameter is optional
				anonymize: true,
				// Setting this parameter is also optional
				respectDNT: true,
				// Delays sending pageview hits on route update (in milliseconds)
				pageTransitionDelay: 0,
				// Defers execution of google analytics script after page load
				defer: true,
			},
		},
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				policy: [{ userAgent: '*', allow: '/' }],
			},
		},
		{
			resolve: `gatsby-source-datocms`,
			options: {
				apiToken: process.env.DATOCMS_API,
				previewMode:
					process.env.NODE_ENV === 'development' ? true : false,
				disableLiveReload: false,
			},
		},
		`gatsby-plugin-client-side-redirect`, // keep it in last in list
	],
}
