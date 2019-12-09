import React from 'react'

const QuiltDisclaimer = ({ disclaimer }) => {
	return <div dangerouslySetInnerHTML={{ __html: disclaimer }}></div>
}

export default QuiltDisclaimer
