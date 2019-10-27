import React from 'react'

import CTAVideo from './CTAVideo'
import CTAWithDescription from './CTAWithDescription'
import CTANoDescription from './CTANoDescription'

const CTAContainer = ({ cta }) => {
	return (
		<>
			{cta.__typename === 'DatoCmsCtaVideo' && <CTAVideo cta={cta} />}
			{cta.__typename === 'DatoCmsCtaWithDescription' && (
				<CTAWithDescription cta={cta} />
			)}
			{cta.__typename === 'DatoCmsCtaNoDescription' && (
				<CTANoDescription cta={cta} />
			)}
		</>
	)
}

export default CTAContainer
