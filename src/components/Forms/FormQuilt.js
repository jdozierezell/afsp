import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import * as Yup from 'yup'
import { css } from '@emotion/core'
import axios from 'axios'
import * as Scroll from 'react-scroll'

import FormSubmitted from './FormSubmitted'
import FormError from './FormError'
import FormClockLoader from './FormClockLoader'

import stateListModel from '../../utils/stateListModel'

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
	span {
		color: ${styles.colors.poppy};
		display: block;
		/* margin-top: -${styles.scale.px24};
		margin-bottom: ${styles.scale.px36}; */
	}
	label span {
		display: inline-block;
		line-height: 0;
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
	const { register, handleSubmit, errors, setValue } = useForm({
		validationSchema: schema,
	})

	const [values, setReactSelectValue] = useState({ selectedOption: [] })
	const [submitted, setSubmitted] = useState(false)
	const [submitError, setSubmitError] = useState(false)
	const [loading, setLoading] = useState(false)

	const Element = Scroll.Element
	const scroller = Scroll.scroller

	const handleStateSelectChange = selectedOption => {
		setValue('state', selectedOption)
		setReactSelectValue({ selectedOption })
	}

	const onSubmit = data => {
		const form = document.querySelector('form')
		let formData = new FormData(form)
		formData.append('image', data.image)
		formData.append('state', values.selectedOption)

		setLoading(true)

		axios
			.post(
				'https://serene-dusk-44738.herokuapp.com/create-quilt',
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
				setLoading(false)
			})
	}

	const onError = () => {
		setSubmitError(false)
	}

	useEffect(() => {
		register({ name: 'state' })
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
						<label id="quiltTitleLabel" htmlFor="quiltTitle">
							Square Title/Name of Person Lost <span>*</span>
						</label>
						{errors.quiltTitle && (
							<p>{errors.quiltTitle.message}</p>
						)}
						<input
							aria-describedby="quiltTitleLabel"
							name="quiltTitle"
							id="quiltTitle"
							title="quiltTitle"
							ref={register}
						/>

						<label id="nameLabel" htmlFor="name">
							Your Name <span>*</span>
						</label>
						{errors.name && <p>{errors.name.message}</p>}
						<input
							aria-describedby="nameLabel"
							name="name"
							id="name"
							title="name"
							ref={register}
						/>

						<label id="emailLabel" htmlFor="email">
							Your Email Address <span>*</span>
						</label>
						<p>
							We will not share or sell your email address to
							other organizations. We hate spam as much as you do.
							We will use your email address to identify you
							should you request changes to your square later on.
						</p>
						{errors.email && <p>{errors.email.message}</p>}
						<input
							aria-describedby="emailLabel"
							name="email"
							id="email"
							title="email"
							type="email"
							ref={register}
						/>

						<label id="stateLabel" htmlFor="state">
							Your State <span>*</span>
						</label>
						<p>
							Select the state where you live. If you live outside
							of the U.S., select 'Not Applicable' at the bottom
							of the list of choices. We will not share your
							information with any 3rd party.
						</p>
						{errors.state && <p>{errors.state.message}</p>}

						<Select
							name="state"
							id="state"
							title="state"
							css={selectCSS}
							className="react-select"
							classNamePrefix="react-select"
							value={values.selectedOption}
							options={stateListModel}
							onChange={handleStateSelectChange}
						/>

						<label id="fileLabel" htmlFor="file">
							Square Image <span>*</span>
						</label>
						{errors.description && <p>{errors.image.message}</p>}
						<p>
							Please note, images do not need to be square when
							uploading. They will appear as squares
							automatically.
						</p>
						<label id="imageLabel" htmlFor="image">
							Click here to upload your image
						</label>
						<input
							aria-describedby="imageLabel"
							name="image"
							id="image"
							title="image"
							type="file"
							ref={register}
							onChange={e => {
								const img = document.createElement('img')
								const div = document.getElementById(
									'imageDisplay'
								)
								const oldImg = document.getElementById(
									'loadedImage'
								)
								if (oldImg) oldImg.remove()
								img.src = URL.createObjectURL(e.target.files[0])
								img.style.backgroundColor =
									styles.colors.lightGray
								img.height = 200
								img.id = 'loadedImage'
								img.onload = function() {
									URL.revokeObjectURL(this.src)
								}
								div.appendChild(img)
							}}
						/>
						<div id="imageDisplay"></div>

						<label id="descriptionLabel" htmlFor="description">
							Square Description
						</label>
						<p>
							Enter a brief description of your quilt square. This
							can be anything from a description of the person you
							have lost to a favorite moment or memory. If you
							like, you may leave this section blank. This field
							is not required.
						</p>
						<textarea
							name="description"
							id="description"
							title="description"
							ref={register}
						/>

						<input
							css={css`
								margin-top: ${styles.scale.px64};
							`}
							className="secondary-button"
							type="submit"
							value="Submit Quilt"
						/>
					</form>
				)}
			</Element>
		</>
	)
}

export default QuiltForm
