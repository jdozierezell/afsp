const customImageSize = (image, standard, custom) => {
	const standardFallback = image.images.fallback
	const maxWidthCalc = custom.width / standard.width
	const customWidth = Math.round(custom.width / maxWidthCalc)
	const customHeight = Math.round(custom.height / maxWidthCalc)
	return {
		width: customWidth,
		height: customHeight,
		layout: image.layout,
		images: {
			width: customWidth,
			sources: image.images.sources,
			layout: image.layout,
			fallback: {
				sizes: standardFallback.sizes,
				src: standardFallback.src.replace(
					new RegExp(standard.height, 'g'),
					customHeight
				),
				srcSet: standardFallback.srcSet.replace(
					new RegExp(standard.height, 'g'),
					customHeight
				),
			},
		},
	}
	// const customFallback =
	// image.images[0].gatsbyImageData.width = customWidth
	// image.images[0].gatsbyImageData.height = customHeight
	// image.images[0].gatsbyImageData.images.fallback = customFallback
}

export default customImageSize
