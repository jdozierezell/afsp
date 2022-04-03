import React, { useRef, useEffect, useState } from 'react'
import { css } from '@emotion/react'

import IconCircleCheck from '../SVGs/IconCircleCheck'
import IconCircleX from '../SVGs/IconCircleX'

import Fact from './Fact.js'

import { styles } from '../../css/css'

const sectionHeadingCSS = css`
	font-size: ${styles.scale.px36};
	margin: ${styles.scale.px40} 0 ${styles.scale.px35};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px46} 0 ${styles.scale.px40};
	}
`
const subSectionCSS = css`
	font-size: ${styles.scale.px24};
	margin: ${styles.scale.px36} 0 ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px46} 0 ${styles.scale.px36};
	}
`
const subSubCSS = css`
	font-size: ${styles.scale.px20};
	margin: ${styles.scale.px24} 0 ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px36} 0 ${styles.scale.px36};
	}
`
const keyCSS = css`
	list-style: none;
	margin: 0;
	@media (min-width: ${styles.screens.mobile}px) {
		display: grid;
		grid-column-gap: ${styles.gridGap.desktop};
		grid-template-columns: 1fr 1fr 1fr;
	}
	li {
		display: grid;
		grid-gap: ${styles.gridGap.desktop};
		grid-template-columns: ${styles.scale.px24} 1fr;
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
	const keyElement = useRef(null)
	const factElement = useRef(null)
	const [position, setPosition] = useState('relative')
	const [top, setTop] = useState(0)
	const [width, setWidth] = useState('100%')

	let exceptions = 0
	let exceptionArray = []

	const handleScroll = () => {
		if (
			keyElement.current.getBoundingClientRect().y <= 50 &&
			factElement.current.getBoundingClientRect().y <= 340
		) {
			setPosition('fixed')
			setTop(`${keyElement.current.getBoundingClientRect().height}px`)
			setWidth(`${factElement.current.getBoundingClientRect().width}px`)
		} else {
			setPosition('relative')
			setTop(0)
			setWidth('100%')
		}
	}

	useEffect(() => {
		handleScroll()
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})

	return (
		<div>
			<div
				ref={keyElement}
				css={css`
					position: ${position};
					top: 0;
					background-color: ${styles.colors.white};
					z-index: 1;
					width: ${width};
				`}
			>
				<h2 css={sectionHeadingCSS}>{state} laws</h2>
				<h4>Key:</h4>
				<ul css={keyCSS}>
					<li>
						<IconCircleX
							color={styles.colors.poppy}
							iconCSS={css`
								width: ${styles.scale.px24};
							`}
						></IconCircleX>
						<span>No law in place</span>
					</li>
					<li>
						<IconCircleCheck
							color={styles.colors.yellow}
							iconCSS={css`
								width: ${styles.scale.px24};
							`}
						></IconCircleCheck>
						<span>Encouraged by Law</span>
					</li>
					<li>
						<IconCircleCheck
							color={styles.colors.green}
							iconCSS={css`
								width: ${styles.scale.px24};
							`}
						></IconCircleCheck>
						<span>Required by Law</span>
					</li>
				</ul>
			</div>
			<div>
				{facts.map((fact, index) => {
					return (
						<div
							key={index}
							css={css`
								position: relative;
								top: ${top};
							`}
							ref={index === 0 ? factElement : null}
						>
							<h3
								id={fact.anchor}
								css={css`
									${subSectionCSS};
									scroll-margin-top: ${top};
								`}
							>
								{fact.display}
							</h3>
							<ul css={factListCSS}>
								{fact.facts.map((fact, index) => {
									if (
										fact.display ===
											'Student education on mental health' &&
										fact.value === 'None'
									) {
										return
									} else {
										if (fact.exception) {
											exceptions++
											exceptionArray.push(fact.exception)
										}

										return (
											<Fact
												fact={fact}
												key={index}
												exception={
													fact.exception
														? exceptions
														: null
												}
											></Fact>
										)
									}
								})}
							</ul>
						</div>
					)
				})}
				<span
					css={css`
						display: inline-block;
						margin-bottom: ${top};
					`}
				></span>
			</div>
		</div>
	)
}

export default ContentFacts
