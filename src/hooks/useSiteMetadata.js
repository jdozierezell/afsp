import { graphql, useStaticQuery } from 'gatsby'

export const useSiteMetadata = () => {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
					twitterUsername
					siteUrl
				}
			}
		}
	`)
	// image (goes above once image is defined)

	return data.site.siteMetadata
}
