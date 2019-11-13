import { graphql } from 'gatsby'

export const CTAs = graphql`
	fragment CTAs on DatoCmsCallToAction {
		cta {
			callToAction {
				... on DatoCmsCtaVideo {
					videoUrl
					heading
					brief
					linkText
					linkUrl
				}
				... on DatoCmsCtaWithDescription {
					heading
					brief
					linkText
					linkUrl
				}
				... on DatoCmsCtaNoDescription {
					heading
					linkText
					linkUrl
				}
			}
		}
	}
`
