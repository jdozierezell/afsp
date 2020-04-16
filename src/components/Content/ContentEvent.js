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

const ContentEvent = ({ programName }) => {
	const awsProgramName = programName.replace(' ', '-')
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
			.then(response => setProgramEvents(response))
	}, [awsProgramName])
	return (
		<>
			{programEvents && (
				<div>
					<h2 css={programHeadingCSS}>
						Upcoming {programName} events
					</h2>
					{/* {console.log(chapters.info.edges)} */}
					{/* {console.log(programEvents)} */}
					{programEvents.map((event, index) => {
						let chapterName = ''
						console.log(event)
						chapters.info.edges.forEach(chapter => {
							chapter.node.chapterDonorDriveId = chapter.node.chapterDonorDriveId.replace(
								' ',
								''
							)
							if (
								chapter.node.chapterDonorDriveId ===
								event.chapterCode
							) {
								chapterName = chapter.node.title
							}
						})
						const chapterUrl = `https://afsp.org/
											${buildUrl('chapter', createAnchor(chapterName))}`
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
									{chapterName && (
										<span>
											Presented by the{' '}
											<a href={chapterUrl}>
												AFSP {chapterName}
												Chapter
											</a>
										</span>
									)}
									{chapterName && <br />}
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
