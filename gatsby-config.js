require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})
console.log(process.env.PREVIEW_MODE)
console.log(typeof process.env.PREVIEW_MODE)
const previewMode = process.env.PREVIEW_MODE === 'true'
console.log(previewMode)
console.log(typeof previewMode)
module.exports = {
	siteMetadata: {
		title: `American Foundation for Suicide Prevention`,
		description: `Save Lives and Bring Hope to Those Affected by Suicide`,
		author: `@jdozierezell`,
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
		// `gatsby-plugin-preact`,
		// {
		// 	resolve: 'gatsby-plugin-rollbar',
		// 	options: {
		// 		accessToken: '063b513a856c4c9ca00e3ce649c35938',
		// 		// For all configuration options, see https://docs.rollbar.com/docs/rollbarjs-configuration-reference
		// 		captureUncaught: true,
		// 		captureUnhandledRejections: true,
		// 		ignoredMessages: ['unknown'],
		// 		payload: {
		// 			environment: process.env.NODE_ENV,
		// 		},
		// 	},
		// },
		// {
		// 	resolve: '@sentry/gatsby',
		// 	options: {
		// 		dsn:
		// 			'https://716ad2d069ab4105a9dcd2226a66f587@o468082.ingest.sentry.io/5496226',
		// 		sampleRate: 1,
		// 		tracesSampleRate: 1,
		// 	},
		// },
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
				previewMode: previewMode,
				disableLiveReload: false,
			},
		},
		`gatsby-plugin-client-side-redirect`, // keep it in last in list
	],
}
