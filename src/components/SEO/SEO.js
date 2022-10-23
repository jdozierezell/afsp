import React from 'react'
import lifesaver from '../SVGs/Lifesaver.svg'

export const SEO = ({ meta, structuredData, children }) => {
	return (
		<>
			{meta.tags.map(tag => {
				if (tag.tagName === 'title') {
					return <title>{tag.content}</title>
				} else {
					console.log(tag.attributes)
					if (tag.attributes.name) {
						return (
							<meta
								name={tag.attributes.name}
								content={tag.attributes.content}
							/>
						)
					} else if (tag.attributes.property) {
						return (
							<meta
								property={tag.attributes.property}
								content={tag.attributes.content}
							/>
						)
					}
				}
			})}
			<meta name="twitter:creator" content="@afspnational" />
			<link rel="icon" href={lifesaver} />
			<script type="application/ld+json">
				{JSON.stringify(structuredData)}
			</script>
			{children}
		</>
	)
}
