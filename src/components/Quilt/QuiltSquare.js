import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { useSpring, animated as a } from 'react-spring'
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
	const scale = isSelected ? 2 : 1
	const top = isSelected ? 20 : 0

	const trans = s => `perspective(600px) scale(${s})`

	const [props, set] = useSpring(() => ({
		scale: 1,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		config: { mass: 5, tension: 350, friction: 40 },
	}))

	useEffect(() => console.log(`${isSelected} ${quilt.id}`))

	return (
		<a.div
			style={{
				transform: props.scale.interpolate(
					scale => `perspective(600px) scale(${scale})`
				),
				top: props.top.interpolate(top => `${top}px`),
			}}
			css={squareCSS}
			key={quilt.id}
			id={quilt.id}
			className={`quilt-col-${(index + 5) % 5}`}
			onClick={({ clientX: x, clientY: y }) => {
				// update the window history to provide a deep link to quilt square
				// setIsSelected(!isSelected)
				window.history.pushState(
					{ id: quilt.id }, // give history state an id
					`Memory Quilt | ${quilt.title}`, // give page a title
					`?q=${quilt.id}` // create the new url with variables to base on render
				)
				set({ scale: scale, top: top })
				console.log('clicked div')
			}}
		>
			<img
				css={imageCSS}
				onClick={() => {
					// handleClick lets parent know which element was clicked on
					handleClick(quilt.id)
					console.log('clicked img')
				}}
				src={`${quilt.quiltImage.url}?w=1080&h=1080&fit=crop&crop=faces`}
				alt=""
			/>
		</a.div>
	)
}

export default QuiltSquare
