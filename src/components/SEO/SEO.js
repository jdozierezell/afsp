import React from 'react'
import lifesaver from '../SVGs/Lifesaver.svg'
// test
export const SEO = ({ meta, structuredData, children }) => {
	return (
		<>
			{/* <script src="https://cmp.osano.com/AzqSHrT3nT9b72sZY/7f1727dd-94d7-47d2-834c-a78ee90e83c7/osano.js"></script> */}
			<script> window.prerenderReady = false; </script>
			<script
				dangerouslySetInnerHTML={{
					__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WPNNQJK');`,
				}}
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
			<script type="application/ld+json">
				{JSON.stringify(structuredData)}
			</script>
			{children}
		</>
	)
}
