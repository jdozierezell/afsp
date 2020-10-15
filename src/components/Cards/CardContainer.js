import React from 'react'

import CardDesktopContainer from './CardDesktopContainer'

const CardContainer = ({ cards, heading }) => {
	return (
		<section>
			<CardDesktopContainer cards={cards} heading={heading} />
		</section>
	)
}

export default CardContainer
