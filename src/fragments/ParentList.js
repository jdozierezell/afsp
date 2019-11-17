import { graphql } from 'gatsby'

export const ParentList = graphql`
	fragment ParentList on DatoCmsUnionForDatoCmsDetailParentPage {
		... on DatoCmsLanding {
			title
			slug
		}
		... on DatoCmsDetail {
			title
			slug
			parentPage {
				... on DatoCmsLanding {
					title
					slug
				}
				... on DatoCmsDetail {
					title
					slug
					parentPage {
						... on DatoCmsLanding {
							title
							slug
						}
						... on DatoCmsDetail {
							title
							slug
							parentPage {
								... on DatoCmsDetail {
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
