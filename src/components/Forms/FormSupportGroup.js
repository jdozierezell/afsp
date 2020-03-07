import React from 'react'
import { Form, Input, FileInput } from '@rocketseat/unform'
import * as Yup from 'yup'
import { css } from '@emotion/core'
import axios from 'axios'

import FormStateSelect from '../Forms/FormStateSelect'

import stateList from '../../utils/stateList'

import { styles } from '../../css/css'

const schema = Yup.object().shape({
	supportGroupName: Yup.string().required(
		'A support group name is required. Please enter your group name and resubmit.'
	),
	supportGroupWebsite: Yup.string().url('Invalid web address'),
	hostingSponsoringOrganizationWebsite: Yup.string.url('Invalid web address'),
	contactName: Yup.string().required(
		"A contact name is required. Please enter the group contact's name and resubmit."
	),
	contactEmail: Yup.string()
		.email('Invalid email address')
		.required(
			"A contact email is required. Please enter the group contact's email and resubmit."
		),
	meetingSchedule: Yup.string().required(
		"A description of your meeting schedule is required. Please enter the group's schedule and resubmit."
	),
	nameOfMeetingSite: Yup.string().required(
		'The name of your meeting site is required. Please enter the site name and resubmit.'
	),
	meetingCountry: Yup.string().required(
		"Your meeting site's country is required. Please select the country and resubmit."
	),
	meetingAddress: Yup.string().required(
		"Your meeting site's address is required. Please enter the address and resubmit."
	),
	meetingCity: Yup.string().required(
		"Your meeting site's city is required. Please enter the city and resubmit."
	),
	meetingZipPostalCode: Yup.string().required(
		"Your meeting site's zip or postal code is required. Please enter the code and resubmit."
	),
	facilitator: Yup.string().required(
		"Information about your meeting site's facilitator(s) is required. Please make a selection and resubmit."
	),
})

const formWrapperCSS = css`
	font-family: ${styles.fonts.avenirRegular};
	label {
		display: block;
		width: 100%;
		font-family: ${styles.fonts.paul};
		margin-bottom: ${styles.scale.px12};
	}
	input,
	textarea {
		display: block;
		width: 100%;
		margin-bottom: ${styles.scale.px36};
	}
	p {
		font-family: ${styles.fonts.avenirRegularIt};
		font-size: ${styles.scale.px16};
		margin: 0 0 ${styles.scale.px12} 0;
		padding: 0;
	}
	input[type='file'] {
		border: none;
		display: none;
	}
	label[for='image'] {
		height: ${styles.scale.px62};
		line-height: ${styles.scale.px62};
		border-radius: ${styles.scale.px5};
		text-align: center;
		margin-bottom: ${styles.scale.px36};
		background-color: ${styles.colors.blue};
		color: ${styles.colors.white};
		cursor: pointer;
	}
	textarea {
		border: 2px solid ${styles.colors.darkGray};
		border-radius: 5px;
	}
	span {
		color: ${styles.colors.poppy};
		display: block;
		/* margin-top: -${styles.scale.px24};
		margin-bottom: ${styles.scale.px36}; */
	}
`

const QuiltForm = () => {
	function handleProgress(progress, event) {}
	const handleSubmit = data => {
		const form = document.querySelector('form')
		let formData = new FormData(form)
		formData.append('image', data.image)
		axios
			.post(
				'https://serene-dusk-44738.herokuapp.com/create-support-group',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			.then(response => console.log(response))
			.catch(error => console.log(error))
	}
	return (
		<Form schema={schema} onSubmit={handleSubmit} css={formWrapperCSS}>
			<label htmlFor="supportGroupName">Support Group Name</label>
			<Input name="supportGroupName" />
			<label htmlFor="supportGroupWebsite">Support Group Website</label>
			<Input name="supportGroupWebsite" />
			<label htmlFor="hostingSponsoringOrganization">
				Hosting or Sponsoring Organization
			</label>
			<Input name="hostingSponsoringOrganization" />
			<label htmlFor="hostingSponsoringOrganizationWebsite">
				Hosting or Sponsoring Organization Website
			</label>
			<Input name="hostingSponsoringOrganizationWebsite" />
			<label htmlFor="email">Your Email Address</label>
			<p>
				We will not share or sell your email address to other
				organizations. We hate spam as much as you do. We will use your
				email address to identify you should you request changes to your
				square later on.
			</p>
			<Input name="email" type="email" />
			<label htmlFor="state">Your State</label>
			<p>
				Select the state where you live. If you live outside of the
				U.S., select 'Not Applicable' at the bottom of the list of
				choices. We will not share your information with any 3rd party.
			</p>
			<FormStateSelect name="state" options={stateList} />
			<label htmlFor="file">Square Image</label>
			<p>
				Please note, images do not need to be square when uploading.
				They will appear as squares automatically.
			</p>
			<label htmlFor="image">Click here to upload your image</label>
			<FileInput name="image" onStartProgress={handleProgress} />
			<label htmlFor="description">Square Description</label>
			<p>
				Enter a brief description of your quilt square. This can be
				anything from a description of the person you have lost to a
				favorite moment or memory. If you like, you may leave this
				section blank. This field is not required.
			</p>
			<Input name="description" multiline rows="5" cols="33" />
			<button className="secondary-button" type="submit">
				Submit
			</button>
		</Form>
	)
}

export default QuiltForm
