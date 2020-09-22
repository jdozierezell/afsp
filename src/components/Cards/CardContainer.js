import React from 'react'

import CardMobileContainer from './CardMobileContainer'
import CardDesktopContainer from './CardDesktopContainer'

const CardContainer = ({ cards, heading }) => {
	return (
		<section>
			{/* <CardMobileContainer cards={cards} heading={heading} /> */}
			<CardDesktopContainer cards={cards} heading={heading} />
		</section>
	)
}

export default CardContainer
