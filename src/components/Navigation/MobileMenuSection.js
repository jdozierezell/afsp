import React, { useState, useRef, useEffect } from 'react'
import { css } from '@emotion/core'
import { useSpring, animated } from 'react-spring'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import IconCaret from '../SVGs/IconCaret'

import { styles } from '../../css/css'

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

const iconCaretCSS = css`
	background-color: transparent;
	border: none;
	padding: 0;
	cursor: pointer;
	svg {
		width: ${styles.scale.px18};
	}
`

const menuListCSS = css`
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

const MenuSection = ({ item }) => {
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
	if (!item) return <div ref={listRef}></div> // component is rendering extra empty return. this stops that.
	return (
		<>
			<div css={menuTitleCSS}>
				<h2>{item.displayTitle}</h2>
				{item.navigationItem.length >= 1 && (
					<animated.button
						css={iconCaretCSS}
						style={flipCaret}
						onClick={() => setCaretFlipped(!isCaretFlipped)}
					>
						<IconCaret color={styles.colors.white} />
					</animated.button>
				)}
			</div>
			<animated.ul css={menuListCSS} style={showList} ref={listRef}>
				{item.navigationItem.map(navItem => {
					if (navItem.__typename === 'DatoCmsChildItem') {
						let slug = ''
						switch (navItem.childLink.__typename) {
							case 'DatoCmsLanding':
								slug = '/landing'
								break
							case 'DatoCmsDetail':
								slug = '/detail'
								break
						}
						return (
							<li>
								{navItem.childExternalLink !== '' ? (
									<a href={navItem.childExternalLink}>
										{navItem.childHeading}
									</a>
								) : (
									<AniLink
										to={`${slug}/${navItem.childLink.slug}`}
									>
										{navItem.childHeading}
									</AniLink>
								)}
							</li>
						)
					} else {
						return ''
					}
				})}
			</animated.ul>
			<hr
				css={css`
					border-top: 1px solid ${styles.colors.white};
					display: block;
					margin: ${styles.scale.px30} 0;
				`}
			/>
		</>
	)
}

export default MenuSection
