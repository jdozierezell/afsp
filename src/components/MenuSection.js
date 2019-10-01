import React, { useState, useRef, useEffect } from 'react'
import { css } from '@emotion/core'
import { useSpring, animated } from 'react-spring'

import CaretIcon from './CaretIcon'

import { styles } from '../css/css'

const menuTitleCSS = css`
	display: flex;
	justify-content: space-between;
	height: ${styles.scale.px22};
	h2 {
		color: ${styles.colors.white};
		font-size: ${styles.scale.px18};
		margin: 0;
	}
`

const caretIconCSS = css`
	background-color: transparent;
	border: none;
	padding: 0;
	svg {
		width: ${styles.scale.px18};
	}
`

const MenuListCSS = css`
	list-style: none;
	margin: 0px 0px;
	position: relative;
	li {
		margin-bottom: ${styles.scale.px30};
	}
	a {
		color: ${styles.colors.white};
		font-family: ${styles.fonts.paul};
		font-size: ${styles.scale.px18};
		text-decoration: solid underline ${styles.colors.white} 1px;
	}
`

const MenuSection = ({ title }) => {
	const [isCaretFlipped, setCaretFlipped] = useState(false)
	const [childrenHeight, setChildrenHeight] = useState(0)
	const listRef = useRef(null)

	const flipCaret = useSpring({
		transform: isCaretFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)',
	})

	const showList = useSpring({
		opacity: isCaretFlipped ? 1 : 0,
		maxHeight: isCaretFlipped ? `${childrenHeight}px` : '0px',
		margin: isCaretFlipped ? `${styles.scale.px60} 0px` : `0px 0px`,
	})

	useEffect(() => {
		const children = listRef.current.children
		let childHeight = 0
		for (let child of children) {
			if (childHeight < child.offsetHeight + 30) {
				childHeight = child.offsetHeight + 30 // add 30 margin based on li margin style
			}
		}
		setChildrenHeight(children.length * childHeight)
	}, [listRef])

	return (
		<div>
			<div css={menuTitleCSS}>
				<h2>{title}</h2>
				<animated.button
					css={caretIconCSS}
					style={flipCaret}
					onClick={() => setCaretFlipped(!isCaretFlipped)}
				>
					<CaretIcon color={styles.colors.white} />
				</animated.button>
			</div>
			<animated.ul css={MenuListCSS} style={showList} ref={listRef}>
				<li>
					<a href="#">Foo</a>
				</li>
				<li>
					<a href="#">Bar</a>
				</li>
				<li>
					<a href="#">Maj</a>
				</li>
				<li>
					<a href="#">Apt</a>
				</li>
				<li>
					<a href="#">Foo</a>
				</li>
			</animated.ul>
			<hr
				css={css`
					border-top: 1px solid ${styles.colors.white};
					display: block;
					margin: ${styles.scale.px30} 0;
				`}
			/>
		</div>
	)
}

export default MenuSection
