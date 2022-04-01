import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import HeroFacts from '../components/Hero/HeroFacts'
import NavigationSide from '../components/Navigation/NavigationSide'
import FactsWrapper from '../components/StateFacts/FactsWrapper'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'

import { styles } from '../css/css'

const carouselCSS = css`
	z-index: 2;
`

const StateFacts = ({ data: { stateFacts } }) => {
	const [factsTop, setFactsTop] = useState(null)
	let metaImage,
		metaDescription = ''
	stateFacts.seoMetaTags.tags.forEach(tag => {
		if (tag.attributes) {
			if (
				tag.attributes.property &&
				tag.attributes.property === 'og:image'
			) {
				metaImage = tag.attributes.content
			}
			if (
				tag.attributes.property &&
				tag.attributes.property === 'og:description'
			) {
				metaDescription = tag.attributes.content
			}
		}
	})
	const structuredData = {
		'@content': 'https://schema.org',
		'@type': 'WebPage',
		about: 'suicide public policy',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: stateFacts.state,
		lastReviewed: stateFacts.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/facts/${stateFacts.slug}`,
	}
	stateFacts.facts = [
		{
			__typename: 'stateFactCategory',
			display: 'Crisis lines and 988 implementation',
			anchor: 'crisis-lines-and-988-implementation',
			facts: [
				{
					display:
						'Addresses 988 infrastructure and provides for telecom user fee',
					value: stateFacts.addresses988InfrastructureAndProvidesForTelecom,
					exception:
						stateFacts.addresses988InfrastructureAndProvidesForTelecomException,
				},
				{
					display:
						'Addresses 988 infrastructure but does not include telecom user fee',
					value: stateFacts.addresses988InfrastructureButNotProvideForTelecom,
					exception:
						stateFacts.addresses988InfrastructureButNotProvideForTelecomException,
				},
				{
					display:
						'988 law limited to creating an exploratory commission, advisory committee, or task force',
					value: stateFacts.lawLimitedToCreatingCommissionCommitteeTaskForce,
					exception:
						stateFacts.lawLimitedToCreatingCommissionCommitteeTaskForceException,
				},
			],
		},
		{
			__typename: 'stateFactCategory',
			display: 'Mental health parity',
			anchor: 'mental-health-parity',
			facts: [
				{
					display:
						'Public health plans (e.g., Medicaid) regularly submit parity compliance analyses to state regulators',
					value: stateFacts.privateHealthPlans,
					exception: stateFacts.privateHealthPlansException,
				},
				{
					display:
						'Private health plans (individual and group) regularly submit parity compliance analyses to state regulators',
					value: stateFacts.publicHealthPlans,
					exception: stateFacts.publicHealthPlansException,
				},
			],
		},
		{
			__typename: 'stateFactCategory',
			display: 'K – 12 school suicide prevention',
			anchor: 'k-12-school-suicide-prevention',
			facts: [
				{
					display:
						'Inclusion of the National Suicide Prevention Lifeline and/or other crisis line(s) on student ID cards',
					value: stateFacts.nationalSuicidePreventionLifeline,
					exception:
						stateFacts.nationalSuicidePreventionLifelineException,
				},
				{
					display:
						'Student allowances for excused mental health absences',
					value: stateFacts.excusedMentalHealthAbsences,
					exception: stateFacts.excusedMentalHealthAbsencesException,
				},
				{
					display:
						'School personnel must report student suicide risk to a parent and/or guardian',
					value: stateFacts.mustReportStudentSuicideRisk,
					exception: stateFacts.mustReportStudentSuicideRiskException,
				},
				{
					display:
						'Suicide prevention and/or mental health training for certain school personnel, annual',
					value: stateFacts.trainingForPersonnelAnnual,
					exception: stateFacts.trainingForPersonnelAnnualException,
				},
				{
					display:
						'Suicide prevention and/or mental health training for certain school personnel, not annual',
					value: stateFacts.trainingForPersonnelNotAnnual,
					exception:
						stateFacts.trainingForPersonnelNotAnnualException,
				},
				{
					display:
						'Suicide prevention, intervention, and postvention policies/programming',
					value: stateFacts.preventionInterventionPostvention,
					exception:
						stateFacts.preventionInterventionPostventionException,
				},
				{
					display: 'Student education on suicide prevention',
					value: stateFacts.studentEducationSuicidePrevention,
					exception:
						stateFacts.studentEducationSuicidePreventionException,
				},
				{
					display: 'Student education on mental health',
					value: stateFacts.studentEducationMentalHealth,
					exception: stateFacts.studentEducationMentalHealthException,
				},
			],
		},
		{
			__typename: 'stateFactCategory',
			display:
				'Health professional training in suicide assessment, treatment and management',
			anchor: 'health-professional-training',
			facts: [
				{
					display:
						'Mental health professionals receive regular training',
					value: stateFacts.mentalHealthProfessionalsRegular,
					exception:
						stateFacts.mentalHealthProfessionalsRegularException,
				},
				{
					display:
						'Mental health professionals receive one time training',
					value: stateFacts.mentalHealthProfessionalsOneTime,
					exception:
						stateFacts.mentalHealthProfessionalsOneTimeException,
				},
				{
					display:
						'Medical/surgical professionals receive regular training',
					value: stateFacts.medicalSurgicalProfessionalsRegular,
					exception:
						stateFacts.medicalSurgicalProfessionalsRegularException,
				},
				{
					display:
						'Medical/surgical professionals receive one time training',
					value: stateFacts.medicalSurgicalProfessionalsOneTime,
					exception:
						stateFacts.medicalSurgicalProfessionalsOneTimeException,
				},
			],
		},
		{
			__typename: 'stateFactCategory',
			display: 'Conversion therapy bans',
			anchor: 'conversion-therapy-bans',
			facts: [
				{
					display:
						'Prohibits licensed/board certified mental health providers from engaging in conversion therapy with minors under 18 years of age',
					value: stateFacts.prohibitsProvidersConversionTherapyWithMinors,
					exception:
						stateFacts.prohibitsProvidersConversionTherapyWithMinorsException,
				},
				{
					display:
						'Prohibits licensed/board certified mental health providers from engaging in conversion therapy with vulnerable adults',
					value: stateFacts.prohibitsProvidersConversionTherapyWithVulnerableAdults,
					exception:
						stateFacts.prohibitsProvidersConversionTherapyWithVulnerableAdultsException,
				},
				{
					display:
						'Prohibits use of state funds for any purpose related to conversion therapy (e.g., conducting, making a referral for, or extending health benefits coverage for)',
					value: stateFacts.prohibitsStateFundsConversionTherapy,
					exception:
						stateFacts.prohibitsStateFundsConversionTherapyException,
				},
			],
		},

		{
			__typename: 'stateFactCategory',
			display: 'University and college campus suicide prevention',
			anchor: 'university-and-college',
			facts: [
				{
					display:
						'Inclusion of the National Suicide Prevention Lifeline and/or other crisis line(s) on student ID cards',
					value: stateFacts.unicolNationalSuicidePreventionLifeline,
					exception:
						stateFacts.unicolNationalSuicidePreventionLifelineException,
				},
				{
					display:
						'Students receive information on available mental health and/or suicide prevention services and/or resources',
					value: stateFacts.unicolStudentsReceiveInformation,
					exception:
						stateFacts.unicolStudentsReceiveInformationException,
				},
				{
					display:
						'Adoption of suicide prevention/awareness policy or program',
					value: stateFacts.unicolAdoptionPolicy,
					exception: stateFacts.unicolAdoptionPolicyException,
				},
			],
		},
	]

	const stateFactHeadingsForNav = {
		slug: `facts/${stateFacts.slug}`,
		details: stateFacts.facts,
	}

	useEffect(() => {
		setFactsTop(
			document.getElementById('factsContainer').getBoundingClientRect()
				.height +
				document
					.getElementById('crisisResources')
					.getBoundingClientRect().height
		)
	}, [factsTop])

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={stateFacts.seoMetaTags}
			structuredData={structuredData}
		>
			<div id="factsContainer">
				<HeroFacts stateFacts={stateFacts}></HeroFacts>
			</div>
			<NavigationSide data={stateFactHeadingsForNav}></NavigationSide>
			<FactsWrapper stateFacts={stateFacts}></FactsWrapper>
			<CarouselChapterContainer
				carouselCSS={carouselCSS}
			></CarouselChapterContainer>
		</Layout>
	)
}

export default StateFacts

export const query = graphql`
	query ($slug: String) {
		stateFacts: datoCmsStateFact(slug: { eq: $slug }) {
			__typename
			stateName
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
				updatedAt(formatString: "MMMM DD, YYYY")
			}
			stateFactSheetImage {
				url
				alt
				gatsbyImageData(width: 768)
			}
			addresses988InfrastructureAndProvidesForTelecom
			addresses988InfrastructureAndProvidesForTelecomException
			addresses988InfrastructureButNotProvideForTelecom
			addresses988InfrastructureButNotProvideForTelecomException
			excusedMentalHealthAbsences
			excusedMentalHealthAbsencesException
			initiativesAndPlans
			lawLimitedToCreatingCommissionCommitteeTaskForce
			lawLimitedToCreatingCommissionCommitteeTaskForceException
			medicalSurgicalProfessionalsOneTime
			medicalSurgicalProfessionalsOneTimeException
			medicalSurgicalProfessionalsRegular
			medicalSurgicalProfessionalsRegularException
			mentalHealthProfessionalsOneTime
			mentalHealthProfessionalsOneTimeException
			mentalHealthProfessionalsRegular
			mentalHealthProfessionalsRegularException
			mustReportStudentSuicideRisk
			mustReportStudentSuicideRiskException
			nationalSuicidePreventionLifeline
			nationalSuicidePreventionLifelineException
			preventionInterventionPostvention
			preventionInterventionPostventionException
			privateHealthPlans
			privateHealthPlansException
			prohibitsProvidersConversionTherapyWithMinors
			prohibitsProvidersConversionTherapyWithMinorsException
			prohibitsProvidersConversionTherapyWithVulnerableAdults
			prohibitsProvidersConversionTherapyWithVulnerableAdultsException
			prohibitsStateFundsConversionTherapy
			prohibitsStateFundsConversionTherapyException
			publicHealthPlans
			publicHealthPlansException
			stateName
			studentEducationMentalHealth
			studentEducationMentalHealthException
			studentEducationSuicidePrevention
			studentEducationSuicidePreventionException
			trainingForPersonnelAnnual
			trainingForPersonnelAnnualException
			trainingForPersonnelNotAnnual
			trainingForPersonnelNotAnnualException
			unicolAdoptionPolicy
			unicolAdoptionPolicyException
			unicolNationalSuicidePreventionLifeline
			unicolNationalSuicidePreventionLifelineException
			unicolStudentsReceiveInformation
			unicolStudentsReceiveInformationException
		}
	}
`
