require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})
const previewMode = process.env.PREVIEW_MODE === 'true'
module.exports = {
	siteMetadata: {
		title: `American Foundation for Suicide Prevention`,
		description: `Save Lives and Bring Hope to Those Affected by Suicide`,
		twitterUsername: `@afspnational`,
		siteUrl:
			process.env.NODE_ENV === 'development'
				? `http://localhost:8000`
				: `https://afsp.org`,
	},
	plugins: [
		`gatsby-plugin-emotion`,
		`gatsby-plugin-playground`,
		`gatsby-plugin-image`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-netlify`,
			options: {
				// merge headers deactivated to improve site build time
				mergeSecurityHeaders: false, // boolean to turn off the default security headers
				mergeCachingHeaders: false, // boolean to turn off the default caching headers
			},
		},
		// `gatsby-plugin-remove-fingerprints`,
		`gatsby-transformer-sharp`,
		// `gatsby-plugin-use-query-params`,
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
			resolve: 'gatsby-plugin-google-tagmanager',
			options: {
				id: 'GTM-WPNNQJK',

				// Include GTM in development.
				//
				// Defaults to false meaning GTM will only be loaded in production.
				includeInDevelopment: false,

				// datalayer to be set before GTM is loaded
				// should be an object or a function that is executed in the browser
				//
				// Defaults to null
				defaultDataLayer: { platform: 'gatsby' },

				// Specify optional GTM environment details.
				// gtmAuth: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING',
				// gtmPreview: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME',
				// dataLayerName: 'YOUR_DATA_LAYER_NAME',

				// Name of the event that is triggered
				// on every Gatsby route change.
				//
				// Defaults to gatsby-route-change
				// routeChangeEventName: 'YOUR_ROUTE_CHANGE_EVENT_NAME',
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
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				excludes: ['/author/**', '/quilt_square/**', '/tag/**'],
			},
		},
		// {
		// 	resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
		// 	options: {
		// 		// devMode: true,
		// 	},
		// },
	],
}
