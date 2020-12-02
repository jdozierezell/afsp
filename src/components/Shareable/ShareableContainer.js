import React, { useState, useRef, useEffect } from 'react'
import {
	Stage,
	Layer,
	Transformer,
	Text,
	Image as KonvaImage, // rename Image to KonvaImage so doesn't conflict with global Image()
} from 'react-konva'
import useImage from 'use-image'
import { css } from '@emotion/core'

import ShareableControls from './ShareableControls'

import { styles } from '../../css/css'

const konvaContainerCSS = css`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: ${styles.scale.px46};
	margin: ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: repeat(2, minmax(300px, 623px));
		margin: ${styles.scale.px80} ${styles.scale.px50};
	}
`

const konvaCSS = css`
	border: ${styles.scale.px12} solid ${styles.colors.white};
	z-index: 10;
	@media (min-width: 768px) {
		right: ${styles.scale.px50};
		border: ${styles.scale.px24} solid ${styles.colors.white};
		grid-column: 2 / 3;
		grid-row: 1 / 2;
		min-width: calc(100vw / 3);
	}
`

const shareableControlsCSS = css`
	@media (min-width: 768px) {
		grid-column: 1 / 2;
		grid-row: 1 / 2;
	}
`

const ShareableContainer = ({
	instructions,
	fileName,
	customText,
	overlays,
	backgroundImage,
}) => {
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)
	const [url, setUrl] = useState(null)
	const [image] = useImage(url)
	const [urlOverlay, setUrlOverlay] = useState(null)
	const [imageOverlay] = useImage(urlOverlay)
	const [imageWidth, setImageWidth] = useState(180)
	const [imageHeight, setImageHeight] = useState(180)
	const [imageOffsetX, setImageOffsetX] = useState(null)
	const [imageOffsetY, setImageOffsetY] = useState(null)
	const [imageRotation, setImageRotation] = useState(0)
	const [isSelected, setSelected] = useState(false)
	const [konvaPosition, setKonvaPosition] = useState(null)
	const [controlPosition, setControlPosition] = useState(null)
	const [top, setTop] = useState('220px')
	const [message, setMessage] = useState()
	const [overlayText, setOverlayText] = useState(false)
	const trRef = useRef(null)
	const imageRef = useRef(null)
	const konvaRef = useRef(null)
	const controlRef = useRef(null)

	const squareImage = 1080

	const customTextJSON = JSON.parse(customText.customValues)

	const updateImage = e => {
		// set url, imageWidth, and imageHight to null so that previous image dimensions don't affect next render
		setUrl(null)
		setImageWidth(null)
		setImageHeight(null)
		const file = e.target.files[0]
		const reader = new FileReader()
		reader.onload = () => {
			const newImage = new Image()
			newImage.src = reader.result
			setUrl(newImage.src)
			newImage.onload = () => {
				if (newImage.width >= newImage.height) {
					const imageRatio = newImage.width / newImage.height
					setImageWidth(height * imageRatio)
					setImageHeight(height)
				} else if (newImage.width < newImage.height) {
					const imageRatio = newImage.height / newImage.width
					setImageHeight(width * imageRatio)
					setImageWidth(width)
				}
			}
		}
		reader.readAsDataURL(file)
	}

	const updateOverlay = overlay => {
		// converting image to base64 to circumvent cors; more info at https://stackoverflow.com/a/20285053
		if (overlay.src) {
			overlay = overlay.src
		}
		var xhr = new XMLHttpRequest()
		xhr.onload = function() {
			var reader = new FileReader()
			reader.onloadend = function() {
				setUrlOverlay(reader.result)
			}
			reader.readAsDataURL(xhr.response)
		}
		xhr.open('GET', overlay)
		xhr.responseType = 'blob'
		xhr.send()
	}

	const updateOverlayTextColor = useDarkText => {
		setOverlayText(useDarkText)
	}

	const updateMessage = message => {
		setMessage(message)
	}

	const setStateDimensions = () => {
		if (window.innerWidth < 768) {
			setWidth(window.innerWidth - 48 - 24)
			setHeight(window.innerWidth - 48 - 24)
		} else if (window.innerWidth < 1200) {
			setWidth(window.innerWidth / 3)
			setHeight(window.innerWidth / 3)
		} else {
			setWidth(1200 - 648)
			setHeight(1200 - 648)
		}
	}

	const rotateImage = e => {
		setImageRotation(imageRotation + 90)
	}

	const downloadImage = async e => {
		setSelected(false)
		setTimeout(() => {
			const canvas = document.getElementsByTagName('canvas')
			const image = canvas[0].toDataURL('image/jpeg', 1.0)
			const a = document.createElement('a')
			a.download = fileName
			a.href = image
			a.click()
		}, 50) // timeout function gives setSelected enough time to re-render canvas so we lose the transformer handles
	}
	const handleScroll = () => {
		if (window.innerWidth >= 768) {
			if (
				// konvaRef.current.getBoundingClientRect().y <= 0 &&
				window.scrollY >= 220
			) {
				setKonvaPosition('fixed')
				setTop(0)
			} else {
				setKonvaPosition('absolute')
				setTop('220px')
			}
		} else if (window.innerWidth < 768 && window.innerWidth > 414) {
			if (window.scrollY >= 750) {
				setKonvaPosition('fixed')
				setControlPosition('relative')
				setTop(0)
			} else {
				setKonvaPosition('initial')
				setControlPosition('initial')
				setTop('220px')
			}
		} else {
			if (window.scrollY >= 550) {
				setKonvaPosition('fixed')
				setControlPosition('relative')
				setTop(0)
			} else {
				setKonvaPosition('initial')
				setControlPosition('initial')
				setTop('220px')
			}
		}
	}

	if (konvaPosition === null && typeof window !== `undefined`) {
		if (window.innerWidth < 768) {
			setKonvaPosition('initial')
		} else {
			setKonvaPosition('absolute')
		}
	}

	useEffect(() => {
		if (overlays.length < 1) {
			updateOverlay(backgroundImage)
		}
		if (isSelected) {
			// we need to attach transformer manually
			trRef.current.setNode(imageRef.current)
			trRef.current.getLayer().batchDraw()
		}
		// set image coordinates to center based on width and height
		window.addEventListener('resize', setStateDimensions)
		setImageOffsetX(imageWidth / 2)
		setImageOffsetY(imageHeight / 2)
		setStateDimensions()
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [isSelected, imageWidth, imageHeight])
	return (
		<div css={konvaContainerCSS}>
			<div
				id="konva"
				ref={konvaRef}
				css={css`
					${konvaCSS};
					top: ${top};
					position: ${konvaPosition};
				`}
			>
				<Stage
					css={css`
						background-image: url('${backgroundImage}?w=${width}');
					`}
					width={width}
					height={height}
					onMouseDown={e => {
						// deselect when clicked on empty area
						const clickedOnEmpty = e.target === e.target.getStage()
						if (clickedOnEmpty) {
							setSelected(false)
						}
					}}
				>
					<Layer>
						<KonvaImage
							ref={imageRef}
							image={image}
							width={imageWidth}
							height={imageHeight}
							x={width / 2}
							y={height / 2}
							offsetX={imageOffsetX}
							offsetY={imageOffsetY}
							rotation={imageRotation}
							onMouseDown={() => {
								setSelected(true)
							}}
							draggable
						/>
						<KonvaImage
							image={imageOverlay}
							width={width}
							height={height}
							listening={false} // this lets clicks pass through to the image underneath
						/>
						<Text
							text={message}
							fontFamily={customTextJSON.fontFamily}
							fontSize={
								(customTextJSON.fontSize * width) / squareImage
							}
							lineHeight={1.15}
							fill={
								overlayText
									? styles.colors.darkGray
									: customTextJSON.defaultColor
							}
							align={customTextJSON.align}
							x={(customTextJSON.x * width) / squareImage}
							y={(customTextJSON.y * height) / squareImage}
							width={
								(customTextJSON.width * height) / squareImage
							}
							height={
								(customTextJSON.height * height) / squareImage
							}
						/>
						{isSelected && (
							<Transformer
								rotateEnabled={false}
								enabledAnchors={[
									'top-left',
									'top-right',
									'bottom-left',
									'bottom-right',
								]}
								ref={trRef}
							/>
						)}
					</Layer>
				</Stage>
			</div>
			<div
				ref={controlRef}
				css={css`
					${shareableControlsCSS};
					position: ${controlPosition};
					top: ${height + 50}px;
					height: ${controlPosition === 'relative'
						? `${controlRef.current.offsetHeight +
								(height + 100) / 2}px`
						: 'auto'};
				`}
			>
				<div dangerouslySetInnerHTML={{ __html: instructions }}></div>
				<ShareableControls
					updateImage={updateImage}
					rotateImage={rotateImage}
					customText={{ ...customText, message }}
					downloadImage={downloadImage}
					overlays={overlays}
					updateOverlay={updateOverlay}
					updateOverlayTextColor={updateOverlayTextColor}
					updateMessage={updateMessage}
				/>
			</div>
		</div>
	)
}

export default ShareableContainer
