// https://hackernoon.com/simplifying-responsive-layouts-with-react-hooks-19db73893a7a

import React, { createContext, useContext, useState, useEffect } from 'react'

const WindowDimensionsCtx = createContext(null)

let defaultHeight
let defaultWidth

if (typeof window !== `undefined`) {
	defaultWidth = window.innerWidth
	defaultHeight = window.innerHeight
}

const WindowDimensionsProvider = ({ children }) => {
	const [dimensions, setDimensions] = useState({
		width: defaultWidth,
		height: defaultHeight,
	})
	useEffect(() => {
		const handleResize = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
	return (
		<WindowDimensionsCtx.Provider value={dimensions}>
			{children}
		</WindowDimensionsCtx.Provider>
	)
}

export default WindowDimensionsProvider
export const useWindowDimensions = () => useContext(WindowDimensionsCtx)
