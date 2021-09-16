import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'

import { styles } from '../../css/css'

const videoHeroCSS = css`
	margin-bottom: ${styles.scale.px50};
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 150px repeat(3, auto);
	@media (min-width: ${styles.screens.tablet}px) {
		/* overflow: hidden; */
		/* max-height: 700px; */
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 200px repeat(3, auto);
	}
`

const videoImageCoverCSS = css`
	line-height: 0;
	/* height: calc(100vw / 1.78); */
	min-height: 300px;
	/* max-height: 700px; */
	width: 100%;
	margin-bottom: 0;
	grid-area: 1 / 1 / 3 / 2;
	background-position: center;
	background-size: cover;
	@media (min-width: ${styles.screens.tablet}px) {
		/* height: calc(100vw); */
		grid-area: 1 / 1 / 5 / 3;
	}
	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`

const descriptionBackgroundCSS = css`
	display: none;
	@media (min-width: ${styles.screens.tablet}px) {
		display: block;
		grid-area: 1 / 1 / 5 / 3;
		margin: 0;
		z-index: 1;
		background: linear-gradient(
			90deg,
			rgba(38, 38, 38, 0.7) 0%,
			rgba(38, 38, 38, 0) 100%
		);
	}
`

const chapterNameCSS = css`
	grid-area: 2 / 1 / 3 / 2;
	font-size: ${styles.scale.px46};
	color: ${styles.colors.white};
	margin: 0 ${styles.scale.px24};
	z-index: 1;
	line-height: 1.3;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0 ${styles.scale.px60};
	}
	span {
		box-shadow: 0 0 0 10px ${styles.colors.blue};
		background-color: ${styles.colors.blue};
		box-decoration-break: clone;
	}
`

const chapterDescriptionCSS = css`
	margin: 0 ${styles.scale.px24};
	max-width: 500px;
	z-index: 1;
	grid-area: 3 / 1 / 4 / 2;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0 ${styles.scale.px50};
		color: ${styles.colors.white};
	}
	:first-of-type {
		margin-top: ${styles.scale.px40};
	}
	:last-of-type {
		margin-bottom: ${styles.scale.px40};
		@media (min-width: ${styles.screens.tablet}px) {
			margin-bottom: ${styles.scale.px16};
		}
	}
`

const buttonWrapperCSS = css`
	display: grid;
	grid-template-columns: 1fr 1fr;
	/* grid-template-rows: ${styles.scale.px54} ${styles.scale.px54}; */
	grid-gap: ${styles.gridGap.desktop};
	margin: 0 ${styles.scale.px24};
	z-index: 1;
	grid-area: 4 / 1 / 5 / 3;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: 1fr 1fr 1fr;
		margin: 0 ${styles.scale.px50} ${styles.scale.px50};
	}
	span {
		display: inline-block;
		width: 100%;
	}
	a {
		width: 100%;
		margin: 0;
	}
`

const HeroChapter = ({
	title,
	video,
	poster,
	brief,
	customButtons,
	circleOfHopeUrl,
	slug,
}) => {
	return (
		<section css={videoHeroCSS}>
			<div
				css={css`
					${videoImageCoverCSS};
					background-image: url(${`${poster}&w=1920&h=1080&fit=crop&crop=faces&q=30`});
				`}
			>
				{video && (
					<video autoPlay muted loop playsInline src={video}></video>
				)}
			</div>
			<div css={descriptionBackgroundCSS}></div>
			<h2 css={chapterNameCSS}>
				<span>AFSP {title}</span>
			</h2>
			<p css={chapterDescriptionCSS}>{brief}</p>
			<div css={buttonWrapperCSS}>
				<span>
					<Link
						className="secondary-button"
						to={`/chapter/${slug}#volunteer`}
					>
						Volunteer
					</Link>
				</span>
				<span>
					<Link
						className="secondary-button"
						to={`/chapter/${slug}#events`}
					>
						Events
					</Link>
				</span>
				{circleOfHopeUrl && (
					<span>
						<a
							className="secondary-button"
							href={circleOfHopeUrl}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Circle of Hope"
						>
							Circle of Hope
						</a>
					</span>
				)}
				{!circleOfHopeUrl && (
					<span>
						{customButtons.length > 0 && (
							<a
								className="secondary-button"
								href={customButtons[0].buttonUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={customButtons[0].buttonText}
							>
								{customButtons[0].buttonText}
							</a>
						)}
					</span>
				)}
				<span>
					<Link
						className="secondary-button"
						to={`/chapter/${slug}#programs`}
					>
						Programs
					</Link>
				</span>
				<span>
					<Link
						className="secondary-button"
						to={`/chapter/${slug}#updates`}
					>
						Updates
					</Link>
				</span>
				{circleOfHopeUrl &&
					customButtons.map(button => {
						return (
							<span>
								<a
									className="secondary-button"
									href={button.buttonUrl}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={button.buttonText}
								>
									{button.buttonText}
								</a>
							</span>
						)
					})}
				{!circleOfHopeUrl && (
					<span>
						{customButtons.length > 1 && (
							<a
								className="secondary-button"
								href={customButtons[1].buttonUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={customButtons[1].buttonText}
							>
								{customButtons[1].buttonText}
							</a>
						)}
					</span>
				)}
			</div>
		</section>
	)
}

export default HeroChapter
