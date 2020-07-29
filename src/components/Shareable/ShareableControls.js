import React from 'react'
import { css } from '@emotion/core'

import ShareableOverlays from './ShareableOverlays'

import { styles } from '../../css/css'

const buttonGroupCSS = css`
	width: 100%;
	@media (min-width: ${styles.screens.tablet}px) {
		margin-right: ${styles.scale.px16};
		width: calc(100% - ${styles.scale.px16});
	}
`

const textAreaCSS = css`
	width: 100%;
	@media (min-width: ${styles.screens.tablet}px) {
		margin-right: ${styles.scale.px16};
		width: calc(100% - ${styles.scale.px16});
	}
`

const ShareableControls = ({
	updateImage,
	rotateImage,
	customText: { isCustom, customValues, message },
	downloadImage,
	overlays,
	updateOverlay,
	updateOverlayTextColor,
	updateMessage,
}) => {
	return (
		<div
			css={css`
				width: 100%;
			`}
		>
			{!isCustom && (
				<div css={buttonGroupCSS} className="secondary-button-group">
					<label id="imageLabel" htmlFor="image" className="">
						Upload
					</label>
					<input
						aria-describedby="imageLabel"
						id="image"
						type="file"
						accept="image/png, image/jpeg"
						onChange={e => updateImage(e)}
						css={css`
							display: none;
						`}
					/>
					<button onClick={e => rotateImage(e)}>Rotate</button>
				</div>
			)}
			{overlays.length > 0 && (
				<ShareableOverlays
					overlays={overlays}
					updateOverlay={updateOverlay}
					updateOverlayTextColor={updateOverlayTextColor}
				/>
			)}
			{isCustom && (
				<div>
					<h2
						css={css`
							width: 100%;
							margin-top: ${styles.scale.px36};
						`}
					>
						Type your custom message here
					</h2>
					<p>
						Messages are limited to {customValues.characterCount}{' '}
						characters.
					</p>
					<textarea
						name=""
						id=""
						css={textAreaCSS}
						maxLength={customValues.characterCount}
						value={message}
						onChange={e => updateMessage(e.target.value)}
					></textarea>
				</div>
			)}
			<button
				onClick={e => downloadImage(e)}
				className="secondary-button"
			>
				Download
			</button>
		</div>
	)
}

export default ShareableControls
