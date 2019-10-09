import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const aboutCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0 0;
	}
	h2 {
		margin: 0 0 ${styles.scale.px35};
		font-size: ${styles.scale.px36};
	}
	p {
		:last-of-type {
			margin-bottom: 0;
		}
	}
`

const ChapterAbout = ({ chapterName }) => {
	return (
		<div css={aboutCSS}>
			<h2>About the AFSP {chapterName} Chapter</h2>
			<div>
				<p>
					Pinterest church-key hella marfa taiyaki pickled la croix
					farm-to-table typewriter migas raw denim letterpress af
					taxidermy vice. +1 try-hard cloud bread affogato kinfolk
					asymmetrical, slow-carb next level green juice mixtape
					portland yuccie synth chambray. Fingerstache tacos
					farm-to-table, kickstarter iceland vice put a bird on it
					wayfarers jianbing artisan small batch salvia. Beard squid
					man braid cliche photo booth kinfolk unicorn organic shabby
					chic wolf brunch hell of edison bulb. Poke hammock bespoke
					kale chips viral franzen. You probably haven't heard of them
					seitan blog affogato la croix lyft actually, wayfarers
					fashion axe marfa occupy bicycle rights.
				</p>
				<p>
					Craft beer mustache affogato farm-to-table, banh mi yuccie
					skateboard narwhal. Yuccie 90's skateboard vape venmo la
					croix. Intelligentsia schlitz gentrify keffiyeh art party
					portland twee echo park cliche occupy poke. Pour-over wolf
					copper mug flexitarian vape, pabst gluten-free waistcoat
					williamsburg sartorial brooklyn slow-carb chillwave
					humblebrag. Hammock drinking vinegar vegan cold-pressed kale
					chips fingerstache mumblecore locavore artisan. 3 wolf moon
					roof party poke, semiotics flannel whatever poutine.
					Kombucha locavore twee bushwick adaptogen before they sold
					out letterpress tbh selvage.
				</p>
			</div>
		</div>
	)
}

export default ChapterAbout
