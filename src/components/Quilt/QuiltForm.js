import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const formWrapperCSS = css`
	font-family: ${styles.fonts.avenirRegular};
	label,
	input,
	textarea,
	select {
		display: block;
		width: 100%;
	}
	label {
		font-family: ${styles.fonts.paul};
	}
	p {
		font-family: ${styles.fonts.avenirRegularIt};
		font-size: ${styles.scale.px16};
	}
	input[type='file'] {
		border: none;
	}
`

const QuiltForm = () => {
	const SUPPORTED_FORMATS = [
		'image/jpg',
		'image/jpeg',
		'image/gif',
		'image/png',
	]
	return (
		<div css={formWrapperCSS}>
			<Formik
				initialValues={{
					quiltTitle: '',
					yourName: '',
					email: '',
					state: '',
					file: undefined,
				}}
				validationSchema={Yup.object({
					quiltTitle: Yup.string()
						.max(15, 'Must be 15 characters or less')
						.required('Required'),
					yourName: Yup.string()
						.max(20, 'Must be 20 characters or less')
						.required('Required'),
					email: Yup.string()
						.email('Invalid email address')
						.required('Required'),
					state: Yup.string().required('Required'),
					file: Yup.mixed()
						.required('File is required')
						.test(
							'fileFormat',
							'Please make sure your file is an image',
							value =>
								value && SUPPORTED_FORMATS.includes(value.type)
						),
				})}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2))
						setSubmitting(false)
					}, 400)
				}}
			>
				<Form>
					<label htmlFor="quiltTitle">
						Square Title/Name of Person Lost
					</label>
					<p>Instructions</p>
					<Field name="quiltTitle" type="text" />
					<ErrorMessage name="quiltTitle" />
					<label htmlFor="yourName">Your Name</label>
					<p>Instructions</p>
					<Field name="yourName" type="text" />
					<ErrorMessage name="yourName" />
					<label htmlFor="firstName">Your Email Address</label>
					<p>Instructions</p>
					<Field name="email" type="email" />
					<ErrorMessage name="email" />
					<label htmlFor="state">Your State</label>
					<p>Instructions</p>
					<Field
						name="state"
						as="select"
						placesholder="Choose your state"
					>
						<option value=""></option>
						<option value="1300146">Alabama</option>
						<option value="1300147">Alaska</option>
						<option value="1300148">Arizona</option>
						<option value="1300149">Arkansas</option>
						<option value="1300152">California</option>
						<option value="1300153">Colorado</option>
						<option value="1300154">Connecticut</option>
						<option value="1300155">Delaware</option>
						<option value="1300223">District of Columbia</option>
						<option value="1300156">Florida</option>
						<option value="1300157">Georgia</option>
						<option value="1300160">Hawaii</option>
						<option value="1300161">Idaho</option>
						<option value="1300162">Illinois</option>
						<option value="1300163">Indiana</option>
						<option value="1300164">Iowa</option>
						<option value="1300165">Kansas</option>
						<option value="1300166">Kentucky</option>
						<option value="1300167">Louisiana</option>
						<option value="1300168">Maine</option>
						<option value="1300169">Maryland</option>
						<option value="1300170">Massachusetts</option>
						<option value="1300171">Michigan</option>
						<option value="1300173">Minnesota</option>
						<option value="1300174">Mississippi</option>
						<option value="1300175">Missouri</option>
						<option value="1300176">Montana</option>
						<option value="1300178">Nebraska</option>
						<option value="1300179">Nevada</option>
						<option value="1300195">New Hampshire</option>
						<option value="1300196">New Jersey</option>
						<option value="1300197">New Mexico</option>
						<option value="1300198">New York</option>
						<option value="1300199">North Carolina</option>
						<option value="1300200">North Dakota</option>
						<option value="1300202">Ohio</option>
						<option value="1300203">Oklahoma</option>
						<option value="1300204">Oregon</option>
						<option value="1300206">Pennsylvania</option>
						<option value="1300207">Rhode Island</option>
						<option value="1300208">South Carolina</option>
						<option value="1300209">South Dakota</option>
						<option value="1300211">Tennessee</option>
						<option value="1300212">Texas</option>
						<option value="1300213">Utah</option>
						<option value="1300214">Vermont</option>
						<option value="1300215">Virginia</option>
						<option value="1300216">Washington</option>
						<option value="1300217">West Virginia</option>
						<option value="1300220">Wisconsin</option>
						<option value="1300221">Wyoming</option>
						<option value="1331459">Not Applicable</option>
					</Field>
					<ErrorMessage name="state" />
					<label htmlFor="file">Square Image</label>
					<p>Instructions</p>
					<Field name="file" type="file" />
					<ErrorMessage name="file" />
					<label htmlFor="description">Square Description</label>
					<p>Instructions</p>
					<Field name="description" as="textarea" />
					<button type="submit">Submit</button>
				</Form>
			</Formik>
		</div>
	)
}

export default QuiltForm
