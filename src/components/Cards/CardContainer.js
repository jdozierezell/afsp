import React, { useEffect } from 'react'

import CardMobileContainer from './CardMobileContainer'
import CardDesktopContainer from './CardDesktopContainer'
import { useWindowDimensions } from '../../components/WindowDimensionsProvider'

import { styles } from '../../css/css'

const chapterTempData = [
	{
		title: 'foo',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/516/316',
	},
	{
		title: 'bar',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/516/316',
	},
	{
		title: 'yay',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/516/316',
	},
	{
		title: 'hip',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/516/316',
	},
	{
		title: 'hooray',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/516/316',
	},
	{
		title: 'hooray',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/516/316',
	},
	{
		title: 'hooray',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/516/316',
	},
]

const CardContainer = ({ title }) => {
	const { width } = useWindowDimensions()
	return (
		<section>
			{width <= styles.screens.tablet && (
				<CardMobileContainer title={title} data={chapterTempData} />
			)}
			{width > styles.screens.tablet && (
				<CardDesktopContainer title={title} data={chapterTempData} />
			)}
		</section>
	)
}

export default CardContainer
