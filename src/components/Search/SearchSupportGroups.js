import React from 'react'
import { css } from '@emotion/react'

import IconExternalLink from '../SVGs/IconExternalLink'

import { styles } from '../../css/css'

const searchResultCSS = css`
	display: grid;
	grid-column-gap: 0;
	grid-template-columns: 1fr;
	grid-gap: ${styles.scale.px36};
	background-color: ${styles.colors.white};
	margin-bottom: ${styles.scale.px16};
	padding: ${styles.scale.px24};
	border-radius: ${styles.scale.px5};
	overflow: hidden;
	position: relative;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: ${styles.scale.px24};
		margin-bottom: ${styles.scale.px20};
	}
	:last-of-type,
	p:last-child {
		margin-bottom: 0;
	}
	h2 {
		margin-right: ${styles.scale.px28};
		margin-bottom: 0;
		span {
			font-size: ${styles.scale.px18};
			font-family: ${styles.fonts.avenirRegular};
		}
		@media (min-width: ${styles.screens.tablet}px) {
			margin-right: 0;
		}
	}
	address {
		font-family: ${styles.fonts.avenirRegular};
		font-style: normal;
		a {
			color: ${styles.colors.darkGray};
			:hover {
				color: ${styles.colors.poppy};
			}
		}
	}
`

const meetingSiteCSS = css`
	h4 {
		margin-bottom: 0;
	}
`

const externalLinkCSS = css`
	display: inline-block;
	width: ${styles.scale.px24};
	position: absolute;
	right: ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		position: initial;
		margin-left: ${styles.scale.px16};
	}
`
const SearchSupportGroups = ({ supportGroup }) => {
	const {
		additionalInformation,
		attendedTraining,
		contactEmail,
		contactName,
		contactPhone,
		secondContactEmail,
		secondContactName,
		secondContactPhone,
		costToAttend,
		facilitator,
		groupDemographic,
		hostingSponsoringOrganization,
		hostingSponsoringOrganizationWebsite,
		meetingType,
		meetingCountry,
		meetingAddress,
		meetingCity,
		meetingSchedule,
		meetingState,
		meetingZipPostalCode,
		nameOfMeetingSite,
		newMembers,
		registrationProcess,
		supportGroupName,
		supportGroupWebsite,
	} = supportGroup
	return (
		<div css={searchResultCSS}>
			<h2
				css={css`
					@media (min-width: ${styles.screens.tablet}px) {
						grid-column: 1 / 4;
					}
				`}
			>
				{supportGroupName}
				{supportGroupWebsite && (
					<a
						css={externalLinkCSS}
						href={supportGroupWebsite}
						target="_blank"
						rel="noopener noreferrer"
					>
						<IconExternalLink color={styles.colors.blue} />
					</a>
				)}
				{hostingSponsoringOrganization && (
					<>
						<br />
						<span>
							Hosted or sponsored by{' '}
							{hostingSponsoringOrganizationWebsite && (
								<a
									href={hostingSponsoringOrganizationWebsite}
									target="_blank"
									rel="noopener noreferrer"
								>
									{hostingSponsoringOrganization}
								</a>
							)}
							{!hostingSponsoringOrganizationWebsite && (
								<span>hostingSponsoringOrganization</span>
							)}
						</span>
					</>
				)}
			</h2>
			<div css={meetingSiteCSS}>
				<address>
					{nameOfMeetingSite &&
						nameOfMeetingSite !== 'Not Applicable' && (
							<h4>{nameOfMeetingSite}</h4>
						)}
					{meetingType && <h4>{meetingType}</h4>}
					{meetingType === 'Nationwide Online Group' && (
						<p>
							Online groups accept loss survivors from all
							locations.
						</p>
					)}
					{meetingType !== 'Nationwide Online Group' && (
						<p>
							{meetingAddress ? meetingAddress : ''}
							{meetingAddress && <br />}
							{meetingCity},{' '}
							{meetingState ? `${meetingState},` : ''}{' '}
							{meetingZipPostalCode}
							<br />
							{meetingCountry}
						</p>
					)}
				</address>
				<p>
					<span>
						Our facilitator is a {facilitator.toLowerCase()}
					</span>
					{attendedTraining && (
						<span>
							who has attended AFSP's Facilitating a Suicide
							Bereavement Support Group training
						</span>
					)}
					.
				</p>
				<p>
					We {newMembers ? 'are' : 'are not'} currently accepting new
					loss survivors.
				</p>
			</div>
			<div>
				<h4>Additional information</h4>
				<p>{meetingSchedule}</p>
				<p>{groupDemographic}</p>
				<p>{registrationProcess}</p>
				{costToAttend &&
					costToAttend.toLowerCase() !== 'free' &&
					costToAttend.toLowerCase() !== 'none' && (
						<p>
							We charge {costToAttend} to cover the cost of
							attendance.
						</p>
					)}
				<p>{additionalInformation}</p>
			</div>
			<div>
				<h4>Have questions? Reach out</h4>
				<address>
					{contactName}
					<br />
					<a href={`mailto:${contactEmail}`}>{contactEmail}</a>
					{contactPhone && <br />}
					{contactPhone ? contactPhone : ''}
				</address>
				{secondContactName && (
					<address>
						{secondContactName}
						{secondContactEmail && <br />}
						{secondContactEmail && (
							<a href={`mailto:${secondContactEmail}`}>
								{secondContactEmail}
							</a>
						)}
						{secondContactPhone && <br />}
						{secondContactPhone ? secondContactPhone : ''}
					</address>
				)}
			</div>
		</div>
	)
}

export default SearchSupportGroups
