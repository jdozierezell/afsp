import React from 'react'

const FormSubmitted = ({ formType }) => {
	return (
		<div id="submitted">
			<p>
				<strong>
					Thank you for submitting your {formType}. Your information
					has been successfully submitted.
				</strong>
			</p>
		</div>
	)
}

export default FormSubmitted
