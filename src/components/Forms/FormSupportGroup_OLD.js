import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import * as Yup from 'yup'
import { css } from '@emotion/core'
import axios from 'axios'

import stateList from '../../utils/stateList'
import countryList from '../../utils/countryList'

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
	textarea {
		border: 2px solid ${styles.colors.darkGray};
		border-radius: 5px;
	}
	p {
		color: ${styles.colors.poppy};
	}
`

const FormSupportGroup = () => {
	// const schema = Yup.object().shape({
	// 	supportGroupName: Yup.string().required(
	// 		'A support group name is required. Please enter your group name and resubmit.'
	// 	),
	// 	supportGroupWebsite: Yup.string().url('Invalid web address'),
	// 	hostingSponsoringOrganizationWebsite: Yup.string().url(
	// 		'Invalid web address'
	// 	),
	// 	contactName: Yup.string().required(
	// 		"A contact name is required. Please enter the group contact's name and resubmit."
	// 	),
	// 	contactEmail: Yup.string()
	// 		.email('Invalid email address')
	// 		.required(
	// 			"A contact email is required. Please enter the group contact's email and resubmit."
	// 		),
	// 	meetingSchedule: Yup.string().required(
	// 		"A description of your meeting schedule is required. Please enter the group's schedule and resubmit."
	// 	),
	// 	nameOfMeetingSite: Yup.string().required(
	// 		'The name of your meeting site is required. Please enter the site name and resubmit.'
	// 	),
	// 	meetingCountry: Yup.string().required(
	// 		"Your meeting site's country is required. Please select the country and resubmit."
	// 	),
	// 	meetingAddress: Yup.string().required(
	// 		"Your meeting site's address is required. Please enter the address and resubmit."
	// 	),
	// 	meetingCity: Yup.string().required(
	// 		"Your meeting site's city is required. Please enter the city and resubmit."
	// 	),
	// 	meetingZipPostalCode: Yup.string().required(
	// 		"Your meeting site's zip or postal code is required. Please enter the code and resubmit."
	// 	),
	// 	facilitator: Yup.string().required(
	// 		"Information about your meeting site's facilitator(s) is required. Please make a selection and resubmit."
	// 	),
	// })

	const { register, handleSubmit, watch, errors, setValue } = useForm({
		// validationSchema: schema,
	})

	const [values, setReactSelectValue] = useState({ selectedOption: [] })

	const meetingCountry = watch('meetingCountry') // watch input value by passing the name of it

	const onSubmit = data => {
		const form = document.querySelector('form')
		let formData = new FormData(form)
		formData.append('image', data.image)
		formData.append('state', data.state.value)
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

	const handleMultiChange = selectedOption => {
		setValue('state', selectedOption)
		setReactSelectValue({ selectedOption })
	}

	useEffect(() => {
		register({ name: 'state' })
	}, [register])

	return (
		<>
			<form css={formWrapperCSS} onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="quiltTitle">
					Square Title/Name of Person Lost
				</label>
				{errors.quiltTitle && <p>{errors.quiltTitle.message}</p>}
				<input name="quiltTitle" ref={register} />

				<label htmlFor="name">Your Name</label>
				{errors.name && <p>{errors.name.message}</p>}
				<input name="name" ref={register} />

				<label htmlFor="email">Your Email Address</label>
				<p>
					We will not share or sell your email address to other
					organizations. We hate spam as much as you do. We will use
					your email address to identify you should you request
					changes to your square later on.
				</p>
				{errors.email && <p>{errors.email.message}</p>}
				<input name="email" type="email" ref={register} />

				<label htmlFor="state">Your State</label>
				<p>
					Select the state where you live. If you live outside of the
					U.S., select 'Not Applicable' at the bottom of the list of
					choices. We will not share your information with any 3rd
					party.
				</p>
				{errors.state && <p>{errors.state.message}</p>}

				<Select
					css={selectCSS}
					className="react-select"
					classNamePrefix="react-select"
					value={values.selectedOption}
					options={stateList}
					onChange={handleMultiChange}
				/>

				<label htmlFor="file">Square Image</label>
				<p>
					Please note, images do not need to be square when uploading.
					They will appear as squares automatically.
				</p>
				<label htmlFor="image">Click here to upload your image</label>
				<input name="image" id="image" type="file" ref={register} />

				<label htmlFor="description">Square Description</label>
				<p>
					Enter a brief description of your quilt square. This can be
					anything from a description of the person you have lost to a
					favorite moment or memory. If you like, you may leave this
					section blank. This field is not required.
				</p>
				{errors.description && <p>{errors.description.message}</p>}
				<textarea name="description" ref={register} />

				<input
					css={css`
						margin-top: ${styles.scale.px64};
					`}
					className="secondary-button"
					type="submit"
					value="Submit Quilt"
				/>
			</form>
			{/* <form css={formWrapperCSS} onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="supportGroupName">Support Group Name</label>
				{errors.supportGroupName && (
					<p>{errors.supportGroupName.message}</p>
				)}
				<input name="supportGroupName" ref={register} />

				<label htmlFor="supportGroupWebsite">
					Support Group Website
				</label>
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
				<input
					name="hostingSponsoringOrganizationWebsite"
					ref={register}
				/>

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

				<label htmlFor="registrationProcess">
					Registration Process
				</label>
				<textarea name="registrationProcess" ref={register} />

				<label htmlFor="meetingSchedule">Meeting Schedule</label>
				{errors.meetingSchedule && (
					<p>{errors.meetingSchedule.message}</p>
				)}
				<textarea name="meetingSchedule" ref={register} />

				<label htmlFor="nameOfMeetingSite">Name of Meeting Site</label>
				{errors.nameOfMeetingSite && (
					<p>{errors.nameOfMeetingSite.message}</p>
				)}
				<input name="nameOfMeetingSite" ref={register} />

				<label htmlFor="meetingCountry">Meeting Country</label>
				{errors.meetingCountry && (
					<p>{errors.meetingCountry.message}</p>
				)}
				<input name="meetingCountry" ref={register} />

				<label htmlFor="meetingAddress">Meeting Address</label>
				{errors.meetingAddress && (
					<p>{errors.meetingAddress.message}</p>
				)}
				<input name="meetingAddress" ref={register} />

				<label htmlFor="meetingCity">Meeting City</label>
				{errors.meetingCity && <p>{errors.meetingCity.message}</p>}
				<input name="meetingCity" ref={register} />

				{meetingCountry === 'United States'}
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
					value="Submit Support Group"
				/>
			</form> */}
		</>
	)
}

export default FormSupportGroup
