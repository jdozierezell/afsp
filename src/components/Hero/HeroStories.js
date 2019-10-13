import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const storyHeroCSS = css`
	margin: ${styles.scale.px150} ${styles.scale.px24} ${styles.scale.px30};
`

const HeroStories = () => {
	return (
		<section css={storyHeroCSS}>
			<h1>Tattooed paleo cloud bread yuccie, tilde swag actually deep</h1>
			<p>18 Jul 2018 — 15min read</p>
			<p>BY DESIREE WOODLAND</p>
			<h3>
				Tagged <a href="#">#StopSuicide</a>,{' '}
				<a href="#">Loss and Healing</a>, <a href="#">Loss Survivors</a>
				, <a href="#">Personal Stories</a>
			</h3>
			<img src="https://placekitten.com/1080/1920" alt="" />
		</section>
	)
}

export default HeroStories
