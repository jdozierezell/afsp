import React from 'react'
import { css } from '@emotion/core'

import ShareableOverlays from './ShareableOverlays'

import { styles } from '../../css/css'

const ShareableControls = ({
	updateImage,
	rotateImage,
	downloadImage,
	overlays,
	updateOverlay,
}) => {
	return (
		<div
			css={css`
				width: 100%;
			`}
		>
			<div className="secondary-button-group full-width">
				<label htmlFor="image" className="">
					Click to upload
				</label>
				<input
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
			<ShareableOverlays
				overlays={overlays}
				updateOverlay={updateOverlay}
			/>
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
