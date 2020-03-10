import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import Toggle from 'react-toggle'
import * as Yup from 'yup'
import { css } from '@emotion/core'
import axios from 'axios'
import * as Scroll from 'react-scroll'

import 'react-toggle/style.css'

import FormSubmitted from './FormSubmitted'
import FormError from './FormError'
import FormClockLoader from './FormClockLoader'

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
	label[for='newMembers'], label[for='differentSubmitter'], label[for='attendedTraining'] {
		display: inline-block;
		width: auto;
		margin: 0 ${styles.scale.px24} ${styles.scale.px12};
		vertical-align: top;
	}
	span {
		color: ${styles.colors.poppy};
		display: block;
		margin-bottom: ${styles.scale.px12};
		/* margin-top: -${styles.scale.px24};
		margin-bottom: ${styles.scale.px36}; */
	}
	label span {
		display: inline-block;
		line-height: 0;
	}
	.toggleInstructions {
		margin-bottom: ${styles.scale.px36};
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

const SupportGroupForm = () => {
	const schema = Yup.object().shape({
		supportGroupName: Yup.string().required(
			'A support group name is required. Please enter your group name and resubmit.'
		),
		supportGroupWebsite: Yup.string().url('Invalid web address'),
		hostingSponsoringOrganizationWebsite: Yup.string().url(
			'Invalid web address'
		),
		contactName: Yup.string().required(
			"A contact name is required. Please enter the group contact's name and resubmit."
		),
		contactEmail: Yup.string()
			.email('Invalid email address')
			.required(
				"A contact email is required. Please enter the group contact's email and resubmit."
			),
		submitterName: Yup.string()
			.notRequired()
			.when('differentSubmitter', {
				is: val => val === 'checked',
				then: Yup.string().required(
					'Your name is required. Please enter your name and resubmit.'
				),
				otherwise: Yup.string().notRequired(),
			}),
		submitterEmail: Yup.string()
			.notRequired()
			.when('differentSubmitter', {
				is: val => val === 'checked',
				then: Yup.string()
					.email('Invalid email address')

					.required(
						'Your email is required. Please enter your email and resubmit.'
					),
				otherwise: Yup.string().notRequired(),
			}),
		meetingSchedule: Yup.string().required(
			"A description of your meeting schedule is required. Please enter the group's schedule and resubmit."
		),
		nameOfMeetingSite: Yup.string().required(
			'The name of your meeting site is required. Please enter the site name and resubmit.'
		),
		meetingCountry: Yup.object().required(
			"Your meeting site's country is required. Please select the country and resubmit."
		),
		meetingAddress: Yup.string().required(
			"Your meeting site's address is required. Please enter the address and resubmit."
		),
		meetingCity: Yup.string().required(
			"Your meeting site's city is required. Please enter the city and resubmit."
		),
		meetingState: Yup.object()
			.notRequired()
			.when('meetingCountry', {
				is: val => val === 'United States of America',
				then: Yup.object().required(
					"Your meeting site's state is required. Please select the state and resubmit."
				),
				otherwise: Yup.object().notRequired(),
			}),
		meetingZipPostalCode: Yup.string().required(
			"Your meeting site's zip or postal code is required. Please enter the code and resubmit."
		),
		facilitator: Yup.object().required(
			"Information about your meeting site's facilitator(s) is required. Please make a selection and resubmit."
		),
	})
	const { register, handleSubmit, errors, setValue } = useForm({
		validationSchema: schema,
	})
	const [values, setReactSelectValue] = useState({
		selectedCountryOption: [],
		selectedStateOption: [],
	})
	const [showSubmitter, setShowSubmitter] = useState(false)
	const [showState, setShowState] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [submitError, setSubmitError] = useState(false)
	const [loading, setLoading] = useState(false)

	const Element = Scroll.Element
	const scroller = Scroll.scroller

	const handleCountrySelectChange = selectedOption => {
		if (selectedOption.value === 'United States of America') {
			setShowState(true)
		} else {
			setShowState(false)
		}
		setValue('meetingCountry', selectedOption)
		setReactSelectValue({ selectedOption })
	}

	const handleStateSelectChange = selectedOption => {
		setValue('meetingState', selectedOption)
		setReactSelectValue({ selectedOption })
	}

	const handleFacilitatorSelectChange = selectedOption => {
		setValue('facilitator', selectedOption)
		setReactSelectValue({ selectedOption })
	}

	const handleToggleChange = toggleValue => {
		console.log(toggleValue.target)
		const value = toggleValue.target.checked
		if (toggleValue.target.id === 'newMembers') {
			setValue('newMembers', value)
		} else if (toggleValue.target.id === 'attendedTraining') {
			setValue('attendedTraining', value)
		}
		setReactSelectValue({ value })
	}

	const onSubmit = data => {
		console.log(data)
		const form = document.querySelector('form')
		let formData = new FormData(form)
		formData.append(
			'meetingCountry',
			data.meetingCountry ? data.meetingCountry.value : ''
		)
		if (data.meetingCountry === 'United States of America') {
			formData.append(
				'meetingState',
				data.meetingState ? data.meetingState.value : ''
			)
		}
		formData.append(
			'newMembers',
			data.newMembers === `undefined` ? data.newMembers : true
		)
		formData.append(
			'facilitator',
			data.facilitator ? data.facilitator.value : ''
		)
		formData.append(
			'attendedTraining',
			data.attendedTraining === `undefined`
				? data.attendedTraining.value
				: false
		)
		setLoading(true)
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
			})
	}

	const onError = () => {
		setSubmitError(false)
	}

	useEffect(() => {
		register({ name: 'meetingState' })
		register({ name: 'meetingCountry' })
		register({ name: 'facilitator' })
		register({ name: 'newMembers' })
		register({ name: 'attendedTraining' })
	}, [register])

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
				{!submitted && !submitError && (
					<form
						css={formWrapperCSS}
						onSubmit={handleSubmit(onSubmit)}
					>
						<label htmlFor="supportGroupName">
							Support Group Name <span>*</span>
						</label>
						{errors.supportGroupName && (
							<span>{errors.supportGroupName.message}</span>
						)}
						<input name="supportGroupName" ref={register} />

						<label htmlFor="supportGroupWebsite">
							Support Group Website
						</label>
						<p>
							Please enter a valid URL beginning with http:// or
							https://
						</p>
						{errors.supportGroupWebsite && (
							<span>{errors.supportGroupWebsite.message}</span>
						)}
						<input name="supportGroupWebsite" ref={register} />

						<label htmlFor="hostingSponsoringOrganization">
							Hosting/Sponsoring Organization
						</label>
						<input
							name="hostingSponsoringOrganization"
							ref={register}
						/>

						<label htmlFor="hostingSponsoringOrganizationWebsite">
							Hosting/Sponsoring Organization Website
						</label>
						<p>
							Please enter a valid URL beginning with http:// or
							https://
						</p>
						{errors.hostingSponsoringOrganizationWebsite && (
							<span>
								{
									errors.hostingSponsoringOrganizationWebsite
										.message
								}
							</span>
						)}
						<input
							name="hostingSponsoringOrganizationWebsite"
							ref={register}
						/>

						<label htmlFor="groupDemographic">
							Group Demographic
						</label>
						<p>
							Is your support group for a specific demographic
							(e.g., parents who lost a child, men only, LGBTQ
							loss, teens)? If so, please explain.
						</p>
						{errors.supportGroupName && (
							<span>{errors.supportGroupName.message}</span>
						)}
						<textarea name="groupDemographic" ref={register} />

						<Toggle
							id="newMembers"
							onChange={handleToggleChange}
							defaultChecked={true}
						/>
						<label htmlFor="newMembers">New Members</label>
						<p className="toggleInstructions">
							A group is considered open if new members may join
							at any time. A group is considered closed if new
							members may join only at specific times or under
							certain circumstances. Groups are assumed to be open
							by default.
						</p>

						<label htmlFor="contactName">
							Contact Name <span>*</span>
						</label>
						{errors.contactName && (
							<span>{errors.contactName.message}</span>
						)}
						<input name="contactName" ref={register} />

						<label htmlFor="contactEmail">
							Contact Email <span>*</span>
						</label>
						<p>Please enter a valid email address</p>
						{errors.contactEmail && (
							<span>{errors.contactEmail.message}</span>
						)}
						<input name="contactEmail" ref={register} />

						<label htmlFor="contactPhone">Contact Phone</label>
						<input name="contactPhone" ref={register} />

						<Toggle
							name="differentSubmitter"
							onChange={e => {
								if (e.target.checked) {
									setShowSubmitter(true)
								} else {
									setShowSubmitter(false)
								}
							}}
						/>

						<label htmlFor="differentSubmitter">
							My Information is Different from Group Contact
						</label>
						<p className="toggleInstructions">
							Select if your information is different from the
							group contact information above.
						</p>

						<div
							css={css`
								display: ${showSubmitter === false
									? 'none'
									: 'inherit'};
							`}
						>
							<label htmlFor="submitterName">
								Submitter Name <span>*</span>
							</label>
							<input name="submitterName" ref={register} />

							<label htmlFor="submitterEmail">
								Submitter Email <span>*</span>
							</label>
							<p>Please enter a valid email address</p>
							{errors.submitterEmail && (
								<span>{errors.submitterEmail.message}</span>
							)}
							<input name="submitterEmail" ref={register} />
						</div>

						<label htmlFor="registrationProcess">
							Registration Process
						</label>
						<textarea name="registrationProcess" ref={register} />

						<label htmlFor="meetingSchedule">
							Meeting Schedule <span>*</span>
						</label>
						<p>
							Briefly describe how frequently your group meets
							along with specific days and times (e.g., "This
							group meets continuously throughout the year on the
							second Tuesday of every month at 7 pm.").
						</p>
						{errors.meetingSchedule && (
							<span>{errors.meetingSchedule.message}</span>
						)}
						<textarea name="meetingSchedule" ref={register} />

						<label htmlFor="nameOfMeetingSite">
							Name of Meeting Site <span>*</span>
						</label>
						{errors.nameOfMeetingSite && (
							<span>{errors.nameOfMeetingSite.message}</span>
						)}
						<input name="nameOfMeetingSite" ref={register} />

						<label htmlFor="meetingCountry">
							Meeting Country <span>*</span>
						</label>
						<p>Select your meeting location's country.</p>
						{errors.meetingCountry && (
							<span>{errors.meetingCountry.message}</span>
						)}
						<Select
							css={selectCSS}
							id="countrySelect"
							className="react-select"
							classNamePrefix="react-select"
							value={values.selectedCountryOption}
							options={countryList}
							onChange={handleCountrySelectChange}
						/>

						<label htmlFor="meetingAddress">
							Meeting Address <span>*</span>
						</label>
						<p>
							Enter your meeting location's street address (no
							P.O. Boxes). If your location varies, write
							"Varies."
						</p>
						{errors.meetingAddress && (
							<span>{errors.meetingAddress.message}</span>
						)}
						<input name="meetingAddress" ref={register} />

						<label htmlFor="meetingCity">
							Meeting City <span>*</span>
						</label>
						<p>Enter your meeting location's city.</p>
						{errors.meetingCity && (
							<span>{errors.meetingCity.message}</span>
						)}
						<input name="meetingCity" ref={register} />

						{showState && (
							<>
								<label htmlFor="meetingState">
									Meeting State <span>*</span>
								</label>
								<p>Select your meeting location's state.</p>
								{errors.meetingState && (
									<span>{errors.meetingState.message}</span>
								)}
								<Select
									css={selectCSS}
									id="stateSelect"
									className="react-select"
									classNamePrefix="react-select"
									value={values.selectedStateOption}
									options={stateList}
									onChange={handleStateSelectChange}
								/>
							</>
						)}

						<label htmlFor="meetingZipPostalCode">
							Meeting Zip/Postal Code <span>*</span>
						</label>
						<p>Enter your meeting location's zip or postal code.</p>
						{errors.meetingZipPostalCode && (
							<span>{errors.meetingZipPostalCode.message}</span>
						)}
						<input name="meetingZipPostalCode" ref={register} />

						<label htmlFor="facilitator">
							Facilitator <span>*</span>
						</label>
						<p>
							Select the option that best describes your group's
							facilitator(s).
						</p>
						{errors.facilitator && (
							<span>{errors.facilitator.message}</span>
						)}
						<Select
							css={selectCSS}
							id="facilitator"
							className="react-select"
							classNamePrefix="react-select"
							value={values.selectedStateOption}
							options={[
								{
									value: 'Peer',
									label: 'Peer',
								},
								{
									value: 'Mental Health Professional',
									label: 'Mental Health Professional',
								},
								{
									value: 'Peer & Mental Health Professional',
									label: 'Peer & Mental Health Professional',
								},
							]}
							onChange={handleFacilitatorSelectChange}
						/>

						<Toggle
							id="attendedTraining"
							onChange={handleToggleChange}
						/>
						<label htmlFor="attendedTraining">
							Attended AFSP Support Group Facilitator Training
						</label>
						<p className="toggleInstructions">
							Select if your support group facilitator has
							attended and completed AFSP's training: Facilitating
							a Suicide Bereavement Support Group.
						</p>

						<label htmlFor="costToAttend">Cost to Attend</label>
						<p>
							Indicate how much your support group costs to
							attend. Leave blank if no fee is charged.
						</p>
						<input name="costToAttend" ref={register} />

						<label htmlFor="additionalInformation">
							Additional Information
						</label>
						<p>
							Use this field to add information about parking,
							exceptions to your meeting schedule, or other
							information you feel may be useful to potential
							group participants.
						</p>
						<textarea name="additionalInformation" ref={register} />

						<input
							css={css`
								margin-top: ${styles.scale.px64};
							`}
							className="secondary-button"
							type="submit"
							value="Submit Support Group"
						/>
					</form>
				)}
			</Element>
		</>
	)
}

export default SupportGroupForm
