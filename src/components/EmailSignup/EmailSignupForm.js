import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

const formCSS = css`
	display: grid;
	justify-items: center;
	input {
		width: 100%;
	}
	input[type='submit'] {
		width: auto;
		line-height: inherit;
		margin: 0 auto;
	}
	label {
		width: 100%;
		margin-bottom: ${styles.scale.px7};
		span {
			font-size: ${styles.scale.px18};
			padding-left: ${styles.scale.px5};
			color: ${styles.colors.poppy};
		}
	}
	p {
		width: 100%;
		margin-top: ${styles.scale.px7};
		&.error {
			color: ${styles.colors.poppy};
		}
	}
`

let schema = yup.object().shape({
	firstName: yup.string().required('Your first name is required'),
	lastName: yup.string().required('Your last name is required'),
	email: yup
		.string()
		.email()
		.required('A properly formatted email address is required.'),
	zip: yup.string().matches(/^[0-9]{5}-?([0-9]{4})?$/g, {
		message:
			'AFSP chapters and advocacy efforts are currently only available in the U.S. Please enter a five or nine digit U.S. zip code.',
		excludeEmptyString: true,
	}),
})

const EmailSignupForm = ({ formSubmit, submitted }) => {
	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	})
	return (
		<form
			onSubmit={handleSubmit(formSubmit)}
			css={css`
				${formCSS};
				${submitted ? 'display: none' : ''}
			`}
		>
			<label htmlFor="firstName">
				First Name<span>*</span>
			</label>
			<input type="text" name="firstName" id="firstName" ref={register} />

			<p className="error">{errors.firstName?.message}</p>

			<label htmlFor="lastName">
				Last Name<span>*</span>
			</label>
			<input type="text" name="lastName" id="lastName" ref={register} />

			<p className="error">{errors.lastName?.message}</p>

			<label htmlFor="email">
				Email<span>*</span>
			</label>
			<input type="email" name="email" id="email" ref={register} />

			<p className="error">{errors.email?.message}</p>

			<p>
				A zip code is optional but connects you to activities and
				advocacy efforts in your local community.
			</p>
			<label htmlFor="zipCode">Zip Code</label>
			<input type="text" name="zip" id="zipCode" ref={register} />
			<p className="error">{errors.zip?.message}</p>

			<input
				className="secondary-button"
				type="submit"
				value="Subscribe"
			/>
		</form>
	)
}

export default EmailSignupForm
