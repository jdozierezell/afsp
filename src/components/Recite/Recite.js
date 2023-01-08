import React, { useState, useEffect, useMemo } from 'react'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

const reciteButtonCSS = css`
	background-color: transparent;
	border: none;
	font-family: ${styles.fonts.avenirDemi};
	cursor: pointer;
`

const ReciteComponent = () => {
	const a11y = useMemo(
		() => [
			{ lang: 'English', a11y: 'Accessibility' },
			{ lang: 'French', a11y: 'Accessibilité' },
			{ lang: 'Filipino', a11y: 'Pag-access' },
			{ lang: 'Hindi', a11y: 'सरल उपयोग' },
			{ lang: 'Spanish', a11y: 'Accesibilidad' },
			{ lang: 'German', a11y: 'Barrierefreiheit' },
			{ lang: 'Portuguese', a11y: 'Acessibilidade' },
			{ lang: 'Russian', a11y: 'Доступность' },
			{ lang: 'Chinese (Simplified)', a11y: '辅助功能' },
			{ lang: 'Korean', a11y: '접근성' },
		],
		[]
	)
	const [firstRun, setFirstRun] = useState(true)
	const [a11yText, setA11yText] = useState(a11y[0].a11y)
	useEffect(() => {
		if (firstRun) {
			var serviceUrl = '//api.reciteme.com/asset/js?key='
			var serviceKey = '28a7fdb4e6e4925c84a1b6df2c5815f43bd9c80e'
			var options = {} // Options can be added as needed
			var autoLoad = false
			var enableFragment = '#reciteEnable'

			var loaded = [],
				frag = !1
			window.location.hash === enableFragment && (frag = !0)
			function loadScript(c, b) {
				var a = document.createElement('script')
				a.type = 'text/javascript'
				a.readyState
					? (a.onreadystatechange = function () {
							if (
								'loaded' === a.readyState ||
								'complete' === a.readyState
							)
								// eslint-disable-next-line no-unused-expressions, no-sequences
								(a.onreadystatechange = null),
									void 0 !== b && b()
					  })
					: void 0 !== b &&
					  (a.onload = function () {
							b()
					  })
				a.src = c
				document.getElementsByTagName('head')[0].appendChild(a)
			}
			function _rc(c) {
				c += '='
				for (
					var b = document.cookie.split(';'), a = 0;
					a < b.length;
					a++
				) {
					for (var d = b[a]; ' ' === d.charAt(0); )
						d = d.substring(1, d.length)
					if (0 === d.indexOf(c))
						return d.substring(c.length, d.length)
				}
				return null
			}
			function loadService(c) {
				for (
					var b = serviceUrl + serviceKey, a = 0;
					a < loaded.length;
					a++
				)
					if (loaded[a] === b) return
				loaded.push(b)
				loadScript(serviceUrl + serviceKey, function () {
					// eslint-disable-next-line no-undef
					'function' === typeof _reciteLoaded && _reciteLoaded()
					'function' === typeof c && c()
					// eslint-disable-next-line no-undef
					Recite.load(options)
					// eslint-disable-next-line no-undef
					Recite.Event.subscribe('Recite:load', function () {
						// eslint-disable-next-line no-undef
						Recite.enable()
					})
				})
			}
			'true' === _rc('Recite.Persist') && loadService()
			if ((autoLoad && 'false' !== _rc('Recite.Persist')) || frag) {
				document.addEventListener
					? document.addEventListener(
							'DOMContentLoaded',
							serviceFunction
					  )
					: loadService()
			}
			const serviceFunction = (i, e) => {
				loadService()
			}
			document
				.getElementById('reciteme')
				.addEventListener('click', serviceFunction)
			setFirstRun(false)
			// const updateA11yText = setInterval(() => {
			// 	const arrayItem = Math.floor(Math.random() * 10)
			// 	setA11yText(a11y[arrayItem].a11y)
			// }, 2000)
			return () => {
				window.removeEventListener('click', serviceFunction)
				window.removeEventListener('DOMContentLoaded', serviceFunction)
				// clearInterval(updateA11yText)
			}
		}
	}, [a11y, firstRun])
	return (
		<button id="reciteme" className="reciteme" css={reciteButtonCSS}>
			Accessibility
		</button>
	)
}

export default ReciteComponent
