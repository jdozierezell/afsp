import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import * as Yup from 'yup'
import { css } from '@emotion/core'
import axios from 'axios'

// import FormStateSelect from '../Forms/FormStateSelect'

import stateList from '../../utils/stateList'

import { styles } from '../../css/css'

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
const selectCSS = css`
	margin-bottom: ${styles.scale.px36};
	.react-select__control {
		border: 2px solid ${styles.colors.darkGray};
		border-radius: 5px;
	}
	.react-select__input {
		max-height: ${styles.scale.px42};
	}
`

const QuiltForm = () => {
	const { register, handleSubmit, watch, errors, setValue } = useForm()
	const [values, setReactSelectValue] = useState({ selectedOption: [] })
	const schema = Yup.object().shape({
		quiltTitle: Yup.string().required(
			'A title is required. Please enter your title and resubmit your square.'
		),
		name: Yup.string().required(
			'Your name is required. Please enter your name and resubmit your square.'
		),
		email: Yup.string()
			.email('Invalid email address')
			.required(
				'Your email address is required. Please enter your email and resubmit your square.'
			),
		state: Yup.string().required(
			'Your state was not selected. Please select your state and resubmit your square.'
		),
		image: Yup.mixed().required(
			'An image is required to create your square. Please select an image and resubmit.'
		),
	})
	const onSubmit = data => {
		const form = document.querySelector('form')
		let formData = new FormData(form)
		formData.append('state', data.meetingState.value)
		console.log(data)
		console.log(formData)
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

	const handleMultiChange = selectedOption => {
		setValue('meetingState', selectedOption)
		setReactSelectValue({ selectedOption })
	}

	useEffect(() => {
		register({ name: 'meetingState' })
	}, [register])

	return (
		<form css={formWrapperCSS} onSubmit={handleSubmit(onSubmit)}>
			<label htmlFor="supportGroupName">Support Group Name</label>
			{errors.supportGroupName && (
				<p>{errors.supportGroupName.message}</p>
			)}
			<input name="supportGroupName" ref={register} />

			<label htmlFor="supportGroupWebsite">Support Group Website</label>
			{errors.supportGroupWebsite && (
				<p>{errors.supportGroupWebsite.message}</p>
			)}
			<input name="supportGroupWebsite" ref={register} />

			<label htmlFor="hostingSponsoringOrganization">
				Hosting/Sponsoring Organization
			</label>
			<input name="hostingSponsoringOrganization" ref={register} />

			<label htmlFor="hostingSponsoringOrganizationWebsite">
				Hosting/Sponsoring Organization Website
			</label>
			{errors.hostingSponsoringOrganizationWebsite && (
				<p>{errors.hostingSponsoringOrganizationWebsite.message}</p>
			)}
			<input name="hostingSponsoringOrganizationWebsite" ref={register} />

			<label htmlFor="groupDemographic">Group Demographic</label>
			{errors.supportGroupName && (
				<p>{errors.supportGroupName.message}</p>
			)}
			<textarea name="groupDemographic" ref={register} />

			<input type="checkbox" name="newMembers" ref={register} />
			<label htmlFor="newMembers">New Members</label>

			<label htmlFor="contactName">Contact Name</label>
			{errors.contactName && <p>{errors.contactName.message}</p>}
			<input name="contactName" ref={register} />

			<label htmlFor="contactEmail">Contact Email</label>
			{errors.contactEmail && <p>{errors.contactEmail.message}</p>}
			<input name="contactEmail" ref={register} />

			<label htmlFor="contactPhone">Contact Phone</label>
			<input name="contactPhone" ref={register} />

			<label htmlFor="submitterName">Submitter Name</label>
			<input name="submitterName" ref={register} />

			<label htmlFor="submitterEmail">Submitter Email</label>
			<input name="submitterEmail" ref={register} />

			<label htmlFor="registrationProcess">Registration Process</label>
			<textarea name="registrationProcess" ref={register} />

			<label htmlFor="meetingSchedule">Meeting Schedule</label>
			{errors.meetingSchedule && <p>{errors.meetingSchedule.message}</p>}
			<textarea name="meetingSchedule" ref={register} />

			<label htmlFor="nameOfMeetingSite">Name of Meeting Site</label>
			{errors.nameOfMeetingSite && (
				<p>{errors.nameOfMeetingSite.message}</p>
			)}
			<input name="nameOfMeetingSite" ref={register} />

			<label htmlFor="meetingCountry">Meeting Country</label>
			{errors.meetingCountry && <p>{errors.meetingCountry.message}</p>}
			<input name="meetingCountry" ref={register} />

			<label htmlFor="meetingAddress">Meeting Address</label>
			{errors.meetingAddress && <p>{errors.meetingAddress.message}</p>}
			<input name="meetingAddress" ref={register} />

			<label htmlFor="meetingCity">Meeting City</label>
			{errors.meetingCity && <p>{errors.meetingCity.message}</p>}
			<input name="meetingCity" ref={register} />

			<label htmlFor="meetingState">Meeting State</label>
			<Select
				css={selectCSS}
				className="react-select"
				classNamePrefix="react-select"
				value={values.selectedOption}
				options={stateList}
				onChange={handleMultiChange}
			/>

			<label htmlFor="meetingZipPostalCode">
				Meeting Zip/Postal Code
			</label>
			{errors.meetingZipPostalCode && (
				<p>{errors.meetingZipPostalCode.message}</p>
			)}
			<input name="meetingZipPostalCode" ref={register} />

			<label htmlFor="facilitator">Facilitator</label>
			{errors.facilitator && <p>{errors.facilitator.message}</p>}
			<input name="facilitator" ref={register} />

			<label htmlFor="costToAttend">Cost to Attend</label>
			<input name="costToAttend" ref={register} />

			<label htmlFor="additionalInformation">
				Additional Information
			</label>
			<textarea name="additionalInformation" ref={register} />

			<input
				css={css`
					margin-top: ${styles.scale.px64};
				`}
				className="secondary-button"
				type="submit"
				value="Submit Quilt"
			/>
		</form>
	)
}

export default QuiltForm
