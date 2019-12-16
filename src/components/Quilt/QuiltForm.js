import React from 'react'
import { Form, Input, FileInput } from '@rocketseat/unform'
import * as Yup from 'yup'
import { css } from '@emotion/core'
import axios from 'axios'

import QuiltStateSelect from './QuiltStateSelect'

import stateList from '../../utils/stateList'

import { styles } from '../../css/css'

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
	file: Yup.mixed().required(
		'An image is required to create your square. Please select an image and resubmit.'
	),
})

const formWrapperCSS = css`
	font-family: ${styles.fonts.avenirRegular};
	label {
		display: block;
		width: 100%;
		font-family: ${styles.fonts.paul};
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
		margin: 0;
		padding: 0;
	}
	input[type='file'] {
		border: none;
	}
	textarea {
		border: 2px solid ${styles.colors.darkGray};
		border-radius: 5px;
	}
	span {
		color: ${styles.colors.poppy};
		display: block;
		margin-top: -${styles.scale.px24};
		margin-bottom: ${styles.scale.px36};
	}
`

const QuiltForm = () => {
	const handleSubmit = data => {
		console.log(data)
		axios
			.post('https://serene-dusk-44738.herokuapp.com/create-quilt', data)
			.then(response => console.log(response))
			.catch(error => console.log(error))
	}
	return (
		<Form schema={schema} onSubmit={handleSubmit} css={formWrapperCSS}>
			<label htmlFor="quiltTitle">Square Title/Name of Person Lost</label>
			<Input name="quiltTitle" />
			<label htmlFor="name">Your Name</label>
			<Input name="name" />
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
			<QuiltStateSelect name="state" options={stateList} />
			<label htmlFor="file">Square Image</label>
			<p>
				Please note, images do not need to be square when uploading.
				They will appear as squares automatically.
			</p>
			<FileInput name="file" />
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
