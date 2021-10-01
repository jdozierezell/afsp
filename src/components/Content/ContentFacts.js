import React from 'react'
import { css } from '@emotion/react'

import IconCircleCheck from '../SVGs/IconCircleCheck'
import IconCircleCircle from '../SVGs/IconCircleCircle'
import IconCircleX from '../SVGs/IconCircleX'

import { styles } from '../../css/css'

const sectionHeadingCSS = css`
	font-size: ${styles.scale.px36};
	margin: ${styles.scale.px50} 0 ${styles.scale.px35};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} 0 ${styles.scale.px40};
	}
`
const keyCSS = css`
	list-style: none;
	margin: 0;
	@media (min-width: ${styles.screens.mobile}px) {
		display: grid;
		grid-column-gap: ${styles.gridGap.desktop};
		grid-template-columns: 1fr 1fr;
	}
	li {
		display: grid;
		grid-gap: ${styles.gridGap.desktop};
		grid-template-columns: ${styles.scale.px36} 1fr;
	}
`
const factListCSS = css`
	list-style: none;
	margin: 0;
	li {
		display: grid;
		grid-gap: ${styles.gridGap.desktop};
		grid-template-columns: ${styles.scale.px36} 1fr;
	}
`

const ContentFacts = ({ state, facts }) => {
	return (
		<div>
			<div>
				<h2 css={sectionHeadingCSS}>Legislation in {state}</h2>
				<h4>Key:</h4>
				<ul css={keyCSS}>
					<li>
						<IconCircleX
							color={styles.colors.poppy}
							iconCSS={css`
								width: ${styles.scale.px24};
							`}
						></IconCircleX>
						<span>Legislation not in place</span>
					</li>
					<li>
						<IconCircleCheck
							color={styles.colors.green}
							iconCSS={css`
								width: ${styles.scale.px24};
							`}
						></IconCircleCheck>
						<span>Legislation in place</span>
					</li>
					<li>
						<IconCircleCircle
							color={styles.colors.yellow}
							iconCSS={css`
								width: ${styles.scale.px24};
							`}
						></IconCircleCircle>
						<span>Encouraged by legislation</span>
					</li>
					<li>
						<IconCircleCircle
							color={styles.colors.green}
							iconCSS={css`
								width: ${styles.scale.px24};
							`}
						></IconCircleCircle>
						<span>Required by legislation</span>
					</li>
				</ul>
			</div>
			{facts.map((fact, index) => {
				if (fact.public || fact.private) {
					return (
						<div key={index}>
							<h3 id={fact.anchor}>{fact.display}</h3>
							{fact.public && (
								<>
									<h4>{fact.public.display}</h4>
								</>
							)}
							{fact.private && (
								<>
									<h4>{fact.private.display}</h4>
								</>
							)}
						</div>
					)
				} else {
					return (
						<div key={index}>
							<h3 id={fact.anchor}>{fact.display}</h3>
							<ul css={factListCSS}>
								{fact.facts.map((fact, index) => {
									return (
										<li key={index}>
											<span>
												{fact.value === false && (
													<IconCircleX
														color={
															styles.colors.poppy
														}
														iconCSS={css`
															width: ${styles
																.scale.px24};
														`}
													></IconCircleX>
												)}
												{fact.value === 'None' && (
													<IconCircleX
														color={
															styles.colors.poppy
														}
														iconCSS={css`
															width: ${styles
																.scale.px24};
														`}
													></IconCircleX>
												)}
												{fact.value === true && (
													<IconCircleCheck
														color={
															styles.colors.green
														}
														iconCSS={css`
															width: ${styles
																.scale.px24};
														`}
													></IconCircleCheck>
												)}
												{fact.value ===
													'Encouraged' && (
													<IconCircleCircle
														color={
															styles.colors.yellow
														}
														iconCSS={css`
															width: ${styles
																.scale.px24};
														`}
													></IconCircleCircle>
												)}
												{fact.value === 'Required' && (
													<IconCircleCircle
														color={
															styles.colors.green
														}
														iconCSS={css`
															width: ${styles
																.scale.px24};
														`}
													></IconCircleCircle>
												)}
											</span>
											<span>{fact.display}</span>
										</li>
									)
								})}
							</ul>
						</div>
					)
				}
			})}
		</div>
	)
}

export default ContentFacts
