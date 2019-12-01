import { graphql } from 'gatsby'

export const CTAs = graphql`
	fragment CTAs on DatoCmsCallToAction {
		cta {
			callToAction {
				... on DatoCmsCtaVideo {
					__typename
					videoUrl
					heading
					brief
					linkText
					linkUrl
				}
				... on DatoCmsCtaWithDescription {
					__typename
					heading
					brief
					linkText
					linkUrl
				}
				... on DatoCmsCtaNoDescription {
					__typename
					heading
					linkText
					linkUrl
				}
			}
		}
	}
`
