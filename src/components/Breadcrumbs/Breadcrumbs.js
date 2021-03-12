import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'

import buildUrl from '../../utils/buildUrl'

import { styles } from '../../css/css'

const breadcrumbCSS = css`
	list-style: none;
	margin: 0;
	max-width: 623px;
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
	breadcrumbs.forEach(crumb => {
		crumb.title = crumb.title.replace('<br />', ' ')
	})
	return (
		<ul css={breadcrumbCSS}>
			{breadcrumbs.map((crumb, index) => {
				return (
					crumb && (
						<li key={index}>
							<Link to={buildUrl(crumb.type, crumb.slug)}>
								<span
									dangerouslySetInnerHTML={{
										__html: crumb.title,
									}}
								></span>
							</Link>
						</li>
					)
				)
			})}
			<li>{child}</li>
		</ul>
	)
}

export default Breadcrumbs
