import React from 'react'
import * as yup from 'yup'
import { css } from '@emotion/react'
import { useFormik } from 'formik'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { styles } from '../../css/css'
import { textFieldCSS, buttonCSS } from '../../css/afspMuiTheme'

const formCSS = css`
	display: grid;
	justify-items: center;
	p {
		width: 100%;
		margin-top: ${styles.scale.px7};
		&.error {
			color: ${styles.colors.poppy};
		}
	}
`

const validationSchema = yup.object({
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

const EmailSignupFormik = ({ formSubmit, submitted }) => {
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			zip: '',
		},
		validationSchema: validationSchema,
		onSubmit: values => {
			formSubmit(values)
		},
	})

	return (
		// <ThemeProvider theme={afspMuiTheme}>
		<form css={formCSS} onSubmit={formik.handleSubmit}>
			<TextField
				sx={{
					...textFieldCSS,
				}}
				fullWidth
				id="firstName"
				name="firstName"
				label="First Name"
				type="text"
				value={formik.values.firstName}
				onChange={formik.handleChange}
				error={
					formik.touched.firstName && Boolean(formik.errors.firstName)
				}
				helperText={formik.touched.firstName && formik.errors.firstName}
			/>
			<TextField
				sx={{
					...textFieldCSS,
				}}
				fullWidth
				id="lastName"
				name="lastName"
				label="Last Name"
				type="text"
				value={formik.values.lastName}
				onChange={formik.handleChange}
				error={
					formik.touched.lastName && Boolean(formik.errors.lastName)
				}
				helperText={formik.touched.lastName && formik.errors.lastName}
			/>
			<TextField
				sx={{
					...textFieldCSS,
				}}
				fullWidth
				id="email"
				name="email"
				label="Email"
				type="email"
				value={formik.values.email}
				onChange={formik.handleChange}
				error={formik.touched.email && Boolean(formik.errors.email)}
				helperText={formik.touched.email && formik.errors.email}
			/>
			<TextField
				sx={{
					...textFieldCSS,
				}}
				fullWidth
				id="zipCode"
				name="zip"
				label="Zip Code"
				type="text"
				value={formik.values.zip}
				onChange={formik.handleChange}
				error={formik.touched.zip && Boolean(formik.errors.zip)}
				helperText={formik.touched.zip && formik.errors.zip}
			/>
			<Button
				sx={{
					...buttonCSS,
				}}
				color="primary"
				variant="outlined"
				type="submit"
			>
				Subscribe
			</Button>
		</form>
		// </ThemeProvider>
	)
}

export default EmailSignupFormik
