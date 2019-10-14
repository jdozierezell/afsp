import React, { createContext, useContext } from 'react'

const HeaderCtx = createContext(null)

const HeaderContextProvider = ({ value, children }) => {
	return <HeaderCtx.Provider value={value}>{children}</HeaderCtx.Provider>
}

export default HeaderContextProvider
export const useHeaderContext = () => useContext(HeaderCtx)
