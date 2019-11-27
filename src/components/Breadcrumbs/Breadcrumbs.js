import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import buildUrl from '../../utils/buildUrl'

import { styles } from '../../css/css'

const breadcrumbCSS = css`
	list-style: none;
	margin: 0;
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
`

const Breadcrumbs = ({ parentPage, child }) => {
	let breadcrumbs = []
	if (parentPage) {
		breadcrumbs.unshift({
			title: parentPage.title,
			slug: parentPage.slug,
			type: parentPage.__typename,
		})
		if (parentPage.hasOwnProperty(parentPage)) {
			breadcrumbs.unshift({
				title: parentPage.parentPage.title,
				slug: parentPage.parentPage.slug,
				type: parentPage.parentPage.__typename,
			})
			if (parentPage.parentPage.hasOwnProperty(parentPage)) {
				breadcrumbs.unshift({
					title: parentPage.parentPage.parentPage.title,
					slug: parentPage.parentPage.parentPage.slug,
					type: parentPage.parentPage.parentPage.__typename,
				})
			}
			if (parentPage.parentPage.parentPage.hasOwnProperty(parentPage)) {
				breadcrumbs.unshift({
					title: parentPage.parentPage.parentPage.parentPage.title,
					slug: parentPage.parentPage.parentPage.parentPage.slug,
					type:
						parentPage.parentPage.parentPage.parentPage.__typename,
				})
				if (
					parentPage.parentPage.parentPage.parentPage.hasOwnProperty(
						parentPage
					)
				) {
					console.log(new Error('too much nesting'))
				}
			}
		}
	}
	return (
		<ul css={breadcrumbCSS}>
			{breadcrumbs.map((crumb, index) => {
				return (
					crumb && (
						<li key={index}>
							<AniLink
								fade
								duration={styles.duration}
								to={buildUrl(crumb.type, crumb.slug)}
							>
								{crumb.title}
							</AniLink>
						</li>
					)
				)
			})}
			<li>{child}</li>
		</ul>
	)
}

export default Breadcrumbs
