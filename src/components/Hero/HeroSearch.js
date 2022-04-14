import React from 'react'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

const solidHeroCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px50};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px150} ${styles.scale.px50} ${styles.scale.px50};
	}
	li,
	h1,
	div {
		color: ${styles.colors.white};
		max-width: 623px;
		font-family: ${styles.fonts.avenirRegular};
	}
	p {
		color: ${styles.colors.white};
	}
	h1 {
		font-family: ${styles.fonts.paul};
		margin: ${styles.scale.px35} 0;
		font-size: ${styles.scale.px36};
		max-width: 700px;
		@media (min-width: ${styles.screens.mobile}px) {
			margin: ${styles.scale.px40} 0;
			font-size: ${styles.scale.px44};
		}
	}
	p {
		display: inline-block;
		margin: 0 ${styles.scale.px16} ${styles.scale.px35} 0;
	}
	button {
		margin-top: 0;
	}
`

const HeroSearch = ({
	data: { title, source, handleHeroClick, visibility },
}) => {
	if (source && source.includes('/searchresults/')) {
		source = source.replace('/searchresults/', '')
	}
	return (
		<div css={solidHeroCSS}>
			{source && (
				<>
					<h1>
						We're sorry, that page doesn't exist. Let's search for "
						{title}" instead
					</h1>
					<div>
						<p>Can't find what you're looking for?</p>
						<button
							onClick={handleHeroClick}
							className="secondary-button"
						>
							Search again
						</button>
					</div>
				</>
			)}
			{!source && title && (
				<>
					<h1>Search results for "{title}"</h1>
					<div>
						<p>Can't find what you're looking for?</p>
						<button
							onClick={handleHeroClick}
							className="secondary-button"
						>
							Search again
						</button>
					</div>
				</>
			)}
			{!title && visibility === 'inherit' && (
				<>
					<h1>Looking for something?</h1>
					<div>Start searching below.</div>
				</>
			)}
		</div>
	)
}

export default HeroSearch
