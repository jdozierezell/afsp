import React, { useState, useRef, useEffect } from 'react'
import {
	Stage,
	Layer,
	Transformer,
	Image as KonvaImage, // rename Image to KonvaImage so doesn't conflict with global Image()
} from 'react-konva'
import useImage from 'use-image'
import { css } from '@emotion/core'

import ShareableControls from './ShareableControls'

import { styles } from '../../css/css'

const konvaContainerCSS = css`
	display: grid;
	grid-template-columns: 1fr;
	margin: ${styles.scale.px24};
	@media (min-width: 768px) {
		grid-template-columns: 1fr 600px;
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
	}
`

const shareableControlsCSS = css`
	@media (min-width: 768px) {
		margin-right: ${styles.scale.px36};
		grid-column: 1 / 2;
		grid-row: 1 / 2;
	}
`

const ShareableContainer = ({ instructions, overlays, backgroundImage }) => {
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)
	const [url, setUrl] = useState(null)
	const [image] = useImage(url)
	const [urlOverlay, setUrlOverlay] = useState(null)
	const [imageOverlay] = useImage(urlOverlay)
	const [imageWidth, setImageWidth] = useState(180)
	const [imageHeight, setImageHeight] = useState(180)
	const [imageX, setImageX] = useState(null)
	const [imageY, setImageY] = useState(null)
	const [imageOffsetX, setImageOffsetX] = useState(null)
	const [imageOffsetY, setImageOffsetY] = useState(null)
	const [imageRotation, setImageRotation] = useState(0)
	const [isSelected, setSelected] = useState(false)
	const [position, setPosition] = useState(null)
	const [top, setTop] = useState('220px')
	const trRef = useRef(null)
	const imageRef = useRef(null)
	const konvaRef = useRef(null)

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
		var xhr = new XMLHttpRequest()
		xhr.onload = function() {
			var reader = new FileReader()
			reader.onloadend = function() {
				setUrlOverlay(reader.result)
			}
			reader.readAsDataURL(xhr.response)
		}
		xhr.open('GET', overlay.src)
		xhr.responseType = 'blob'
		xhr.send()
	}

	const setStateDimensions = () => {
		if (window.innerWidth < 768) {
			setWidth(window.innerWidth - 48 - 24)
			setHeight(window.innerWidth - 48 - 24)
		} else if (window.innerWidth < 1200) {
			setWidth(window.innerWidth - 600)
			setHeight(window.innerWidth - 600)
		} else {
			setWidth(1200 - 600)
			setHeight(1200 - 600)
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
			a.download = 'iGiveBoldly.jpg'
			a.href = image
			a.click()
		}, 50) // timeout function gives setSelected enough time to re-render canvas so we lose the transformer handles
	}
	const handleScroll = () => {
		if (window.innerWidth > 768) {
			if (
				konvaRef.current.getBoundingClientRect().y <= 0 &&
				window.scrollY >= 150
			) {
				setPosition('fixed')
				setTop(0)
			} else {
				setPosition('absolute')
				setTop('220px')
			}
		} else {
			if (
				konvaRef.current.getBoundingClientRect().y <= 0 &&
				window.scrollY >= 150
			) {
				setPosition('fixed')
				setTop(0)
			} else {
				setPosition('initial')
				setTop('220px')
			}
		}
	}

	useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually
			console.log(trRef.current)
			trRef.current.setNode(imageRef.current)
			trRef.current.getLayer().batchDraw()
		}
		// set image coordinates to center based on width and height
		window.addEventListener('resize', setStateDimensions)
		setImageOffsetX(imageWidth / 2)
		setImageOffsetY(imageHeight / 2)
		setStateDimensions()
		if (position === null) {
			if (window.innerWidth < 768) {
				setPosition('initial')
			} else {
				setPosition('absolute')
			}
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})
	return (
		<div css={konvaContainerCSS}>
			{console.log(position)}
			<div
				id="konva"
				ref={konvaRef}
				css={css`
					${konvaCSS};
					top: ${top};
					position: ${position};
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
							onDragEnd={e => {
								setImageX(e.target.x())
								setImageY(e.target.y())
							}}
						/>
						<KonvaImage
							image={imageOverlay}
							width={width}
							height={height}
							listening={false} // this lets clicks pass through to the image underneath
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
			<div css={shareableControlsCSS}>
				<div dangerouslySetInnerHTML={{ __html: instructions }}></div>
				<ShareableControls
					updateImage={updateImage}
					rotateImage={rotateImage}
					downloadImage={downloadImage}
					overlays={overlays}
					updateOverlay={updateOverlay}
				/>
			</div>
		</div>
	)
}

export default ShareableContainer
