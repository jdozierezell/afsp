import React from 'react'
import lifesaver from '../SVGs/Lifesaver.svg'

export const SEO = ({ meta, structuredData, children }) => {
	return (
		<>
			{meta.tags.map((tag, index) => {
				if (tag.tagName === 'title') {
					return <title key={index}>{tag.content}</title>
				} else {
					if (tag.attributes.name) {
						return (
							<meta
								key={index}
								name={tag.attributes.name}
								content={tag.attributes.content}
							/>
						)
					} else if (tag.attributes.property) {
						return (
							<meta
								key={index}
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
