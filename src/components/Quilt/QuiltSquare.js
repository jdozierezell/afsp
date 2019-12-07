import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/core'
import { useSpring, animated as a } from 'react-spring'

import { useWindowDimensions } from '../WindowDimensionsProvider'

import { styles } from '../../css/css'

const squareCSS = css`
	margin: 0;
	padding: 0;
	position: relative;
`

const imageCSS = css`
	display: block;
	margin: 0;
	padding: 0;
	width: 100%;
`

const QuiltSquare = ({ quilt, selected, handleClick, index }) => {
	const isSelected = quilt.id === selected
	const percentSize = 50

	const [edges, setEdges] = useState({ top: 0, left: 0 })
	const [squareSize, setSize] = useState(0)
	const squareRef = useRef(null)

	const { width, height } = useWindowDimensions()
	const { transform, top, left, size } = useSpring({
		top: isSelected ? edges.top : 'auto',
		left: isSelected ? edges.left : 'auto',
		size: isSelected ? squareSize : 'auto',
		transform: `perspective(600px) scale(${isSelected ? 2 : 1})`,
		config: { mass: 5, tension: 500, friction: 80 },
	})

	useEffect(() => {
		if (isSelected) {
			setSize(
				width > height
					? (height / 100) * percentSize
					: (width / 100) * percentSize
			)
			setEdges({
				top: squareRef.current.getBoundingClientRect().top,
				left: squareRef.current.getBoundingClientRect().left,
			})
		}
	}, [isSelected, height, width])

	return (
		<a.div
			ref={squareRef}
			style={{ transform, top, left, size }}
			css={squareCSS}
			key={quilt.id}
			id={quilt.id}
			className={`quilt-col-${(index + 5) % 5}`}
			onClick={() => {
				// update the window history to provide a deep link to quilt square
				window.history.pushState(
					{ id: quilt.id }, // give history state an id
					`Memory Quilt | ${quilt.title}`, // give page a title
					`?q=${quilt.id}` // create the new url with variables to base on render
				)
				handleClick(quilt.id)
			}}
		>
			<img
				css={imageCSS}
				src={`${quilt.quiltImage.url}?w=1080&h=1080&fit=crop&crop=faces`}
				alt=""
			/>
		</a.div>
	)
}

export default QuiltSquare
