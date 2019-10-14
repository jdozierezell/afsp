import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const storyContentCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
		max-width: 623px;
	}
	h2 {
		font-size: ${styles.scale.px36};
		margin: ${styles.scale.px50} 0 ${styles.scale.px35};
		@media (min-width: ${styles.screens.mobile}px) {
			${styles.scale.px44};
			margin: ${styles.scale.px80} 0 ${styles.scale.px40};
		}
	}
`

const ContentGeneric = () => {
	return (
		<section css={storyContentCSS}>
			<h2>Lorem ipsum hipsum</h2>
			<div>
				<p>
					Sriracha squid activated charcoal hell of vice chillwave
					fanny pack williamsburg. Edison bulb migas cold-pressed four
					dollar toast, sartorial lyft tilde organic letterpress
					aesthetic polaroid ennui. Mustache organic kickstarter
					master cleanse activated charcoal franzen tumeric pabst
					heirloom literally keytar hot chicken. Vexillologist
					waistcoat jianbing master cleanse PBR&B palo santo deep v
					tacos la croix.
				</p>
				<p>
					Snackwave asymmetrical tumblr, food truck truffaut poutine
					iceland raclette. Bespoke keffiyeh photo booth lomo tbh
					kickstarter. Leggings distillery ethical, stumptown air
					plant ugh normcore polaroid venmo. Viral mixtape direct
					trade knausgaard, taiyaki subway tile hexagon occupy
					dreamcatcher brooklyn artisan single-origin coffee sriracha.
				</p>
				<p>
					Direct trade ennui unicorn sriracha, meggings selvage austin
					ramps YOLO edison bulb. Meh franzen waistcoat, prism
					skateboard pour-over synth forage pok pok raclette
					dreamcatcher vice twee raw denim hell of.
				</p>
				<p>
					Cronut pabst whatever artisan vape banh mi tacos
					lumbersexual leggings roof party cornhole man bun cred tote
					bag. Selfies vice iPhone, helvetica tumblr whatever tofu.
				</p>
				<p>
					Gastropub activated charcoal venmo echo park cornhole umami
					street art yuccie VHS green juice. Irony craft beer truffaut
					squid schlitz migas vexillologist umami hella stumptown
					godard put a bird on it YOLO bitters lumbersexual.
					Microdosing affogato squid hell of.
				</p>
				<p>
					La croix bespoke kickstarter pop-up tousled ethical
					slow-carb. Four dollar toast single-origin coffee tbh viral
					retro. Fam aesthetic neutra, hot chicken listicle offal
					vinyl forage taiyaki synth single-origin coffee helvetica
					glossier four dollar toast organic.
				</p>
			</div>
			<h2>Lorem ipsum hipsum</h2>
			<div>
				<p>
					Sriracha squid activated charcoal hell of vice chillwave
					fanny pack williamsburg. Edison bulb migas cold-pressed four
					dollar toast, sartorial lyft tilde organic letterpress
					aesthetic polaroid ennui. Mustache organic kickstarter
					master cleanse activated charcoal franzen tumeric pabst
					heirloom literally keytar hot chicken. Vexillologist
					waistcoat jianbing master cleanse PBR&B palo santo deep v
					tacos la croix.
				</p>
				<p>
					Snackwave asymmetrical tumblr, food truck truffaut poutine
					iceland raclette. Bespoke keffiyeh photo booth lomo tbh
					kickstarter. Leggings distillery ethical, stumptown air
					plant ugh normcore polaroid venmo. Viral mixtape direct
					trade knausgaard, taiyaki subway tile hexagon occupy
					dreamcatcher brooklyn artisan single-origin coffee sriracha.
				</p>
				<p>
					Direct trade ennui unicorn sriracha, meggings selvage austin
					ramps YOLO edison bulb. Meh franzen waistcoat, prism
					skateboard pour-over synth forage pok pok raclette
					dreamcatcher vice twee raw denim hell of.
				</p>
				<p>
					Cronut pabst whatever artisan vape banh mi tacos
					lumbersexual leggings roof party cornhole man bun cred tote
					bag. Selfies vice iPhone, helvetica tumblr whatever tofu.
				</p>
				<p>
					Gastropub activated charcoal venmo echo park cornhole umami
					street art yuccie VHS green juice. Irony craft beer truffaut
					squid schlitz migas vexillologist umami hella stumptown
					godard put a bird on it YOLO bitters lumbersexual.
					Microdosing affogato squid hell of.
				</p>
				<p>
					La croix bespoke kickstarter pop-up tousled ethical
					slow-carb. Four dollar toast single-origin coffee tbh viral
					retro. Fam aesthetic neutra, hot chicken listicle offal
					vinyl forage taiyaki synth single-origin coffee helvetica
					glossier four dollar toast organic.
				</p>
			</div>
		</section>
	)
}

export default ContentGeneric
