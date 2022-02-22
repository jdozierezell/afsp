import React from 'react'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

import CardContainer from '../Cards/CardContainer'
import CarouselDetailContainer from '../Carousels/CarouselDetailContainer'
import ContentAudio from './ContentAudio'
import Content from './Content'
import ContentEmbed from './ContentEmbed'
import ContentImage from './ContentImage'
import CarouselResourceContainer from '../Carousels/CarouselResourceContainer'
import ContentHeading from './ContentHeading'
import ContentGrid from './ContentGrid'
import ContentTweet from './ContentTweet'
import FeaturedResourcesContainer from '../FeaturedResources/FeaturedResourcesContainer'

const storyContentCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px50} ${styles.scale.px50} 0;
	}
	.secondary-button {
		margin-right: ${styles.scale.px24};
		:not(:last-child) {
			margin-bottom: 0;
		}
	}
	> a:not(:last-of-type) {
		margin-bottom: ${styles.scale.px36};
	}
`

const detailCarouselCSS = css`
	margin: ${styles.scale.px50} 0 ${styles.scale.px50} -${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: 0 0 0 -${styles.scale.px50};
	}
`

const addCSS = css`
	@media (min-width: ${styles.screens.tablet}px) {
		margin-top: ${styles.scale.px40};
		width: calc(100vw - (${styles.scale.px50} * 2));
		z-index: 500;
	}
`

const ContentGeneric = ({ setEvents, data, navigation }) => {
	const { details } = data
	const sectionWidth = !data.overrideWidth ? `calc(100vw - 555px)` : `auto`
	let adjacent = 0
	return (
		<section
			css={css`
				${storyContentCSS};
				max-width: ${!data.overrideWidth ? `623px` : `auto`};
				@media (min-width: ${styles.screens.video}px) {
					width: ${!data.overrideWidth ? sectionWidth : `auto`};
				}
			`}
		>
			{details.map((detail, index) => {
				const itemsToCheck = ['DatoCmsCardContainer']
				const prevIndex = index > 0 ? index - 1 : null
				if (
					prevIndex !== null &&
					itemsToCheck.includes(detail.__typename)
				) {
					adjacent++
				} else {
					adjacent = 0
				}
				if (detail.__typename === 'DatoCmsActionButton') {
					return (
						<a
							key={index}
							className="secondary-button"
							href={detail.buttonLink}
						>
							{detail.buttonText}
						</a>
					)
				} else if (detail.__typename === 'DatoCmsAudio') {
					return <ContentAudio key={index} audio={detail.audio} />
				} else if (detail.__typename === 'DatoCmsCardContainer') {
					return (
						<CardContainer
							key={index}
							cards={detail.cardContainerList}
							heading={detail.cardContainerHeading}
							addCSS={css`
								background-color: ${adjacent % 2 === 1
									? styles.colors.lightGray
									: styles.colors.white};
							`}
							cardCSS={css`
								background-color: ${adjacent % 2 === 1
									? styles.colors.white
									: styles.colors.lightGray};
							`}
						/>
					)
				} else if (detail.__typename === 'DatoCmsContent') {
					return (
						<Content
							key={index}
							contentHeading={detail.contentHeading}
							contentBody={detail.contentBody}
						/>
					)
				} else if (detail.__typename === 'DatoCmsDetailSquare') {
					return (
						<div
							css={css`
								${detailCarouselCSS};
								grid-column: 1 / 4;
							`}
							key={index}
						>
							<CarouselDetailContainer
								key={index}
								content={detail.detail}
							/>
						</div>
					)
				} else if (detail.__typename === 'DatoCmsEmbed') {
					return (
						<ContentEmbed
							key={index}
							embedCode={detail.embedCode}
						/>
					)
				} else if (detail.__typename === 'DatoCmsFeaturedStoryTag') {
					return null
				} else if (detail.__typename === 'DatoCmsHeading') {
					return (
						<ContentHeading
							key={index}
							heading={detail.heading}
							level={detail.headingLevel}
						/>
					)
				} else if (detail.__typename === 'DatoCmsImage') {
					return (
						<ContentImage
							key={index}
							image={detail.images}
							imagesToShow={detail.imagesToShow}
						/>
					)
				} else if (detail.__typename === 'DatoCmsResourceList') {
					if (detail.displayAsCarousel) {
						const backgroundColor =
							adjacent % 2 !== 1 || adjacent === 0
								? styles.colors.lightGray
								: styles.colors.white
						return (
							<CarouselResourceContainer
								key={index}
								listHeading={detail.listHeading}
								resources={detail.resource}
								randomize={detail.randomize}
								addCSS={css`
									${addCSS};
									background-color: ${backgroundColor};
									&:nth-of-type(2) {
										background-color: ${styles.colors
											.lightGray};
									}
								`}
							/>
						)
					} else {
						return (
							<FeaturedResourcesContainer
								key={index}
								heading={detail.listHeading}
								resources={detail.resource}
								addCSS={css`
									${addCSS};
									background-color: ${adjacent % 2 === 1
										? styles.colors.lightGray
										: styles.colors.white};
								`}
							/>
						)
					}
				} else if (detail.__typename === 'DatoCmsTable') {
					const table = JSON.parse(detail.table)
					return (
						<ContentGrid
							key={index}
							table={table}
							hideHeader={detail.hideHeader}
							tableHeader={detail.tableHeader}
						/>
					)
				} else if (detail.__typename === 'DatoCmsTweet') {
					return (
						<ContentTweet
							key={index}
							tweet={detail.tweet}
							navigation={navigation}
						/>
					)
				}
				return ''
			})}
		</section>
	)
}

export default ContentGeneric
