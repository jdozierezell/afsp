import React from 'react'
import { css } from '@emotion/core'

import FooterAside from '../Footer/FooterAside'
import FooterSocials from '../Footer/FooterSocials'

import { styles } from '../../css/css'

const headerCSS = css`
	font-size: ${styles.scale.px16};
	color: ${styles.colors.white};
`

const linkListCSS = css`
	list-style: none;
	margin: 0;
	padding: 0;
	a {
		color: ${styles.colors.white};
	}
`

const DeskFooterSection = ({ item, index, length }) => {
	return (
		<>
			<h3 css={headerCSS}>{item.name}</h3>
			<ul css={linkListCSS}>
				{item.links.map((link, index) => (
					<li key={index}>
						<a href={link.url}>{link.name}</a>
					</li>
				))}
			</ul>
			{index + 1 >= length && (
				<>
					<FooterAside />
					<FooterSocials />
				</>
			)}
		</>
	)
}

export default DeskFooterSection
