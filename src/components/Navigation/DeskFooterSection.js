import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import FooterAside from '../Footer/FooterAside'

import buildUrl from '../../utils/buildUrl'

import { styles } from '../../css/css'

const headerCSS = css`
	font-size: ${styles.scale.px16};
	color: ${styles.colors.white};
`

const linkListCSS = css`
	list-style: none;
	margin: 0;
	padding: 0;
	position: relative;
	z-index: 1;
	a {
		color: ${styles.colors.white};
	}
`

const DeskFooterSection = ({ item, index, length }) => {
	return (
		<>
			<h3 css={headerCSS}>{item.displayTitle}</h3>
			<ul css={linkListCSS}>
				{item.navigationItem.map((link, index) => {
					let url = ''
					if (link.childLink) {
						url = buildUrl(
							link.childLink.__typename,
							link.childLink.slug
						)
						return (
							<li key={index}>
								<Link to={url}>{link.childHeading}</Link>
							</li>
						)
					} else if (link.childExternalLink) {
						url = link.childExternalLink
						return (
							<li key={index}>
								<a href={url}>{link.childHeading}</a>
							</li>
						)
					}
					return ''
				})}
			</ul>
			{index + 1 >= length && (
				<>
					<FooterAside aria="footer crisis resources for desktop" />
				</>
			)}
		</>
	)
}

export default DeskFooterSection
