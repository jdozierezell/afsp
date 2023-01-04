import React, { useState } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import * as Scroll from 'react-scroll'

import FormSubmitted from './FormSubmitted'
import FormError from './FormError'
import FormClockLoader from './FormClockLoader'

import { styles } from '../../css/css'
import { textFieldCSS, buttonCSS } from '../../css/afspMuiTheme'
import stateListAbbreviations from '../../utils/stateListAbbreviations'

const customTextFieldCSS = {
	...textFieldCSS,
	marginBottom: styles.scale.px54,
}

const validationSchema = yup.object({
	name: yup.string().required('Your name is required'),
	email: yup
		.string()
		.email()
		.required('A properly formatted email address is required.'),
	state: yup.string().required('Your state is required'),
})

const FormSBTClinician = () => {
	const [submitted, setSubmitted] = useState(false)
	const [submitError, setSubmitError] = useState(false)
	const [loading, setLoading] = useState(false)

	const Element = Scroll.Element
	const scroller = Scroll.scroller

	const formik = useFormik({
		initialValues: {
			name: '',
			address1: '',
			address2: '',
			city: '',
			state: '',
			zipCode: '',
			email: '',
			phone: '',
			telehealth: '',
			specialties: '',
		},
		validationSchema: validationSchema,
		onSubmit: values => {
			setLoading(true)
			axios
				.post(
					'https://serene-dusk-44738.herokuapp.com/sbt-clinician',
					values
				)
				.then(response => {
					if (response.status === 200) {
						setSubmitted(true)
					} else {
						setSubmitError(true)
					}
					scroller.scrollTo('form', {
						duration: 250,
						smooth: true,
						offset: -100,
					})
					setLoading(false)
				})
				.catch(error => {
					setSubmitError(true)
					setLoading(false)
				})
		},
	})

	const onError = () => {
		setSubmitError(false)
	}

	return (
		<>
			<FormClockLoader loading={loading} />
			<Element name="form">
				{submitError && !submitted && (
					<FormError
						formType="support group"
						resetFunction={onError}
					/>
				)}
				{submitted && <FormSubmitted formType="support group" />}
				<form onSubmit={formik.handleSubmit}>
					<TextField
						sx={customTextFieldCSS}
						id="name"
						name="name"
						label="Name"
						fullWidth
						onChange={formik.handleChange}
						error={
							formik.touched.name && Boolean(formik.errors.name)
						}
						helperText={
							(formik.touched.name && formik.errors.name) ||
							'Enter your full name and credentials. This field is required.'
						}
					/>
					<TextField
						sx={customTextFieldCSS}
						id="address1"
						name="address1"
						label="Street Address or P.O. Box"
						fullWidth
						onChange={formik.handleChange}
						helperText="Enter your street address or P.O. Box. This field is optional."
					/>
					<TextField
						sx={customTextFieldCSS}
						id="address2"
						name="address2"
						label="Apartment, Suite or Floor"
						fullWidth
						helperText="Enter your apartment, suite or floor number if needed. This field is optional."
						onChange={formik.handleChange}
					/>
					<TextField
						sx={customTextFieldCSS}
						id="city"
						name="city"
						label="City"
						fullWidth
						helperText="Enter your city. This field is optional."
						onChange={formik.handleChange}
					/>
					<TextField
						sx={customTextFieldCSS}
						id="state"
						name="state"
						label="State"
						value={formik.values.state}
						fullWidth
						onChange={formik.handleChange}
						select
						error={
							formik.touched.state && Boolean(formik.errors.state)
						}
						helperText={
							(formik.touched.name && formik.errors.name) ||
							'Select your state. This field is required.'
						}
					>
						{stateListAbbreviations.map((state, index) => {
							return (
								<MenuItem key={index} value={state.value}>
									{state.label}
								</MenuItem>
							)
						})}
					</TextField>
					<TextField
						sx={customTextFieldCSS}
						id="zipCode"
						name="zipCode"
						label="Zip Code"
						fullWidth
						helperText="Enter your zip code. This field is optional."
						onChange={formik.handleChange}
					/>
					<TextField
						sx={customTextFieldCSS}
						id="email"
						name="email"
						type="email"
						label="Email Address"
						fullWidth
						onChange={formik.handleChange}
						error={
							formik.touched.email && Boolean(formik.errors.email)
						}
						helperText={
							(formik.touched.name && formik.errors.name) ||
							'Enter your email address. This field is required.'
						}
					/>
					<TextField
						sx={customTextFieldCSS}
						id="phone"
						name="phone"
						label="Phone Number"
						fullWidth
						helperText="Enter your phone number. This field is optional."
						onChange={formik.handleChange}
					/>
					<TextField
						sx={customTextFieldCSS}
						id="telehealth"
						name="telehealth"
						label="Telehealth Services Offered"
						fullWidth
						helperText="Provide information about any telehealth services offered. This field is optional. If you do not offer telehealth services, leave blank."
						onChange={formik.handleChange}
						multiline
					/>
					<TextField
						sx={customTextFieldCSS}
						id="specialties"
						name="specialties"
						label="Specialties"
						fullWidth
						helperText="Provide your area(s) of specialty. This field is optional."
						onChange={formik.handleChange}
						multiline
					/>
					<Button
						sx={{
							...buttonCSS,
						}}
						color="primary"
						variant="outlined"
						type="submit"
					>
						Submit your information
					</Button>
				</form>
			</Element>
		</>
	)
}

export default FormSBTClinician
