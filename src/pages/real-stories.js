import React from 'react'
import { css } from '@emotion/core'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroVideo from '../components/Hero/HeroVideo'
import CTAContainer from '../components/CTAs/CTAContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'

import { styles } from '../css/css'

const RealStories = ({ data: { real } }) => {
	console.log(real)
	return (
		<Layout logo={styles.logo.mobileLightDesktopLight}>
			<SEO meta={real.seoMetaTags} />
			<HeroVideo
				videoUrl={real.heroVideoUrl}
				heading={real.heroHeading}
				brief={real.heroBrief}
				buttonCta={real.heroButtonCta}
				buttonUrl={real.heroButtonLink}
			/>
			<CTAContainer cta={real.callToAction1.callToAction[0]} />
			<CTAContainer cta={real.callToAction2.callToAction[0]} />
			<CarouselChapterContainer />
		</Layout>
	)
}

export default RealStories

export const query = graphql`
	query {
		real: datoCmsRealStory {
			seoMetaTags {
				tags
			}
			heroVideoUrl
			heroImage {
				url
			}
			heroBrief
			heroHeading
			heroButtonCta
			heroButtonLink
			callToAction1 {
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
			callToAction2 {
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
	}
`
