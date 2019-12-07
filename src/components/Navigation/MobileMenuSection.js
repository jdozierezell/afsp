import React, { useState, useRef, useEffect } from 'react'
import { css } from '@emotion/core'
import { useSpring, animated as a } from 'react-spring'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import buildUrl from '../../utils/buildUrl'

import IconCaret from '../SVGs/IconCaret'

import { styles } from '../../css/css'

const menuTitleCSS = css`
	display: flex;
	justify-content: space-between;
	height: ${styles.scale.px22};
	h2,
	h2 > a {
		color: ${styles.colors.white};
		font-family: ${styles.fonts.paul};
		font-size: ${styles.scale.px18};
		margin: 0;
		text-decoration: none;
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
	const url = item.displayLink
		? buildUrl(item.displayLink.__typename, item.displayLink.slug)
		: null
	return (
		<>
			<div css={menuTitleCSS}>
				<h2>
					{url ? (
						<AniLink fade duration={styles.duration} to={url}>
							{item.displayTitle}
						</AniLink>
					) : (
						item.displayTitle
					)}
				</h2>
				{item.navigationItem.length >= 1 && (
					<a.button
						css={iconCaretCSS}
						style={flipCaret}
						onClick={() => setCaretFlipped(!isCaretFlipped)}
					>
						<IconCaret color={styles.colors.white} />
					</a.button>
				)}
			</div>
			<a.ul css={menuListCSS} style={showList} ref={listRef}>
				{item.navigationItem.map((navItem, index) => {
					let url = ''
					if (
						navItem.__typename === 'DatoCmsChildItem' &&
						navItem.childLink // this needs to be adjusted so that the variable doesn't fail but also allows for external urls
					) {
						url = buildUrl(
							navItem.childLink.__typename,
							navItem.childLink.slug
						)
					}
					return (
						<li key={index}>
							{navItem.childExternalLink !== '' ? (
								<a href={navItem.childExternalLink}>
									{navItem.childHeading}
								</a>
							) : (
								<AniLink
									fade
									duration={styles.duration}
									to={url}
								>
									{navItem.childHeading}
								</AniLink>
							)}
						</li>
					)
				})}
			</a.ul>
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
