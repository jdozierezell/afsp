import React from 'react'
import Script from 'react-load-script'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'

import { styles } from '../css/css'

const actionCenterCSS = css`
	margin: calc(${styles.scale.px50} - 3%) calc(${styles.scale.px24} - 3%);
	@media (min-width: ${styles.screens.mobile}px) {
		margin: calc(${styles.scale.px80} - 3%) calc(${styles.scale.px50} - 3%);
	}
	@media (min-width: ${styles.screens.footer}px) {
		max-width: 1040px;
		margin-left: auto;
		margin-right: auto;
	}
`

const ActionCenter = ({ data: { actionCenter } }) => {
	const scriptLoaded = () => {
		const congressWeb = document.getElementById('congressWeb')
		const congressScript = document.createElement('script')
		const congressCode = document.createTextNode(
			`$cweb(function(){ $cweb('#iframe').congressweb({ url:'//www.congressweb.com/AFSP', responsive: true }) })`
		)
		congressScript.appendChild(congressCode)
		congressWeb.insertAdjacentElement('afterend', congressScript)
	}
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={actionCenter.seoMetaTags}
		>
			<HeroSolid data={actionCenter} />
			<div css={actionCenterCSS} id="iframe"></div>
			<Script
				attributes={{
					id: 'congressWeb',
				}}
				url="//www.congressweb.com/cweb/js/jquery.congressweb.iframe.js"
				onLoad={scriptLoaded}
			/>
		</Layout>
	)
}

export default ActionCenter

export const query = graphql`
	query {
		actionCenter: datoCmsActionCenter {
			title
			slug
			brief
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
		}
	}
`
