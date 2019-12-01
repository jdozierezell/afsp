import { graphql } from 'gatsby'

export const ParentList = graphql`
	fragment ParentList on DatoCmsUnionForDatoCmsDetailParentPage {
		... on DatoCmsLanding {
			__typename
			title
			slug
		}
		... on DatoCmsDetail {
			__typename
			title
			slug
			parentPage {
				... on DatoCmsLanding {
					__typename
					title
					slug
				}
				... on DatoCmsDetail {
					__typename
					title
					slug
					parentPage {
						... on DatoCmsLanding {
							__typename
							title
							slug
						}
						... on DatoCmsDetail {
							__typename
							title
							slug
							parentPage {
								... on DatoCmsDetail {
									__typename
									title
									slug
								}
							}
						}
					}
				}
			}
		}
	}
`
