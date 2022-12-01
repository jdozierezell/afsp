import React from 'react'
import { Script } from 'gatsby'
import lifesaver from '../SVGs/Lifesaver.svg'

export const SEO = ({ meta, structuredData, children }) => {
	return (
		<>
			<script
				type="osano-blocking"
				src="https://cmp.osano.com/AzqSHrT3nT9b72sZY/7f1727dd-94d7-47d2-834c-a78ee90e83c7/osano.js"
			></script>
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
			<meta property="og:url" content={`${structuredData.url}/`} />
			<meta property="fb:app_id" content="925475567867156" />
			<link rel="icon" href={lifesaver} />
			<Script type="application/ld+json">
				{JSON.stringify(structuredData)}
			</Script>
			{children}
		</>
	)
}
