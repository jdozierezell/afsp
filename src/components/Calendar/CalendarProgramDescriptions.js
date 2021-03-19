import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'

const CalendarProgramDescriptions = ({ program, programDescriptions }) => {
	const [programDisplay, setProgramDisplay] = useState({})

	useEffect(() => {
		let tempProgramDisplay = false
		programDescriptions.forEach(desc => {
			if (desc.programName === program) {
				tempProgramDisplay = {
					name: desc.programName,
					description: desc.programDescription,
				}
			}
		})
		setProgramDisplay(tempProgramDisplay)
	}, [program, programDescriptions])
	return (
		<div>
			{programDisplay && (
				<>
					<h3>{programDisplay.name}</h3>
					<p
						css={css`
							max-width: 623px;
						`}
						dangerouslySetInnerHTML={{
							__html: programDisplay.description,
						}}
					></p>
				</>
			)}
		</div>
	)
}

export default CalendarProgramDescriptions
