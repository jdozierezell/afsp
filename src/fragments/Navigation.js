import { graphql } from 'gatsby'

export const Navigation = graphql`
	fragment Navigation on DatoCmsNavigationConnection {
		edges {
			node {
				id
				inHeader
				displayTitle
				displayLink {
					... on DatoCmsLanding {
						__typename
						slug
					}
					... on DatoCmsRealStory {
						__typename
						slug
					}
					... on DatoCmsSearchPage {
						__typename
						slug
					}
				}
				navigationItem {
					... on DatoCmsChildItem {
						__typename
						childHeading
						childLink {
							... on DatoCmsLanding {
								__typename
								slug
							}
							... on DatoCmsDetail {
								__typename
								slug
							}
							... on DatoCmsSearchPage {
								__typename
								slug
							}
							... on DatoCmsPartnerPage {
								__typename
								slug
							}
							... on DatoCmsStatistic {
								__typename
								slug
							}
							... on DatoCmsDetailTagged {
								__typename
								slug
							}
							... on DatoCmsStory {
								__typename
								slug
							}
							... on DatoCmsCalendar {
								__typename
								slug
							}
							... on DatoCmsStateFactsPage {
								__typename
								slug
							}
						}
						childExternalLink
					}
					... on DatoCmsFeaturedItem {
						__typename
						featuredHeading
						featuredLink {
							__typename
							... on DatoCmsDetail {
								slug
								seo {
									image {
										url
									}
								}
							}
							... on DatoCmsLanding {
								slug
								seo {
									image {
										url
									}
								}
							}
							... on DatoCmsPartnerPage {
								slug
								seo {
									image {
										url
									}
								}
							}
							... on DatoCmsStatistic {
								slug
								seo {
									image {
										url
									}
								}
							}
							... on DatoCmsDetailTagged {
								slug
								seo {
									image {
										url
									}
								}
							}
							... on DatoCmsCalendar {
								slug
								seo {
									image {
										url
									}
								}
							}
						}
					}
				}
			}
		}
	}
`
