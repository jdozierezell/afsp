import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import fetch from 'isomorphic-fetch'
import { css } from '@emotion/core'

import createAnchor from '../../utils/createAnchor'
import buildUrl from '../../utils/buildUrl'

import { styles } from '../../css/css'

const programHeadingCSS = css`
	font-size: ${styles.scale.px36};
	margin: ${styles.scale.px50} 0 ${styles.scale.px35};
	@media (min-width: ${styles.screens.mobile}px) {
		font-size: ${styles.scale.px44};
		margin: ${styles.scale.px80} 0 ${styles.scale.px40};
	}
	a {
		font-family: ${styles.fonts.paul};
		font-size: ${styles.scale.px36};
	}
`

const eventCSS = css`
	margin-bottom: ${styles.scale.px36};
	:last-of-type {
		margin-bottom: 0;
	}
`

const ContentEvent = ({ setEvents, programName }) => {
	const awsProgramName = programName.replace(/ /g, '-')
	const [programEvents, setProgramEvents] = useState([])

	const chapters = useStaticQuery(graphql`
		query {
			info: allDatoCmsChapterInfo {
				edges {
					node {
						title
						chapterDonorDriveId
					}
				}
			}
		}
	`)

	useEffect(() => {
		fetch(
			`//aws-fetch.s3.amazonaws.com/events/merged-events-${awsProgramName}.json`
		)
			.then(response => {
				if (response.status >= 400) {
					throw new Error('Bad response from server')
				}
				return response.json()
			})
			.then(response => {
				if (response.length && response.length > 0) {
					setEvents(true)
				}
				setProgramEvents(response)
			})
	}, [awsProgramName])
	return (
		<>
			{programEvents.length > 0 && (
				<div id={`${createAnchor(programName)}-events`}>
					<h2 css={programHeadingCSS}>
						Upcoming {programName} events
					</h2>
					{programEvents.map((event, index) => {
						let chapterArray = []
						chapters.info.edges.forEach(chapter => {
							chapter.node.chapterDonorDriveId = chapter.node.chapterDonorDriveId.replace(
								' ',
								''
							)
							if (typeof event.chapterCode === 'string') {
								event.chapterCode = event.chapterCode.replace(
									' ',
									''
								)
								if (
									chapter.node.chapterDonorDriveId ===
									event.chapterCode
								) {
									chapterArray.push({
										name: chapter.node.title,
										url: `https://afsp.org/${buildUrl(
											'chapter',
											createAnchor(chapter.node.title)
										)}`,
									})
								}
							} else {
								event.chapterCode.forEach(code => {
									code = code.replace(' ', '')
									if (
										chapter.node.chapterDonorDriveId ===
										code
									) {
										chapterArray.push({
											name: chapter.node.title,
											url: `https://afsp.org/${buildUrl(
												'chapter',
												createAnchor(chapter.node.title)
											)}`,
										})
									}
								})
							}
						})
						return (
							<div css={eventCSS} key={index}>
								<h4
									css={css`
										margin-bottom: ${styles.scale.px12};
									`}
								>
									<a
										href={event.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										{event.title}
									</a>
								</h4>
								<p>
									{chapterArray.length > 0 && (
										<span>
											Presented by the{' '}
											{chapterArray.map(
												(chapter, index) => {
													return (
														<span key={index}>
															<a
																href={
																	chapter.url
																}
															>
																AFSP{' '}
																{chapter.name}{' '}
																Chapter
															</a>
															{index <
																chapterArray.length -
																	2 && (
																<span>, </span>
															)}
															{index ===
																chapterArray.length -
																	2 && (
																<span>
																	{' '}
																	and{' '}
																</span>
															)}
														</span>
													)
												}
											)}
										</span>
									)}
									{chapterArray.length > 0 && <br />}
									{event.date}
									{event.venue !== ''
										? ` ● ${event.venue}`
										: ''}
								</p>
							</div>
						)
					})}
				</div>
			)}
		</>
	)
}

export default ContentEvent
