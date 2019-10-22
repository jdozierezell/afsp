import React, { useEffect } from 'react'

import CardMobileContainer from './CardMobileContainer'
import CardDesktopContainer from './CardDesktopContainer'
import { useWindowDimensions } from '../../components/WindowDimensionsProvider'

import { styles } from '../../css/css'

const CardContainer = ({ cards, heading }) => {
	const { width } = useWindowDimensions()
	return (
		<section>
			{width <= styles.screens.tablet && (
				<CardMobileContainer cards={cards} heading={heading} />
			)}
			{width > styles.screens.tablet && (
				<CardDesktopContainer cards={cards} heading={heading} />
			)}
		</section>
	)
}

export default CardContainer
