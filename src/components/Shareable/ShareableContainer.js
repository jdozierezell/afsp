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

const konvaContainer = css`
	display: grid;
	grid-template-columns: 1fr;
	margin: 24px;
	@media (min-width: 768px) {
		grid-template-columns: 1fr 600px;
	}
`

const ShareableContainer = ({ instructions }) => {
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)
	const [url, setUrl] = useState(null)
	const [image] = useImage(url)
	const [imageWidth, setImageWidth] = useState(180)
	const [imageHeight, setImageHeight] = useState(180)
	const [imageX, setImageX] = useState(null)
	const [imageY, setImageY] = useState(null)
	const [imageOffsetX, setImageOffsetX] = useState(null)
	const [imageOffsetY, setImageOffsetY] = useState(null)
	const [imageRotation, setImageRotation] = useState(0)
	const [image2] = useImage(
		'https://chapterland.imgix.net/wp-content/uploads/sites/13/2019/11/13972_AFSP_iGiveBoldly_Image_Overlay_Page_m1.png?auto=compress',
		'Anonymous'
	)
	const [isSelected, setSelected] = useState(false)
	const trRef = useRef(null)
	const imageRef = useRef(null)

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

	const setStateDimensions = () => {
		if (window.innerWidth < 768) {
			setWidth(window.innerWidth)
			setHeight(window.innerWidth)
		} else if (window.innerWidth < 1200) {
			setWidth(window.innerWidth - 400)
			setHeight(window.innerWidth - 400)
		} else {
			setWidth(1200 - 400)
			setHeight(1200 - 400)
		}
	}

	const rotateImage = e => {
		setImageRotation(imageRotation + 90)
		console.log(imageOffsetX)
		console.log(imageOffsetY)
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
	}, [
		isSelected,
		imageWidth,
		imageHeight,
		imageX,
		imageY,
		imageOffsetX,
		imageOffsetY,
	])
	return (
		<div css={konvaContainer}>
			{console.log(instructions)}
			<div>
				<div dangerouslySetInnerHTML={{ __html: instructions }}></div>
				<ShareableControls
					updateImage={updateImage}
					rotateImage={rotateImage}
					downloadImage={downloadImage}
				/>
			</div>
			<div id="konva">
				<Stage
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
							image={image2}
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
		</div>
	)
}

export default ShareableContainer
