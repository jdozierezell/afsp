import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import { styles } from '../../css/css'

const solidHeroCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px50};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px180} ${styles.scale.px50}
			${styles.scale.px160};
	}
	li,
	h1,
	p {
		color: ${styles.colors.white};
	}
	ul {
		list-style: none;
		margin: 0;
	}
	li {
		display: inline;
		:not(:last-of-type) {
			:after {
				content: ' > ';
			}
		}
		a {
			color: ${styles.colors.white};
		}
	}
	h1 {
		margin: ${styles.scale.px35} 0;
		font-size: ${styles.scale.px36};
		max-width: 700px;
		@media (min-width: ${styles.screens.mobile}) {
			margin: ${styles.scale.px40} 0;
		}
	}
	p {
		max-width: 700px;
	}
`

const HeroSolid = ({ data, parents }) => {
	const { title, brief } = data

	return (
		<div css={solidHeroCSS}>
			{parents && parents.length > 1 && (
				<ul>
					{parents.map((parent, index) => {
						return (
							<li key={index}>
								<AniLink
									fade
									duration={0.75}
									to={`/${parent.parentPath}`}
								>
									{parent.parentTitle}
								</AniLink>
							</li>
						)
					})}
					<li>{title}</li>
				</ul>
			)}
			<h1>{title}</h1>
			<div
				dangerouslySetInnerHTML={{
					__html: brief,
				}}
			></div>
		</div>
	)
}

export default HeroSolid
