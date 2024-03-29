import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { useSpring, animated as a } from 'react-spring'

import { styles } from '../../css/css'

const squareCSS = css`
	margin: 0;
	padding: 0;
	position: relative;
	z-index: 1;
	cursor: pointer;
	.quilt-title {
		opacity: 0;
		transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
	}
`

const selectedSquareCSS = css`
	z-index: 1000;
`

const unSelectedSquareCSS = css`
	:hover {
		.quilt-title {
			opacity: 1;
		}
	}
`

const imageCSS = css`
	display: block;
	margin: 0;
	padding: 0;
	width: 100%;
`

const descriptionCSS = css`
	position: absolute;
	top: calc(100% + 10px);
	left: -10px;
	right: -10px;
	font-family: ${styles.fonts.avenirRegular};
	color: ${styles.colors.white};
	background: ${styles.colors.darkGray};
	padding: ${styles.scale.px12};
	font-size: 8px;
	line-height: 10px;
	@media (min-width: ${styles.screens.tablet}px) {
		top: initial;
		bottom: 0;
		left: 0;
		right: 0;
		background: hsla(0, 0%, 14.9%, 0.7);
	}
`

const QuiltSquare = ({ quilt, selected, handleClick, index }) => {
	const isSelected = quilt.id === selected

	const [location, setLocation] = useState({ horizontal: 0, vertical: 0 })
	const [scale, setScale] = useState(1)
	const squareRef = useRef(null)
	const { transform, border } = useSpring({
		transform: isSelected
			? `translate(${location.horizontal}px, ${location.vertical}px) scale(${scale})`
			: `translate(0px, 0px) scale(1)`,
		border: isSelected ? `8px solid white` : `0px solid white`,
		config: { mass: 5, tension: 500, friction: 80 },
	})

	const resizeSelected = () => {
		// find square size at current scale
		const defaultSquareSize =
			squareRef.current.getBoundingClientRect().width
		const width = window.innerWidth
		const height = window.innerHeight
		// find desired final square size based on window size with square at 80% window
		const desiredSquareSize = width > height ? height / 1.25 : width / 1.25
		const center = {
			x:
				squareRef.current.getBoundingClientRect().left +
				defaultSquareSize / 2,
			y:
				squareRef.current.getBoundingClientRect().top +
				defaultSquareSize / 2,
		}
		const denominator = window.innerWidth > 768 ? 2 : 3
		// set the multiple of the difference between current and desired
		setScale(desiredSquareSize / defaultSquareSize)
		setLocation({
			horizontal: window.innerWidth / 2 - center.x,
			vertical: window.innerHeight / denominator - center.y,
		})
	}

	useEffect(() => {
		if (isSelected) {
			resizeSelected()
		}
	}, [isSelected])

	return (
		<a.div
			ref={squareRef}
			style={{ transform, border }}
			css={
				isSelected
					? [squareCSS, selectedSquareCSS]
					: [squareCSS, unSelectedSquareCSS]
			}
			key={quilt.id}
			id={quilt.id}
			className={`quilt-col-${(index + 6) % 6}`}
			onClick={() => {
				// update the window history to provide a deep link to quilt square
				window.history.pushState(
					{ id: quilt.id }, // give history state an id
					`Memory Quilt | ${quilt.title}`, // give page a title
					`?quilt=${quilt.id}` // create the new url with variables to base on render
				)
				if (isSelected) {
					handleClick(null)
				} else {
					handleClick(quilt.id)
				}
				resizeSelected()
			}}
		>
			<img
				css={imageCSS}
				src={`${quilt.image}?w=700&h=700&fit=crop&crop=faces`}
				alt=""
			/>
			<p
				className="quilt-title"
				css={css`
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					background: hsla(0, 0%, 100%, 0.8);
					text-align: center;
					padding: ${styles.scale.px10} ${styles.scale.px5};
				`}
			>
				{quilt.title}
			</p>
			{isSelected && (
				<div
					css={descriptionCSS}
					dangerouslySetInnerHTML={{ __html: quilt.quiltDescription }}
				></div>
			)}
		</a.div>
	)
}

export default QuiltSquare
